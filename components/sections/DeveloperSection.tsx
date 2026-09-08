import { Rule } from "@/components/ui/Rule";
import { Section, SectionInner } from "@/components/layout/Section";
import { content } from "@/content/avana";

/**
 * Developer credibility (spec 6.13). The trust-facts panel is entirely
 * client-supplied — years active, projects delivered, units handed over,
 * LLPIN, registered office — and none of it exists in the seed. Spec: "Do not
 * invent any of these. If none are supplied, drop the panel; an empty stat is
 * worse than no stat." So the panel is simply absent until the client sends
 * real numbers.
 */
export function DeveloperSection() {
  const developer = content.developer;
  const facts = developer.trustFacts;
  const hasFacts =
    facts.verified &&
    (facts.yearsActive !== null ||
      facts.projectsDelivered !== null ||
      facts.unitsHandedOver !== null);

  return (
    <Section id="developer" background="mist" rail={{ label: "Developer" }}>
      <SectionInner>
        <span aria-hidden="true" className="block h-px w-16 bg-brass" />
        <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h2 className="subdisplay text-step-3">{developer.headline}</h2>
            <p className="measure mt-6 text-body">{developer.body}</p>

            <ul className="mt-10">
              {developer.principles.map((p, i) => (
                <li key={p.name}>
                  {i > 0 && <Rule className="border-t-[var(--brass)]/40" />}
                  <div className="py-4">
                    <p className="font-sans text-body font-medium text-ink">
                      {p.name}
                    </p>
                    <p className="mt-1 font-sans text-caption text-ink-55">
                      {p.line}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-8 font-sans text-caption">
              <a
                href={developer.website}
                rel="noopener"
                className="text-ink-80 underline underline-offset-2 hover:text-ink"
              >
                {developer.website.replace(/^https?:\/\//, "")}
              </a>
              {" · "}
              <a
                href={`mailto:${content.contact.email}`}
                className="text-ink-80 underline underline-offset-2 hover:text-ink"
              >
                {content.contact.email}
              </a>
            </p>
          </div>

          {hasFacts && (
            <div className="lg:col-span-4 lg:col-start-9">
              <dl className="border-t border-[var(--rule)]">
                {facts.yearsActive !== null && (
                  <TrustFact label="Years active" value={facts.yearsActive} />
                )}
                {facts.projectsDelivered !== null && (
                  <TrustFact
                    label="Projects delivered"
                    value={facts.projectsDelivered}
                  />
                )}
                {facts.unitsHandedOver !== null && (
                  <TrustFact
                    label="Units handed over"
                    value={facts.unitsHandedOver}
                  />
                )}
              </dl>
            </div>
          )}
        </div>
      </SectionInner>
    </Section>
  );
}

function TrustFact({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-[var(--rule)] py-4">
      <dt className="font-sans text-caption text-ink-55">{label}</dt>
      <dd className="tnum font-sans text-step-2 font-medium text-ink">
        {value}
      </dd>
    </div>
  );
}
