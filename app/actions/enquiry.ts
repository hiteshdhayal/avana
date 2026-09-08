"use server";

import { headers } from "next/headers";
import { buildSiteVisitIcs } from "@/lib/ics";
import type { LeadRecord } from "@/lib/leads";
import { persistLead } from "@/lib/leads";
import { checkRateLimit } from "@/lib/rate-limit";
import { enquirySchema } from "@/lib/schema";
import { verifyTurnstile } from "@/lib/turnstile";

/**
 * The enquiry route (spec 6.14, 8): Zod → honeypot/timing → Turnstile →
 * rate limit → persist (email + sheet) → typed result. Never a generic
 * "something went wrong" — every failure branch carries a reason the client
 * can act on.
 */

export type EnquiryResult =
  | { ok: true; ics: string | null }
  | { ok: false; reason: "validation"; fieldErrors: Record<string, string> }
  | { ok: false; reason: "spam" }
  | { ok: false; reason: "rate-limited" }
  | { ok: false; reason: "bot-check-failed" }
  | { ok: false; reason: "server-error" };

const MIN_FILL_MS = 3000;

async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

export async function submitEnquiry(formData: FormData): Promise<EnquiryResult> {
  // `formData.get()` returns `null` for a field that isn't in the DOM at all —
  // which happens here because `preferredDate` only renders when
  // interest === "Site visit" (spec 6.14). Zod's `.optional()` accepts
  // `undefined` but not `null`, so every optional field is normalized to ""
  // rather than letting a conditionally-rendered field fail validation for a
  // reason that has nothing to do with what the visitor typed.
  const field = (name: string) => formData.get(name) ?? "";

  const raw = {
    name: field("name"),
    phone: field("phone"),
    email: field("email"),
    interest: field("interest"),
    plot: field("plot"),
    poolPreference: field("poolPreference"),
    preferredDate: field("preferredDate"),
    message: field("message"),
    consent: formData.get("consent") === "on" || formData.get("consent") === "true",
    company: field("company"),
    renderedAt: field("renderedAt"),
    turnstileToken: field("turnstileToken"),
  };

  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, reason: "validation", fieldErrors };
  }

  const data = parsed.data;

  // Honeypot: a bot fills every field, including the one hidden from people.
  if (data.company) {
    return { ok: false, reason: "spam" };
  }

  // Minimum fill time: a bot submits in milliseconds.
  if (Date.now() - data.renderedAt < MIN_FILL_MS) {
    return { ok: false, reason: "spam" };
  }

  const ip = await clientIp();

  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return { ok: false, reason: "rate-limited" };
  }

  const turnstile = await verifyTurnstile(data.turnstileToken ?? "", ip);
  if (!turnstile.ok) {
    return { ok: false, reason: "bot-check-failed" };
  }

  const lead: LeadRecord = {
    ...data,
    submittedAt: new Date().toISOString(),
    ip,
  };

  try {
    await persistLead(lead);
  } catch (error) {
    console.error("[avana:enquiry] unexpected failure persisting lead", error);
    return { ok: false, reason: "server-error" };
  }

  const ics =
    data.interest === "Site visit" && data.preferredDate
      ? buildSiteVisitIcs({
          date: data.preferredDate,
          address: "Karjat Shindhol, Karjat Valley, Raigad, Maharashtra 410201",
          uid: `${ip}-${Date.now()}@avanaenclave18.com`,
        })
      : null;

  return { ok: true, ics };
}
