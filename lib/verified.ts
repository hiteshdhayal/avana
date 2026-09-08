/**
 * The content-verification guard (spec section 9).
 *
 * "Every content field that is unverified carries `verified: false`; components
 *  must not render an unverified field in a public claim position. Write one
 *  guard: assertVerified(field) in dev, silent omit in production."
 *
 * So: one function. It returns the value only when the value is real *and*
 * confirmed, warns loudly in development so the gap is visible while building,
 * and omits silently in production so nothing unconfirmed is ever published.
 */

export const VERIFY_MARKER = "[VERIFY]";

const warned = new Set<string>();

/** `true` for null, undefined, "", and the literal `[VERIFY]` placeholder. */
export function isPlaceholder(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") {
    const t = value.trim();
    return t === "" || t === VERIFY_MARKER || t.startsWith(VERIFY_MARKER);
  }
  return false;
}

/**
 * Gate a value that is about to be rendered as a public claim.
 * Returns `null` unless the field is both present and verified.
 */
export function publicClaim<T>(
  value: T | null | undefined,
  verified: boolean | undefined,
  field: string,
): T | null {
  const ok = verified === true && !isPlaceholder(value);
  if (!ok) assertVerified(field, value, verified);
  return ok ? (value as T) : null;
}

/** Dev-only visibility. Never throws — an unverified fact should drop out of
 *  the page, not take the page down. `npm run audit:content` is the full list. */
export function assertVerified(
  field: string,
  value?: unknown,
  verified?: boolean,
): void {
  if (process.env.NODE_ENV === "production") return;
  if (warned.has(field)) return;
  warned.add(field);
  const why = isPlaceholder(value) ? "placeholder value" : "verified: false";
  console.warn(
    `[avana:content] "${field}" withheld from the page (${why}). ` +
      `Confirm it with the client and set verified: true in avana-content.json.`,
  );
}

/** Defensive net for the RERA pricing gate: does this string carry money? */
export function containsMoney(value: string): boolean {
  return /₹|\bRs\.?\b|\bCr\b|\bcrore\b|\blakh\b|\bL\b(?!\w)/i.test(value);
}
