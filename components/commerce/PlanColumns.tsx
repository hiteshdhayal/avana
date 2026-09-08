import type { CSSProperties } from "react";
import { PlanACalculator } from "./PlanACalculator";
import { Button, ButtonLink } from "@/components/ui/Button";
import type { Plan } from "@/content/types";

/**
 * The three ownership plans (spec 6.11), as columns on desktop, stacked on
 * mobile. Plan A only ever reaches this component when
 * `lib/compliance.ts#canPublishPlanA` is true — see content/avana.ts, which
 * removes it from the array entirely rather than hiding it with CSS.
 */
export function PlanColumns({ plans }: { plans: Plan[] }) {
  // The column count tracks how many plans actually render (Plan A is absent
  // pre-counsel-signoff — spec 3.4). A grid fixed at 3 tracks with 2 plans
  // leaves an empty track that shows through as a stray block, so the track
  // count is set inline from the real count rather than hard-coded.
  return (
    <div
      className="plan-columns grid divide-y divide-[var(--rule)] border-y border-[var(--rule)] lg:divide-x lg:divide-y-0 lg:border-x"
      style={{ "--plan-cols": plans.length } as CSSProperties}
    >
      {plans.map((plan) => (
        <div key={plan.id} className="flex flex-col bg-mist p-6 lg:p-8">
          <p className="font-sans text-caption text-ink-55">
            Plan {plan.id}
          </p>
          <h3 className="subdisplay mt-1 text-step-2">{plan.name}</h3>
          <p className="measure mt-2 text-body text-ink-80">{plan.oneLiner}</p>

          <dl className="mt-8 flex-1">
            {plan.rows.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-4 border-t border-[var(--rule)] py-3"
              >
                <dt className="font-sans text-caption text-ink-55">
                  {row.label}
                </dt>
                <dd className="tnum text-right font-sans text-body text-ink">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>

          {plan.id === "A" && plan.payoutTable && (
            <div className="mt-6 space-y-4">
              <PlanACalculator table={plan.payoutTable} />
              {/* The disclosure lives in the same card, above the fold of the
                  card, not the footer (spec 3.4, 6.11). */}
              <p className="caption">
                Assured-return arrangements without a title are not the same
                as buying property. Read the disclosure below before
                proceeding, and rely only on the developer&rsquo;s written
                agreement — not this summary.
              </p>
            </div>
          )}

          {plan.qualifier && (
            <p className="caption mt-6">{plan.qualifier}</p>
          )}

          {plan.id === "B" ? (
            <ButtonLink
              href="#plan"
              variant={plan.id === "B" ? "primary" : "secondary"}
              className="mt-8"
            >
              {plan.cta}
            </ButtonLink>
          ) : (
            <Button
              variant="secondary"
              className="mt-8"
              data-enquiry-interest="Investment plan"
            >
              {plan.cta}
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
