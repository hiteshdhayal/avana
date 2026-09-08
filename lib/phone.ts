/**
 * Phone helpers for the enquiry form.
 *
 * This is a distinct concern from `lib/contact.ts`, which validates the
 * *developer's own* published number. This file validates what a *visitor*
 * types in — and the audience explicitly includes NRIs in the Gulf, UK and US
 * (spec section 1), so it is not restricted to Indian mobiles the way the
 * developer's contact number is.
 */

export const COUNTRY_CODES = [
  { code: "+91", label: "India" },
  { code: "+971", label: "UAE" },
  { code: "+44", label: "UK" },
  { code: "+1", label: "US / Canada" },
  { code: "+65", label: "Singapore" },
  { code: "+61", label: "Australia" },
] as const;

export const DEFAULT_COUNTRY_CODE = "+91";

/** A generic E.164 number: + then 8–15 digits, not starting with 0. */
export const E164 = /^\+[1-9]\d{7,14}$/;

export function isE164(value: string): boolean {
  return E164.test(value);
}

/** Combine a selected country code with the digits the visitor typed. */
export function toE164(countryCode: string, local: string): string {
  const digits = local.replace(/\D/g, "");
  return `${countryCode}${digits}`;
}
