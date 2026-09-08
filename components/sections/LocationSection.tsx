import { ConnectivityRail } from "@/components/data/ConnectivityRail";
import { Figure } from "@/components/media/Figure";
import { Section, SectionInner } from "@/components/layout/Section";
import { StaticMap } from "@/components/media/StaticMap";
import { content, verifiedConnectivity } from "@/content/avana";
import { resolveMedia } from "@/lib/media";
import { publicClaim } from "@/lib/verified";

/**
 * The valley (spec 6.4). Everything unconfirmed drops out: the orientation
 * clause, every unverified drive time, and the map pin.
 */
export function LocationSection() {
  const location = content.location;

  const orientation = publicClaim(
    location.bodyOrientation,
    location.orientationVerified,
    "location.bodyOrientation",
  );

  return (
    <Section id="location" background="mist" rail={{ label: "Location" }}>
      <SectionInner>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Figure
              media={resolveMedia("/media/valley-day.avif")}
              alt="the Sahyadri valley below the site"
              ratio="4:5"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="subdisplay text-step-3">{location.headline}</h2>
            <p className="measure mt-6 text-body">{location.body}</p>
            {orientation && (
              <p className="measure mt-3 text-body">{orientation}</p>
            )}

            <ConnectivityRail rows={verifiedConnectivity} />

            <div className="mt-10">
              <StaticMap
                lat={location.geo.lat}
                lng={location.geo.lng}
                geoVerified={location.geo.verified}
                address={content.contact.address}
                label={content.project.name}
              />
            </div>
          </div>
        </div>
      </SectionInner>
    </Section>
  );
}
