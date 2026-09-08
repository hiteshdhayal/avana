import "server-only";

/**
 * Cloudflare Turnstile verification (spec 6.14, 8).
 *
 * Both the site key (client) and the secret key (server) are optional here on
 * purpose: without them the widget simply does not load — see
 * `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in `components/form/EnquiryForm.tsx` — and
 * verification is skipped with a loud server log rather than silently
 * accepting or silently blocking every submission. The honeypot and the
 * minimum-fill-time check still apply regardless. Set both keys before
 * launch; see README "Environment variables".
 */

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile(
  token: string,
  remoteIp?: string,
): Promise<{ ok: boolean; reason?: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.warn(
      "[avana:turnstile] TURNSTILE_SECRET_KEY is not set — skipping bot " +
        "verification. Set it before launch (see README).",
    );
    return { ok: true, reason: "not-configured" };
  }

  if (!token) {
    return { ok: false, reason: "missing-token" };
  }

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.set("remoteip", remoteIp);

    const res = await fetch(VERIFY_URL, { method: "POST", body });
    const data = (await res.json()) as { success: boolean };
    return { ok: data.success === true, reason: data.success ? undefined : "rejected" };
  } catch (error) {
    console.error("[avana:turnstile] verification request failed", error);
    // Fail closed: a network error talking to Cloudflare should not let a
    // submission through unverified.
    return { ok: false, reason: "verify-error" };
  }
}
