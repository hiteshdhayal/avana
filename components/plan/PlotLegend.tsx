import type { Plot, PlotStatus } from "@/content/types";

const STATUS_LABEL: Record<PlotStatus, string> = {
  available: "Available",
  "on-hold": "On hold",
  sold: "Sold",
};

const SWATCH: Record<PlotStatus, string> = {
  available: "bg-[color-mix(in_srgb,var(--amber)_85%,transparent)]",
  "on-hold": "border border-[var(--stone)]",
  sold: "bg-[color-mix(in_srgb,var(--terrace)_45%,transparent)] line-through",
};

type Props = {
  plots: Plot[];
  /** Counts derive from the data, never hardcoded — and are only shown when
   *  someone actually maintains them (spec 6.5, honesty constraint). */
  showAvailability: boolean;
};

export function PlotLegend({ plots, showAvailability }: Props) {
  if (!showAvailability) {
    return (
      <p className="measure text-caption text-[var(--fg-muted)]">
        Plot availability changes daily and is confirmed by the sales team when
        you enquire, so it is not shown here.
      </p>
    );
  }

  const counts = plots.reduce<Record<PlotStatus, number>>(
    (acc, plot) => ({ ...acc, [plot.status]: (acc[plot.status] ?? 0) + 1 }),
    { available: 0, "on-hold": 0, sold: 0 },
  );

  return (
    <ul className="space-y-2">
      {(Object.keys(STATUS_LABEL) as PlotStatus[]).map((status) => (
        <li key={status} className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-3 font-sans text-caption">
            <span
              aria-hidden="true"
              className={`inline-block h-3 w-3 ${SWATCH[status]}`}
            />
            {STATUS_LABEL[status]}
          </span>
          <span className="tnum font-sans text-body font-medium">
            {counts[status]}
          </span>
        </li>
      ))}
    </ul>
  );
}
