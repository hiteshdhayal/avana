import { Figure } from "@/components/media/Figure";
import { Section, SectionInner } from "@/components/layout/Section";
import { content } from "@/content/avana";
import { resolveMedia } from "@/lib/media";

/**
 * Amenities (spec 6.9). Full-bleed terrace green — the only green field on
 * the page, so it reads as the shared-land chapter. Ten items in a plain
 * three-column list, deliberately not ten identical rounded cards (spec 16).
 */
export function AmenitiesSection() {
  const amenities = content.amenities;

  return (
    <Section id="amenities" background="terrace" rail={{ label: "Amenities" }}>
      <SectionInner>
        <h2 className="subdisplay text-step-3">{amenities.headline}</h2>
        <p className="measure-lead mt-4 text-lead text-[var(--fg)]">
          {amenities.lead}
        </p>

        <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.items.map((item) => (
            <li key={item.name}>
              <p className="font-sans text-body font-medium text-mist">
                {item.name}
              </p>
              <p className="mt-1 font-sans text-caption text-[var(--fg-muted)]">
                {item.line}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <Figure
            media={resolveMedia(amenities.image)}
            alt="the clubhouse at dusk"
            ratio="21:9"
            sizes="100vw"
          />
        </div>
      </SectionInner>
    </Section>
  );
}
