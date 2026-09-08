import { MasterPlan } from "@/components/plan/MasterPlan";
import { Section, SectionInner } from "@/components/layout/Section";
import { availabilityIsMaintained, content } from "@/content/avana";
import { resolveMedia } from "@/lib/media";

/** The moment (spec 6.5). Everything else on the page stays quiet so this lands. */
export function MasterPlanSection() {
  const plan = content.masterPlan;

  return (
    <Section id="plan" background="ink" rail={{ label: "Master plan" }}>
      <SectionInner>
        <h2 className="subdisplay text-step-3">{plan.headline}</h2>
        <div className="mt-12">
          <MasterPlan
            plots={plan.plots}
            viewBox={plan.viewBox}
            layoutStatus={plan.layoutStatus}
            caption={plan.caption}
            showAvailability={availabilityIsMaintained}
            orientationVerified={content.location.orientationVerified}
            plotRender={resolveMedia("/media/villa-plot.avif")}
          />
        </div>
      </SectionInner>
    </Section>
  );
}
