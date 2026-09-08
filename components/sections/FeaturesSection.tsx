import { FeatureGrid } from "@/components/villa/FeatureGrid";
import { Section, SectionInner } from "@/components/layout/Section";
import { content } from "@/content/avana";

export function FeaturesSection() {
  return (
    <Section id="features" background="mist" rail={{ label: "Inside" }}>
      <SectionInner>
        <FeatureGrid features={content.features} />
      </SectionInner>
    </Section>
  );
}
