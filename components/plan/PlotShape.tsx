"use client";

import type { Plot } from "@/content/types";
import { formatNumber } from "@/lib/format";

type Props = {
  plot: Plot;
  index: number;
  isActive: boolean;
  isSelected: boolean;
  dimmed: boolean;
  /** False while nobody maintains availability — see spec 6.5, honesty. */
  showAvailability: boolean;
  onSelect: (plot: Plot) => void;
  onFocusPlot: (index: number) => void;
  onKeyDown: (event: React.KeyboardEvent<SVGGElement>, index: number) => void;
};

/** Colour is never the only signal (spec 12.1): sold plots are struck through
 *  as well as tinted, and available plots carry a filled marker. */
function fillFor(plot: Plot, showAvailability: boolean): string {
  if (!showAvailability) return "color-mix(in srgb, var(--stone) 28%, transparent)";
  if (plot.status === "available")
    return "color-mix(in srgb, var(--amber) 85%, transparent)";
  if (plot.status === "sold")
    return "color-mix(in srgb, var(--terrace) 45%, transparent)";
  return "transparent";
}

export function PlotShape({
  plot,
  index,
  isActive,
  isSelected,
  dimmed,
  showAvailability,
  onSelect,
  onFocusPlot,
  onKeyDown,
}: Props) {
  const [lx, ly] = plot.labelXY;

  const label = [
    `Plot ${plot.number}`,
    `${formatNumber(plot.areaSqft)} square feet`,
    `terrace ${plot.terrace}`,
    plot.pool ? `Pool ${plot.pool}` : null,
    showAvailability ? plot.status.replace("-", " ") : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <g
      role="button"
      tabIndex={isActive ? 0 : -1}
      aria-label={label}
      aria-pressed={isSelected}
      data-plot={plot.id}
      className="
        plot cursor-pointer outline-none
        [&:focus-visible_.plot-outline]:stroke-amber
        [&:focus-visible_.plot-flag]:opacity-100
        [&:focus-visible_.plot-number]:scale-[1.08]
        [&:hover_.plot-flag]:opacity-100
        [&:hover_.plot-number]:scale-[1.08]
      "
      style={{
        opacity: dimmed ? 0.25 : 1,
        transition: "opacity var(--dur-base) var(--ease-out)",
      }}
      onClick={() => onSelect(plot)}
      onFocus={() => onFocusPlot(index)}
      onKeyDown={(event) => onKeyDown(event, index)}
    >
      <path
        className="plot-outline"
        d={plot.path}
        fill={fillFor(plot, showAvailability)}
        stroke={isSelected ? "var(--mist)" : "var(--stone)"}
        strokeWidth={isSelected ? 2 : 1}
      />

      <text
        x={lx}
        y={ly}
        textAnchor="middle"
        dominantBaseline="middle"
        className="plot-number tnum pointer-events-none select-none font-sans"
        style={{
          fontSize: 22,
          fontWeight: 500,
          fill:
            showAvailability && plot.status === "available"
              ? "var(--amber-ink)"
              : "var(--mist)",
          textDecoration:
            showAvailability && plot.status === "sold" ? "line-through" : "none",
          transformBox: "fill-box",
          transformOrigin: "center",
          transition: "transform var(--dur-fast) var(--ease-out)",
        }}
      >
        {String(plot.number).padStart(2, "0")}
      </text>

      {/* Hover and focus raise a floating label, joined to the plot by a
          hairline (spec 6.5). */}
      <g
        className="plot-flag pointer-events-none opacity-0"
        style={{ transition: "opacity var(--dur-fast) var(--ease-out)" }}
      >
        <line
          x1={lx}
          y1={ly - 64}
          x2={lx}
          y2={ly - 92}
          stroke="var(--mist)"
          strokeWidth="1"
          opacity="0.7"
        />
        <text
          x={lx}
          y={ly - 102}
          textAnchor="middle"
          className="font-sans tnum"
          style={{ fontSize: 18, fill: "var(--mist)" }}
        >
          {`Plot ${String(plot.number).padStart(2, "0")} · ${formatNumber(plot.areaSqft)} sq ft`}
        </text>
      </g>

      {/* Larger invisible hit area — 44px minimum target on touch (spec 12.1). */}
      <path d={plot.path} fill="transparent" stroke="transparent" strokeWidth={18} />
    </g>
  );
}
