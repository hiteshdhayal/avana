import { content, disclosureText } from "@/content/avana";
import { reraRegistrationNumber } from "@/lib/compliance";
import { resolveMedia } from "@/lib/media";
import {
  emailHref,
  phoneDisplay,
  telHref,
  whatsappHref,
} from "@/lib/contact";

/**
 * The props every piece of page chrome needs, derived once from gated content
 * so the header, the footer and the enquiry section cannot disagree about the
 * registration number or the contact routes.
 */
export function siteChrome() {
  return {
    projectName: content.project.name,
    developerLegalName: content.project.developerLegalName,
    regNumber: reraRegistrationNumber,
    authorityUrl: content.rera.authorityUrl,
    qr: resolveMedia(content.rera.qrSrc),
    address: content.contact.address,
    email: content.contact.email,
    emailHref,
    phoneDisplay,
    telHref,
    whatsappHref: whatsappHref(),
    developerSite: content.contact.developerSite,
    disclosure: disclosureText(reraRegistrationNumber),
    year: 2026,
  };
}
