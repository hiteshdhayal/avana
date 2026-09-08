"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Figure } from "@/components/media/Figure";
import type { Plot } from "@/content/types";
import type { MediaRef } from "@/lib/media-types";
import { formatNumber } from "@/lib/format";
import { publicClaim } from "@/lib/verified";

type Props = {
  plot: Plot | null;
  showAvailability: boolean;
  render: MediaRef;
  onClose: () => void;
  onEnquire: (plot: Plot) => void;
};

/**
 * Plot detail (spec 6.5): a right drawer on desktop, a bottom sheet on mobile.
 * The one place on the page allowed a drop shadow, because it genuinely floats
 * above the map (spec 4.4).
 */
export function PlotDrawer({
  plot,
  showAvailability,
  render,
  onClose,
  onEnquire,
}: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = plot !== null;

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!plot) return null;

  const facing = publicClaim(plot.facing, plot.facingVerified, "plot.facing");

  const rows: [string, string][] = [
    ["Plot", String(plot.number).padStart(2, "0")],
    ["Area", `${formatNumber(plot.areaSqft)} sq ft`],
    ["Terrace", String(plot.terrace)],
  ];
  if (plot.pool) rows.push(["Pool", `Pool ${plot.pool}`]);
  if (facing) rows.push(["Facing", facing]);
  if (showAvailability) rows.push(["Status", plot.status.replace("-", " ")]);

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={`Plot ${plot.number}`}
      data-scheme="light"
      className="
        fixed inset-x-0 bottom-0 z-[60] max-h-[80svh] overflow-y-auto bg-mist p-6
        text-ink shadow-[0_-24px_48px_rgba(12,30,38,0.10)]
        lg:inset-y-0 lg:left-auto lg:right-0 lg:max-h-none lg:w-[420px] lg:p-8
        lg:shadow-[-24px_0_48px_rgba(12,30,38,0.10)]
      "
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="subdisplay text-step-2">
          Plot {String(plot.number).padStart(2, "0")}
        </h3>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="rounded-s border border-[var(--stone)] px-3 py-1.5 font-sans text-caption"
        >
          Close
        </button>
      </div>

      <dl className="mt-6">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="flex items-baseline justify-between gap-6 border-t border-[var(--rule)] py-3"
          >
            <dt className="font-sans text-caption text-ink-55">{label}</dt>
            <dd className="tnum font-sans text-body text-ink">{value}</dd>
          </div>
        ))}
      </dl>

      <Figure
        media={render}
        alt={`villa on plot ${plot.number}`}
        ratio="3:2"
        className="mt-6"
        sizes="(max-width: 1024px) 100vw, 380px"
      />

      <Button
        variant="primary"
        size="lg"
        className="mt-6 w-full"
        onClick={() => onEnquire(plot)}
      >
        Enquire about Plot {String(plot.number).padStart(2, "0")}
      </Button>
    </div>
  );
}
