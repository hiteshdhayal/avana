import { ConnectivityRail } from "@/components/data/ConnectivityRail";
import { Figure } from "@/components/media/Figure";
import { Reveal } from "@/components/layout/Reveal";
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
        {/* Zigzag rhythm (spec 4.1 amendment): this row flips media to the
            right, text to the left — the opposite of the villa row below it.
            DOM order is unchanged (media first) so mobile stacking, where the
            grid columns don't apply, still shows the image before the text,
            matching every other split section. */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal from="right">
              <Figure
                media={resolveMedia("/media/valley-day.avif")}
                alt="the Sahyadri valley below the site"
                ratio="4:5"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-1 lg:row-start-1">
            <Reveal from="left">
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
            </Reveal>
          </div>
        </div>
      </SectionInner>
    </Section>
  );
}
