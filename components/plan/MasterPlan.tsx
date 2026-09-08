"use client";

import { useCallback, useRef, useState } from "react";
import {
  CLUBHOUSE,
  CONTOURS,
  GATE,
  NORTH,
  ROAD_SPINE,
  ROAD_SPURS,
  SCALE_BAR,
  TERRACE_BANDS,
} from "./geometry";
import { PlotDrawer } from "./PlotDrawer";
import { PlotFilter, isDimmed, type PoolFilter } from "./PlotFilter";
import { PlotLegend } from "./PlotLegend";
import { PlotShape } from "./PlotShape";
import { PlotTable } from "./PlotTable";
import { usePrefill } from "@/components/enquiry/PrefillProvider";
import type { Plot, PoolId } from "@/content/types";
import type { MediaRef } from "@/lib/media";

type Props = {
  plots: Plot[];
  viewBox: string;
  layoutStatus: "schematic" | "surveyed";
  caption: string;
  showAvailability: boolean;
  /** Orientation is `[VERIFY]` until the survey confirms it (spec 6.4). */
  orientationVerified: boolean;
  plotRender: MediaRef;
};

export function MasterPlan({
  plots,
  viewBox,
  layoutStatus,
  caption,
  showAvailability,
  orientationVerified,
  plotRender,
}: Props) {
  const [filter, setFilter] = useState<PoolFilter>("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState<Plot | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const { enquireAboutPlot } = usePrefill();

  const poolsInUse = Array.from(
    new Set(plots.map((p) => p.pool).filter((p): p is PoolId => p !== null)),
  ).sort();

  const focusPlot = useCallback((index: number) => {
    const clamped = (index + 18) % 18;
    setActiveIndex(clamped);
    const node = svgRef.current?.querySelectorAll<SVGGElement>("[data-plot]")[
      clamped
    ];
    node?.focus();
  }, []);

  /**
   * Keyboard path through the map (spec 6.5). Not optional: 18 interactive
   * shapes with no keyboard route is an accessibility failure.
   */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<SVGGElement>, index: number) => {
      const keys: Record<string, number> = {
        ArrowRight: 1,
        ArrowDown: 6, // one terrace down, in reading order
        ArrowLeft: -1,
        ArrowUp: -6,
      };

      if (event.key in keys) {
        event.preventDefault();
        focusPlot(index + keys[event.key]);
        return;
      }
      if (event.key === "Home") {
        event.preventDefault();
        focusPlot(0);
        return;
      }
      if (event.key === "End") {
        event.preventDefault();
        focusPlot(plots.length - 1);
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setSelected(plots[index]);
      }
    },
    [focusPlot, plots],
  );

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          {/* Below lg the map scrolls horizontally rather than shrinking every
              plot below a 44px touch target. */}
          <div className="-mx-[var(--gutter-mob)] overflow-x-auto px-[var(--gutter-mob)] sm:mx-0 sm:px-0">
            <svg
              ref={svgRef}
              viewBox={viewBox}
              role="group"
              aria-label={`Master plan: ${plots.length} plots across three terraces`}
              className="h-auto w-full min-w-[720px]"
            >
              {/* Ground: contours falling left to right. */}
              <g aria-hidden="true">
                {CONTOURS.map((d) => (
                  <path
                    key={d}
                    d={d}
                    fill="none"
                    stroke="var(--stone)"
                    strokeWidth="1"
                    opacity="0.18"
                  />
                ))}

                {TERRACE_BANDS.map((band) => (
                  <path
                    key={band.terrace}
                    d={band.d}
                    fill="var(--terrace)"
                    opacity="0.22"
                  />
                ))}

                <path
                  d={ROAD_SPINE}
                  fill="none"
                  stroke="var(--stone)"
                  strokeWidth="3"
                  strokeDasharray="10 8"
                  opacity="0.7"
                />
                {ROAD_SPURS.map((d) => (
                  <path
                    key={d}
                    d={d}
                    fill="none"
                    stroke="var(--stone)"
                    strokeWidth="3"
                    strokeDasharray="10 8"
                    opacity="0.7"
                  />
                ))}

                <rect
                  x={CLUBHOUSE.x}
                  y={CLUBHOUSE.y}
                  width={CLUBHOUSE.width}
                  height={CLUBHOUSE.height}
                  fill="none"
                  stroke="var(--stone)"
                  strokeWidth="1"
                />
                <text
                  x={CLUBHOUSE.x + CLUBHOUSE.width / 2}
                  y={CLUBHOUSE.y + CLUBHOUSE.height / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-sans"
                  style={{ fontSize: 17, fill: "var(--mist)", opacity: 0.75 }}
                >
                  {CLUBHOUSE.label}
                </text>

                {/* "You are here" — the one amber marker outside the plots. */}
                <circle cx={GATE.x} cy={GATE.y} r="7" fill="var(--amber)" />
                <text
                  x={GATE.x + 16}
                  y={GATE.y}
                  dominantBaseline="middle"
                  className="font-sans"
                  style={{ fontSize: 17, fill: "var(--mist)", opacity: 0.75 }}
                >
                  {GATE.label}
                </text>

                {/* Drawn only once the survey confirms orientation and scale —
                    a north arrow or scale bar on an indicative layout would be
                    precision the drawing does not have. */}
                {orientationVerified && (
                  <g>
                    <path
                      d={`M ${NORTH.x} ${NORTH.y + 28} L ${NORTH.x} ${NORTH.y - 12} M ${NORTH.x - 7} ${NORTH.y - 2} L ${NORTH.x} ${NORTH.y - 14} L ${NORTH.x + 7} ${NORTH.y - 2}`}
                      fill="none"
                      stroke="var(--mist)"
                      strokeWidth="1.5"
                      opacity="0.8"
                    />
                    <text
                      x={NORTH.x}
                      y={NORTH.y + 46}
                      textAnchor="middle"
                      className="font-sans"
                      style={{ fontSize: 16, fill: "var(--mist)", opacity: 0.8 }}
                    >
                      N
                    </text>
                  </g>
                )}
                {layoutStatus === "surveyed" && (
                  <g>
                    <path
                      d={`M ${SCALE_BAR.x} ${SCALE_BAR.y} h ${SCALE_BAR.units}`}
                      stroke="var(--mist)"
                      strokeWidth="2"
                      opacity="0.8"
                    />
                    <text
                      x={SCALE_BAR.x}
                      y={SCALE_BAR.y + 22}
                      className="font-sans tnum"
                      style={{ fontSize: 16, fill: "var(--mist)", opacity: 0.8 }}
                    >
                      {SCALE_BAR.feet} ft
                    </text>
                  </g>
                )}
              </g>

              {plots.map((plot, index) => (
                <PlotShape
                  key={plot.id}
                  plot={plot}
                  index={index}
                  isActive={index === activeIndex}
                  isSelected={selected?.id === plot.id}
                  dimmed={isDimmed(plot, filter)}
                  showAvailability={showAvailability}
                  onSelect={setSelected}
                  onFocusPlot={setActiveIndex}
                  onKeyDown={onKeyDown}
                />
              ))}
            </svg>
          </div>

          <p className="caption mt-4">{caption}</p>
          <PlotTable plots={plots} showAvailability={showAvailability} />
        </div>

        <aside className="space-y-10 lg:col-span-3 lg:col-start-10">
          <PlotLegend plots={plots} showAvailability={showAvailability} />
          <PlotFilter value={filter} onChange={setFilter} available={poolsInUse} />
          <p className="measure text-caption text-[var(--fg-muted)]">
            Select a plot to see its size, terrace and pool. Use the arrow keys
            to move between plots.
          </p>
        </aside>
      </div>

      <PlotDrawer
        plot={selected}
        showAvailability={showAvailability}
        render={plotRender}
        onClose={() => setSelected(null)}
        onEnquire={(plot) => {
          setSelected(null);
          enquireAboutPlot(String(plot.number).padStart(2, "0"));
        }}
      />
    </>
  );
}
