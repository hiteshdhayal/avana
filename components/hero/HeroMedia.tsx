"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MediaRef } from "@/lib/media-types";

type Props = {
  poster: MediaRef;
  video: string | null;
  alt: string;
  /** Set once the page-load sequence may begin. */
  animate: boolean;
};

/**
 * Hero media (spec 6.2, 11).
 *
 * The still is the LCP element and is always what loads first. The video is an
 * enhancement and is only fetched on a wide viewport, with motion welcome and
 * without Save-Data — spec 11: "If the hero video costs more than 400ms of LCP
 * on a Moto-class device, cut it and ship the still."
 */
export function HeroMedia({ poster, video, alt, animate }: Props) {
  const [videoReady, setVideoReady] = useState(false);
  const [wantsVideo, setWantsVideo] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 899px)").matches;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (reduced || narrow || connection?.saveData) return;

    // The video swaps in at 1400ms at the earliest — never before the poster
    // has had its moment (spec 6.2 load sequence).
    const t = window.setTimeout(() => setWantsVideo(true), 1400);
    return () => window.clearTimeout(t);
  }, [video]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <div className="hero-media absolute inset-0 will-change-transform">
        {poster.available && poster.src ? (
          <Image
            src={poster.src}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <PendingHero />
        )}

        {wantsVideo && video && (
          <video
            ref={ref}
            muted
            playsInline
            loop
            autoPlay
            preload="none"
            aria-hidden="true"
            onCanPlayThrough={() => setVideoReady(true)}
            className={[
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-[var(--dur-slow)]",
              videoReady ? "opacity-100" : "opacity-0",
            ].join(" ")}
            src={video}
          />
        )}
      </div>

      {/* Keeps display type at 7:1 or better over any render (spec 6.2). */}
      <div
        className={`hero-overlay-veil absolute inset-0 ${animate ? "" : ""}`}
        style={{
          background:
            "linear-gradient(100deg, rgba(12,30,38,.78) 0%, rgba(12,30,38,.45) 45%, rgba(12,30,38,.15) 100%)",
        }}
      />
      {/* Scroll darkening, driven by the parent's --hero-scrim. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-ink"
        style={{ opacity: "var(--hero-scrim, 0)" }}
      />
    </div>
  );
}

/**
 * No render has been delivered yet (spec 3.2). The hero holds its shape with
 * the same contour language as the rest of the page rather than a grey box or
 * invented photography.
 */
function PendingHero() {
  return (
    <div className="absolute inset-0 bg-ink">
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMidYMid slice"
      >
        {Array.from({ length: 9 }).map((_, i) => {
          const y = 120 + i * 62;
          return (
            <path
              key={y}
              d={`M -40 ${y} C 220 ${y - 46 - i * 4}, 520 ${y + 30}, 780 ${y - 16} S 1120 ${y - 52}, 1240 ${y - 8}`}
              fill="none"
              stroke="var(--stone)"
              strokeWidth="1"
              opacity={0.16 + i * 0.012}
            />
          );
        })}
      </svg>
    </div>
  );
}
