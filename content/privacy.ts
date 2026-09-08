/**
 * Privacy notice content (spec 12.3 — a real page, not a modal, required by
 * the DPDP Act 2023 and by Meta ad approval).
 *
 * Everything here describes what the code in this repository actually does
 * with a submitted enquiry. The two items the developer must decide — the
 * retention period and the named grievance contact — are marked `pending` and
 * render as an explicit "to be confirmed" rather than an invented commitment.
 */

export type PrivacySection = {
  heading: string;
  body: string[];
  list?: string[];
  pending?: boolean;
};

export const privacyNotice = {
  title: "Privacy notice",
  updated: "This notice describes how the Avana Enclave 18 enquiry form works.",
  sections: [
    {
      heading: "Who we are",
      body: [
        "This site is operated by Batra and Sankhe Buildcon, registered as Batra and Sons Infra Realty Developers LLP, for its Avana Enclave 18 project at Karjat Shindhol, Karjat Valley, Raigad, Maharashtra 410201.",
      ],
    },
    {
      heading: "What we collect",
      body: [
        "Only what you type into the enquiry form, plus two technical details needed to stop automated abuse.",
      ],
      list: [
        "Your name and phone number, which are required.",
        "Your email address, the kind of enquiry you are making, a preferred site-visit date and a message — all optional.",
        "The plot number and pool option you were looking at, if you selected one, so the sales team knows what you were asking about.",
        "Your IP address, used to rate-limit submissions, and a Cloudflare Turnstile token used once to confirm you are not a bot.",
      ],
    },
    {
      heading: "Why we collect it",
      body: [
        "To answer your enquiry: to call, message or email you about Avana Enclave 18, to arrange a site visit, and to keep a record of the conversation. We ask for your consent before you submit, and we do not tick that box for you.",
      ],
    },
    {
      heading: "Who sees it",
      body: [
        "Your enquiry is emailed to the Batra and Sankhe Buildcon sales team and stored in the sales team's own records. It reaches those records through service providers who process it on our behalf and for no other purpose:",
      ],
      list: [
        "Resend, which sends the notification email.",
        "Google Sheets or the configured lead store, which holds the record for the sales team.",
        "Cloudflare, which provides the anti-bot check.",
        "Vercel, which hosts this site.",
      ],
    },
    {
      heading: "How long we keep it",
      body: [
        "Retention period: to be confirmed by Batra and Sankhe Buildcon before launch.",
      ],
      pending: true,
    },
    {
      heading: "Analytics",
      body: [
        "No analytics or advertising script loads until you answer the consent banner. If you decline, none is loaded and no identifier is set.",
      ],
    },
    {
      heading: "Your choices",
      body: [
        "You can withdraw consent, ask what we hold, ask us to correct it, or ask us to delete it, at any time, by emailing info@batralifespace.com. We will act on the request and confirm when it is done.",
      ],
    },
    {
      heading: "Grievance contact",
      body: [
        "Named contact for data protection queries: to be confirmed by Batra and Sankhe Buildcon before launch.",
      ],
      pending: true,
    },
  ] satisfies PrivacySection[],
};
