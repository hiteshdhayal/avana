/**
 * Currency formatting — spec section 8. One helper, used everywhere:
 * `₹1.60 Cr`, `₹29.5 L`, never `16000000`.
 */

const CRORE = 10_000_000;
const LAKH = 100_000;

function trim(n: number, dp: number): string {
  const fixed = n.toFixed(dp);
  return fixed.replace(/\.0+$/, "");
}

/** `16000000` → `₹1.60 Cr`; `2950000` → `₹29.5 L`; `45000` → `₹45,000`. */
export function formatINR(amount: number): string {
  if (!Number.isFinite(amount)) return "";
  if (Math.abs(amount) >= CRORE) return `₹${trim(amount / CRORE, 2)} Cr`;
  if (Math.abs(amount) >= LAKH) return `₹${trim(amount / LAKH, 1)} L`;
  return `₹${groupINR(amount)}`;
}

/** Indian digit grouping for any raw rupee figure. */
export function groupINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    amount,
  );
}

/** `3500` → `3,500` (Indian grouping, used for areas and counts). */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN").format(value);
}

/** `95` → `95 min`; used by the connectivity rail. */
export function formatMinutes(minutes: number): string {
  return `${minutes} min`;
}

/** Mask a phone for the success panel: `+917715039883` → `+91 ••••• ••883`. */
export function maskPhone(e164: string): string {
  const digits = e164.replace(/\D/g, "");
  const last3 = digits.slice(-3);
  return `+91 ••••• ••${last3}`;
}
