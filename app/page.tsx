import { MeasureBand } from "@/components/data/MeasureBand";
import { PrefillProvider } from "@/components/enquiry/PrefillProvider";
import { Hero } from "@/components/hero/Hero";
import { ContourRail } from "@/components/layout/ContourRail";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { StickyActions } from "@/components/layout/StickyActions";
import { AmenitiesSection } from "@/components/sections/AmenitiesSection";
import { DeveloperSection } from "@/components/sections/DeveloperSection";
import { EnquirySection } from "@/components/sections/EnquirySection";
import { EveningSection } from "@/components/sections/EveningSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { MasterPlanSection } from "@/components/sections/MasterPlanSection";
import { PaymentSection } from "@/components/sections/PaymentSection";
import { PlansSection } from "@/components/sections/PlansSection";
import { PoolsSection } from "@/components/sections/PoolsSection";
import { VillaSection } from "@/components/sections/VillaSection";
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

        <VillaSection />

        <PoolsSection />

        <FeaturesSection />

        <AmenitiesSection />

        <EveningSection
          passage={content.evening.passage}
          media={resolveMedia(content.evening.image)}
        />

        <PlansSection />

        <PaymentSection />

        <DeveloperSection />

        <EnquirySection />
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
