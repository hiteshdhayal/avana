import { contact } from "@/content/avana";

/**
 * Contact routes.
 *
 * Spec 2.6 marks the phone number `[VERIFY]` — the deck prints
 * `+9191-7715039883`, which carries one digit group too many — and says: do
 * not ship a broken `tel:` link.
 *
 * So the number is validated structurally here rather than trusted. A number
 * that is not a well-formed Indian mobile in E.164 disables every call and
 * WhatsApp affordance on the page and the enquiry form becomes the only
 * route, rather than shipping a link that fails when tapped. A well-formed but
 * still-unconfirmed number is used — it is a contact route, not a claim about
 * the project — and `npm run audit:content` keeps it on the launch checklist.
 */

/** +91 followed by a 10-digit mobile starting 6-9. */
const E164_IN_MOBILE = /^\+91[6-9]\d{9}$/;

export const phoneIsUsable = E164_IN_MOBILE.test(contact.phoneE164);

export const phoneE164 = phoneIsUsable ? contact.phoneE164 : null;
export const phoneDisplay = phoneIsUsable ? contact.phoneDisplay : null;
export const telHref = phoneE164 ? `tel:${phoneE164}` : null;

/** wa.me wants the number without a `+`. */
export const whatsappNumber = phoneIsUsable
  ? contact.whatsapp.replace(/\D/g, "")
  : null;

export const emailIsUsable = /^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(contact.email);
export const emailHref = emailIsUsable ? `mailto:${contact.email}` : null;

/**
 * WhatsApp deep link with a pre-filled message (spec 6.14), including the plot
 * number when one has been selected on the master plan.
 */
export function whatsappHref(options?: { plot?: string | null }): string | null {
  if (!whatsappNumber) return null;
  const plot = options?.plot;
  const text = plot
    ? `Hello, I'd like to know more about Plot ${plot} at Avana Enclave 18.`
    : `Hello, I'd like to know more about Avana Enclave 18.`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}
