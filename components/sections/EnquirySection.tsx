import { EnquiryForm } from "@/components/form/EnquiryForm";
import { RegBlock } from "@/components/layout/RegBlock";
import { Section, SectionInner } from "@/components/layout/Section";
import { StaticMap } from "@/components/media/StaticMap";
import { content } from "@/content/avana";
import { reraRegistrationNumber } from "@/lib/compliance";
import { emailHref, phoneDisplay, telHref, whatsappHref } from "@/lib/contact";
import { resolveMedia } from "@/lib/media";

/** Capture the lead (spec 6.14). Form left, contact + reassurance right. */
export function EnquirySection() {
  const enquire = content.enquire;
  const location = content.location;

  return (
    <Section id="enquire" background="ink" rail={{ label: "Enquire" }}>
      <SectionInner>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h2 className="subdisplay text-step-3">{enquire.headline}</h2>
            <p className="measure-lead mt-4 text-lead text-[var(--fg)]">
              {enquire.lead}
            </p>

            <div className="mt-10" data-scheme="light">
              <div className="bg-mist p-6 lg:p-8">
                <EnquiryForm
                  consentLabel={enquire.consent}
                  successTitle={enquire.successTitle}
                  successBody={enquire.successBody}
                  failureMessage={enquire.failure}
                  telHref={telHref}
                  phoneDisplay={phoneDisplay}
                  whatsappHref={whatsappHref()}
                />
              </div>
            </div>
          </div>

          <div className="space-y-10 lg:col-span-4 lg:col-start-9">
            <div>
              <p className="font-sans text-caption text-[var(--fg-muted)]">
                Call or message
              </p>
              <div className="mt-2 space-y-1">
                {telHref && phoneDisplay && (
                  <a
                    href={telHref}
                    data-contact-detail
                    data-analytics="click_call"
                    className="tnum block font-sans text-lead text-[var(--fg-strong)] hover:opacity-80"
                  >
                    {phoneDisplay}
                  </a>
                )}
                {emailHref && (
                  <a
                    href={emailHref}
                    data-contact-detail
                    className="block font-sans text-body text-[var(--fg)] hover:opacity-80"
                  >
                    {content.contact.email}
                  </a>
                )}
              </div>
            </div>

            <div data-scheme="light">
              <StaticMap
                lat={location.geo.lat}
                lng={location.geo.lng}
                geoVerified={location.geo.verified}
                address={content.contact.address}
                label={content.project.name}
              />
            </div>

            <RegBlock
              variant="inline"
              regNumber={reraRegistrationNumber}
              authorityUrl={content.rera.authorityUrl}
              qr={resolveMedia(content.rera.qrSrc)}
            />
          </div>
        </div>
      </SectionInner>
    </Section>
  );
}
