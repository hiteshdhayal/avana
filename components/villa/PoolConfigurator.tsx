"use client";

import { useRef, useState } from "react";
import { PoolScaleDrawing } from "./PoolScaleDrawing";
import { Figure } from "@/components/media/Figure";
import { Reveal } from "@/components/layout/Reveal";
import { usePrefill } from "@/components/enquiry/PrefillProvider";
import type { PoolOption } from "@/content/types";
import type { MediaRef } from "@/lib/media-types";

type Option = PoolOption & { media: MediaRef };

/**
 * Pool configurator (spec 6.7). Radio-group semantics with arrow-key
 * navigation, and the selection is carried into the enquiry form.
 */
export function PoolConfigurator({ options }: { options: Option[] }) {
  const [index, setIndex] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const { setPool } = usePrefill();
  const selected = options[index];

  // Written to the shared prefill only on an actual selection — never on
  // mount. An effect keyed on `selected.id` would fire the moment this
  // component renders (option A is the initial `index`), silently writing
  // "pool A" onto every enquiry regardless of whether the visitor ever
  // touched the configurator (spec 6.7 only asks to carry an explicit choice).
  const select = (i: number) => {
    setIndex(i);
    setPool(options[i].id);
  };

  const move = (next: number) => {
    const clamped = (next + options.length) % options.length;
    select(clamped);
    refs.current[clamped]?.focus();
  };

  return (
    // Zigzag rhythm (spec 4.1 amendment): this row flips the drawing to the
    // right, controls to the left — the opposite of the location row above
    // it. DOM order is unchanged (drawing first) so mobile stacking still
    // shows the drawing before the controls, matching the other split
    // sections.
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
        <Reveal from="right">
          <PoolScaleDrawing pool={selected} />
        </Reveal>
      </div>

      <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
        <Reveal from="left">
          <div
            role="radiogroup"
            aria-label="Pool options"
            className="border-t border-[var(--rule)]"
          >
            {options.map((option, i) => {
              const checked = i === index;
              return (
                <button
                  key={option.id}
                  ref={(node) => {
                    refs.current[i] = node;
                  }}
                  type="button"
                  role="radio"
                  aria-checked={checked}
                  tabIndex={checked ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                      event.preventDefault();
                      move(i + 1);
                    }
                    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                      event.preventDefault();
                      move(i - 1);
                    }
                  }}
                  className="flex w-full items-baseline gap-4 border-b border-[var(--rule)] py-4 text-left"
                >
                  <span
                    aria-hidden="true"
                    className={[
                      "mt-1.5 block h-3 w-3 shrink-0 rounded-full border transition-colors duration-[var(--dur-fast)]",
                      checked
                        ? "border-amber bg-amber"
                        : "border-[var(--stone)] bg-transparent",
                    ].join(" ")}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block font-sans text-body text-ink">
                      {option.name}
                    </span>
                    <span className="tnum block font-sans text-caption text-ink-55">
                      {option.ft[0]} × {option.ft[1]} ft · {option.m[0]} ×{" "}
                      {option.m[1]} m
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative mt-8">
            {options.map((option) => (
              <div
                key={option.id}
                aria-hidden={option.id !== selected.id}
                className={[
                  "transition-opacity duration-[var(--dur-base)]",
                  option.id === selected.id
                    ? "opacity-100"
                    : "pointer-events-none absolute inset-0 opacity-0",
                ].join(" ")}
              >
                <Figure
                  media={option.media}
                  alt={option.name}
                  ratio="3:2"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
