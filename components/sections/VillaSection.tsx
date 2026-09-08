import { FloorPlanViewer } from "@/components/villa/FloorPlanViewer";
import { Reveal } from "@/components/layout/Reveal";
import { Section, SectionInner } from "@/components/layout/Section";
import { SpecTable } from "@/components/data/SpecTable";
import { content } from "@/content/avana";
import { resolveMedia } from "@/lib/media";
import { isPlaceholder } from "@/lib/verified";

/** The villa (spec 6.6). */
export function VillaSection() {
  const villa = content.villa;

  // The room distribution is `[VERIFY]` against the approved plans, so the
  // section cuts to the spec table alone rather than describing rooms nobody
  // has confirmed (spec 6.6).
  const body = isPlaceholder(villa.body) ? null : villa.body;

  const rows = villa.spec.filter((row) => row.verified);

  const levels = villa.floorPlans.map((plan) => ({
    ...plan,
    media: resolveMedia(plan.src),
  }));

  return (
    <Section id="villa" background="mist" rail={{ label: "The villa" }}>
      <SectionInner>
        {/* Zigzag rhythm (spec 4.1 amendment): the baseline row — media
            left, text right — with location and pools alternating around
            it. Unlike those two, column placement here is unchanged; only
            the one-time reveal is new. */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Reveal from="left">
              <FloorPlanViewer levels={levels} />
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal from="right">
              <h2 className="subdisplay text-step-3">{villa.headline}</h2>
              {body && <p className="measure mt-6 text-body">{body}</p>}
              <div className="mt-8">
                <SpecTable rows={rows} />
              </div>
            </Reveal>
          </div>
        </div>
      </SectionInner>
    </Section>
  );
}
