"use client";

import { useEffect, useRef, useState } from "react";
import { FieldNotes } from "./FieldNotes";
import { HeroMedia } from "./HeroMedia";
import { ButtonLink } from "@/components/ui/Button";
import type { FieldNote } from "@/content/types";
import type { MediaRef } from "@/lib/media-types";

type Props = {
  h1: string;
  lead: string;
  primaryCta: string;
  secondaryCta: string;
  notes: FieldNote[];
  poster: MediaRef;
  video: string | null;
  hasRender: boolean;
};

/**
 * Splits the headline at its first comma so the two lines can reveal 120ms
 * apart (spec 6.2). Content-driven: a headline without a comma is one line.
 */
function splitHeadline(h1: string): [string, string | null] {
  const at = h1.indexOf(",");
  if (at === -1 || at === h1.length - 1) return [h1, null];
  return [h1.slice(0, at + 1), h1.slice(at + 1).trim()];
}

export function Hero({
  h1,
  lead,
  primaryCta,
  secondaryCta,
  notes,
  poster,
  video,
  hasRender,
}: Props) {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const frame = useRef<number | null>(null);
  const [line1, line2] = splitHeadline(h1);

  // The sequence runs once, on mount, and only when motion is welcome.
  // Server-rendered markup is already the finished state.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAnimate(true);
  }, []);

  // Parallax + scrim. One of the two scroll-linked effects the motion budget
  // allows (spec 4.6); disabled entirely under reduced motion.
  useEffect(() => {
    if (!animate) return;
    const node = sectionRef.current;
    if (!node) return;

    const onScroll = () => {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = null;
        const y = window.scrollY;
        const vh = window.innerHeight || 1;
        node.style.setProperty("--hero-shift", `${y * 0.12}px`);
        node.style.setProperty(
          "--hero-scrim",
          String(Math.min(0.9, (y / vh) * 0.9)),
        );
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, [animate]);

  return (
    <section
      ref={sectionRef}
      id="top"
      data-scheme="dark"
      className={`relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-mist ${
        animate ? "hero-anim" : ""
      }`}
    >
      <div
        className="absolute inset-0 -z-10"
        style={{ transform: "translate3d(0, var(--hero-shift, 0px), 0)" }}
      >
        <HeroMedia
          poster={poster}
          video={video}
          alt="the valley at Karjat Shindhol"
          animate={animate}
        />
      </div>

      <div className="container-page w-full pb-16 pt-[calc(var(--header-h)+48px)] lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <h1 className="display text-step-5">
              <span className="hero-line-1 block">{line1}</span>
              {line2 && <span className="hero-line-2 block">{line2}</span>}
            </h1>

            <p className="hero-lead measure-lead mt-8 text-lead text-[var(--fg)]">
              {lead}
            </p>

            <div className="hero-actions mt-10 flex flex-wrap gap-4">
              <ButtonLink href="#enquire" variant="primary" size="lg">
                {primaryCta}
              </ButtonLink>
              <ButtonLink href="#plan" variant="ghost" size="lg">
                {secondaryCta}
              </ButtonLink>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <FieldNotes notes={notes} />
          </div>
        </div>

        {hasRender && (
          <p className="credit mt-10 border-t border-[var(--rule)] pt-3 text-right">
            Artist&rsquo;s impression
          </p>
        )}
      </div>
    </section>
  );
}
