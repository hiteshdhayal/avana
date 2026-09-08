"use client";

import { useMemo, useState } from "react";
import type { PayoutRow } from "@/content/types";
import { formatINR } from "@/lib/format";

const TICKETS = [1_000_000, 2_500_000, 3_000_000] as const;
const TERMS = [1, 2] as const;

/**
 * Plan A's optional micro-calculator (spec 6.11). A lookup, never a live
 * formula: two-year figures are `[VERIFY]` in the source and must be supplied
 * by the client, not extrapolated from the one-year rate.
 */
export function PlanACalculator({ table }: { table: PayoutRow[] }) {
  const [principal, setPrincipal] = useState<(typeof TICKETS)[number]>(
    TICKETS[0],
  );
  const [years, setYears] = useState<(typeof TERMS)[number]>(1);

  const row = useMemo(
    () => table.find((r) => r.principal === principal && r.years === years),
    [table, principal, years],
  );

  const known = row && row.verified && row.payout !== null;

  return (
    <div className="border border-[var(--rule)] p-6">
      <div className="flex flex-wrap gap-6">
        <fieldset>
          <legend className="font-sans text-caption text-ink-55">Amount</legend>
          <div role="group" className="mt-2 flex gap-2">
            {TICKETS.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={t === principal}
                onClick={() => setPrincipal(t)}
                className={[
                  "rounded-s border px-3 py-1.5 font-sans text-caption tnum",
                  t === principal
                    ? "border-amber bg-amber text-amber-ink"
                    : "border-[var(--rule)] text-ink-80",
                ].join(" ")}
              >
                {formatINR(t)}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-sans text-caption text-ink-55">Term</legend>
          <div role="group" className="mt-2 flex gap-2">
            {TERMS.map((y) => (
              <button
                key={y}
                type="button"
                aria-pressed={y === years}
                onClick={() => setYears(y)}
                className={[
                  "rounded-s border px-3 py-1.5 font-sans text-caption",
                  y === years
                    ? "border-amber bg-amber text-amber-ink"
                    : "border-[var(--rule)] text-ink-80",
                ].join(" ")}
              >
                {y} {y === 1 ? "year" : "years"}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <p className="mt-6 font-sans text-body text-ink">
        {known ? (
          <>
            Payout:{" "}
            <span className="tnum font-medium text-ink">
              {formatINR(row!.payout as number)}
            </span>
          </>
        ) : (
          "This figure has not been confirmed yet — the developer has not supplied a two-year payout table."
        )}
      </p>

      {/* Spec 3.4: never render a returns calculator without the disclosure
          visible in the same viewport as the result. The parent renders the
          disclosure immediately after this component, in the same card. */}
    </div>
  );
}
