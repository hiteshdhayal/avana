import type { ConnectivityRow } from "@/content/types";
import { formatMinutes } from "@/lib/format";

/**
 * Drive times as a bar chart made of hairlines (spec 6.4): each row is a 1px
 * rule whose length is proportional to the time.
 *
 * Only rows the client has confirmed reach this component. Unverified rows are
 * absent, not blank — spec 14, P3: "unverified rows are absent, not blank."
 * The builder does not invent distances.
 */
export function ConnectivityRail({ rows }: { rows: ConnectivityRow[] }) {
  if (!rows.length) return null;

  const longest = Math.max(...rows.map((r) => r.minutes ?? 0), 1);

  return (
    <dl className="mt-10">
      {rows.map((row) => {
        const minutes = row.minutes ?? 0;
        const share = Math.max(0.12, minutes / longest);
        return (
          <div
            key={row.to}
            className="border-t border-[var(--rule)] py-4 first:border-t-0 first:pt-0"
          >
            <div className="flex items-baseline justify-between gap-6">
              <dt className="font-sans text-body text-ink-80">{row.to}</dt>
              <dd className="tnum shrink-0 font-sans text-body font-medium text-ink">
                {formatMinutes(minutes)}
              </dd>
            </div>
            <div
              aria-hidden="true"
              className="mt-3 h-px bg-[var(--stone)]"
              style={{ width: `${share * 100}%` }}
            />
          </div>
        );
      })}
    </dl>
  );
}
