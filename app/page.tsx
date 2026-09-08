import { ContourRail } from "@/components/layout/ContourRail";
import { Hero } from "@/components/hero/Hero";
import { LocationSection } from "@/components/sections/LocationSection";
import { MasterPlanSection } from "@/components/sections/MasterPlanSection";
import { PrefillProvider } from "@/components/enquiry/PrefillProvider";
import { MeasureBand } from "@/components/data/MeasureBand";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Section, SectionInner } from "@/components/layout/Section";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { StickyActions } from "@/components/layout/StickyActions";
import { content } from "@/content/avana";
import { resolveMedia } from "@/lib/media";
import { siteChrome } from "@/lib/site";

export default function Home() {
  const chrome = siteChrome();
  const heroPoster = resolveMedia(content.hero.poster);

  return (
    <>
      <SmoothScroll />
      <Header
        projectName={chrome.projectName}
        regNumber={chrome.regNumber}
        authorityUrl={chrome.authorityUrl}
        qr={chrome.qr}
        overHero
        ctaLabel={content.hero.primaryCta}
      />
      <ContourRail />

      <PrefillProvider>
      <main id="main">
        <Hero
          h1={content.hero.h1}
          lead={content.hero.lead}
          primaryCta={content.hero.primaryCta}
          secondaryCta={content.hero.secondaryCta}
          notes={content.hero.fieldNotes}
          poster={heroPoster}
          video={content.hero.video}
          hasRender={heroPoster.available}
        />

        <MeasureBand items={content.measureBand} />

        <LocationSection />

        <MasterPlanSection />

        <Section id="villa" background="mist" rail={{ label: "The villa" }}>
          <SectionInner>
            <h2 className="subdisplay text-step-3">{content.villa.headline}</h2>
          </SectionInner>
        </Section>

        <Section id="pools" background="mist-hi" rail={{ label: "Pools" }}>
          <SectionInner>
            <h2 className="subdisplay text-step-3">{content.pools.headline}</h2>
          </SectionInner>
        </Section>

        <Section id="features" background="mist" rail={{ label: "Inside" }}>
          <SectionInner>
            <h2 className="subdisplay text-step-3">Inside</h2>
          </SectionInner>
        </Section>

        <Section id="amenities" background="terrace" rail={{ label: "Amenities" }}>
          <SectionInner>
            <h2 className="subdisplay text-step-3">
              {content.amenities.headline}
            </h2>
          </SectionInner>
        </Section>

        <Section id="plans" background="mist" rail={{ label: "Plans" }}>
          <SectionInner>
            <h2 className="subdisplay text-step-3">{content.plans.headline}</h2>
          </SectionInner>
        </Section>

        <Section id="payment" background="mist-hi" rail={{ label: "Payment" }}>
          <SectionInner>
            <h2 className="subdisplay text-step-3">
              {content.payment.headline}
            </h2>
          </SectionInner>
        </Section>

        <Section id="developer" background="mist" rail={{ label: "Developer" }}>
          <SectionInner>
            <h2 className="subdisplay text-step-3">
              {content.developer.headline}
            </h2>
          </SectionInner>
        </Section>

        <Section id="enquire" background="ink" rail={{ label: "Enquire" }}>
          <SectionInner>
            <h2 className="subdisplay text-step-3">{content.enquire.headline}</h2>
          </SectionInner>
        </Section>
      </main>
      </PrefillProvider>

      <Footer
        projectName={chrome.projectName}
        developerLegalName={chrome.developerLegalName}
        strapline={content.location.addressLine}
        address={chrome.address}
        phoneDisplay={chrome.phoneDisplay}
        telHref={chrome.telHref}
        email={chrome.email}
        emailHref={chrome.emailHref}
        developerSite={chrome.developerSite}
        disclosure={chrome.disclosure}
        regNumber={chrome.regNumber}
        authorityUrl={chrome.authorityUrl}
        qr={chrome.qr}
        year={chrome.year}
      />

      <StickyActions
        telHref={chrome.telHref}
        whatsappHref={chrome.whatsappHref}
        visitLabel="Book a visit"
      />
    </>
  );
}
