"use client";

import type { PoolId, Plot } from "@/content/types";

export type PoolFilter = PoolId | "all";

/** Pure, so the behaviour can be tested without a browser. */
export function isDimmed(plot: Plot, filter: PoolFilter): boolean {
  if (filter === "all") return false;
  return plot.pool !== filter;
}

type Props = {
  value: PoolFilter;
  onChange: (value: PoolFilter) => void;
  available: PoolId[];
};

export function PlotFilter({ value, onChange, available }: Props) {
  // Nothing to filter by until pools are assigned to plots. Showing chips that
  // dim every plot would be worse than not showing them.
  if (!available.length) return null;

  const options: PoolFilter[] = ["all", ...available];

  return (
    <div>
      <p className="font-sans text-caption text-[var(--fg-muted)]">
        Filter by pool
      </p>
      <div role="group" aria-label="Filter plots by pool" className="mt-3 flex gap-2">
        {options.map((option) => {
          const active = option === value;
          return (
            <button
              key={option}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option)}
              className={[
                "rounded-s border px-3 py-1.5 font-sans text-caption transition-colors duration-[var(--dur-fast)]",
                active
                  ? "border-amber bg-amber text-amber-ink"
                  : "border-[var(--rule)] text-[var(--fg)] hover:border-[var(--fg-strong)]",
              ].join(" ")}
            >
              {option === "all" ? "All" : option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
