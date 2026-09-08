import { PoolConfigurator } from "@/components/villa/PoolConfigurator";
import { Section, SectionInner } from "@/components/layout/Section";
import { content } from "@/content/avana";
import { resolveMedia } from "@/lib/media";
import { publicClaim } from "@/lib/verified";

/** Pool options (spec 6.7). */
export function PoolsSection() {
  const pools = content.pools;

  const caption = publicClaim(
    pools.caption,
    pools.captionVerified,
    "pools.caption",
  );

  const options = pools.options.map((option) => ({
    ...option,
    media: resolveMedia(option.render),
  }));

  return (
    <Section id="pools" background="mist-hi" rail={{ label: "Pools" }}>
      <SectionInner>
        <h2 className="subdisplay text-step-3">{pools.headline}</h2>
        <div className="mt-12">
          <PoolConfigurator options={options} />
        </div>
        {caption && <p className="caption mt-8">{caption}</p>}
      </SectionInner>
    </Section>
  );
}
