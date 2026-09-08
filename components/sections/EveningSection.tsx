"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { resolveMedia } from "@/lib/media";
import type { MediaRef } from "@/lib/media-types";

/**
 * The emotional beat (spec 6.10). One image, one short passage, nothing else —
 * no CTA, no cards. The pause before the commercial half of the page.
 *
 * A client component only for its half of the shared parallax budget (spec
 * 4.6 allows exactly two scroll-linked effects: the rail, and this).
 */
export function EveningSection({
  passage,
  media,
}: {
  passage: string;
  media: MediaRef;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = ref.current;
    if (!node) return;

    const onScroll = () => {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = null;
        const rect = node.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const centered = rect.top - vh / 2;
        node.style.setProperty("--evening-shift", `${centered * -0.12}px`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <section
      data-scheme="dark"
      className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-ink text-mist"
    >
      <div
        ref={ref}
        className="absolute inset-0 -z-10"
        style={{ transform: "translate3d(0, var(--evening-shift, 0px), 0)" }}
      >
        {media.available && media.src ? (
          <Image
            src={media.src}
            alt="the enclave at dusk, pathways lit"
            fill
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-ink" />
        )}
        <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--ink)_55%,transparent)]" />
      </div>

      <div className="container-page">
        <p className="subdisplay max-w-3xl text-step-4">{passage}</p>
      </div>
    </section>
  );
}
