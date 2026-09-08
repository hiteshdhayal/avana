import { AdvantageStrip } from "@/components/commerce/AdvantageStrip";
import { PlanColumns } from "@/components/commerce/PlanColumns";
import { Section, SectionInner } from "@/components/layout/Section";
import { content } from "@/content/avana";
import { canPublishPricing } from "@/lib/compliance";

/** Ownership plans (spec 6.11). Absent entirely pre-registration (spec 3.3). */
export function PlansSection() {
  if (!canPublishPricing) return null;
  const plans = content.plans;
  if (!plans.items.length) return null;

  return (
    <Section id="plans" background="mist" rail={{ label: "Plans" }}>
      <SectionInner>
        <h2 className="subdisplay text-step-3">{plans.headline}</h2>
        <p className="measure-lead mt-4 text-lead">{plans.lead}</p>

        <div className="mt-12">
          <PlanColumns plans={plans.items} />
        </div>

        <AdvantageStrip items={plans.advantages} />
      </SectionInner>
    </Section>
  );
}
