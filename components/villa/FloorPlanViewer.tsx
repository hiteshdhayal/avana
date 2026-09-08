"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import type { FloorPlan } from "@/content/types";
import type { MediaRef } from "@/lib/media-types";

type Level = FloorPlan & { media: MediaRef };

const MAX_ZOOM = 2.5;

/**
 * Floor-plan viewer (spec 6.6). Tabs cross-fade; they never slide.
 *
 * Only the first-floor plan exists in the source material, and only at
 * unusable resolution (spec 3.2), so a missing level shows "Plan available on
 * request" rather than a placeholder drawing that would read as the real one.
 */
export function FloorPlanViewer({ levels }: { levels: Level[] }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragging = useRef<{ x: number; y: number } | null>(null);

  const current = levels[active];

  const reset = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const changeLevel = (index: number) => {
    setActive(index);
    reset();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      changeLevel((active + 1) % levels.length);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      changeLevel((active - 1 + levels.length) % levels.length);
    }
  };

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!current.media.available) return;
    event.preventDefault();
    setZoom((z) =>
      Math.min(MAX_ZOOM, Math.max(1, z - Math.sign(event.deltaY) * 0.25)),
    );
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Floor plans"
        className="flex gap-1"
        onKeyDown={onKeyDown}
      >
        {levels.map((level, index) => (
          <button
            key={level.level}
            role="tab"
            type="button"
            id={`floorplan-tab-${index}`}
            aria-selected={index === active}
            aria-controls={`floorplan-panel-${index}`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => changeLevel(index)}
            className={[
              "border-b px-4 py-2 font-sans text-caption transition-colors duration-[var(--dur-fast)]",
              index === active
                ? "border-amber text-ink"
                : "border-[var(--rule)] text-ink-55 hover:text-ink",
            ].join(" ")}
          >
            {level.level}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`floorplan-panel-${active}`}
        aria-labelledby={`floorplan-tab-${active}`}
        className="relative mt-4 aspect-[4/3] overflow-hidden rounded-img bg-mist-hi"
        onWheel={onWheel}
        onPointerDown={(e) => {
          if (zoom === 1) return;
          dragging.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
        }}
        onPointerMove={(e) => {
          if (!dragging.current) return;
          setPan({
            x: e.clientX - dragging.current.x,
            y: e.clientY - dragging.current.y,
          });
        }}
        onPointerUp={() => {
          dragging.current = null;
        }}
      >
        {current.media.available && current.media.src ? (
          <Image
            key={current.level}
            src={current.media.src}
            alt={`${current.level} floor plan`}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-contain transition-opacity duration-[var(--dur-base)]"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              cursor: zoom > 1 ? "grab" : "default",
            }}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center p-8 text-center">
            <div>
              <p className="font-sans text-body text-ink">
                Plan available on request
              </p>
              <p className="caption mt-2">
                The approved {current.level.toLowerCase()}-floor drawing has not
                been released yet.
              </p>
            </div>
          </div>
        )}
      </div>

      {current.media.available && (
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
            className="rounded-s border border-[var(--rule)] px-3 py-1.5 font-sans text-caption"
          >
            Zoom out
          </button>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z + 0.25))}
            className="rounded-s border border-[var(--rule)] px-3 py-1.5 font-sans text-caption"
          >
            Zoom in
          </button>
          <span className="tnum caption">{zoom.toFixed(2)}×</span>
        </div>
      )}
    </div>
  );
}
