"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * The contour rail (spec 4.5).
 *
 * A fixed 96px column at the left of the viewport, containing a section
 * through the hillside rather than a straight line. The path carries
 * `pathLength="1"` and its `stroke-dashoffset` is bound to scroll progress, so
 * the line draws as you descend.
 *
 * The rail is a map of the whole document: each section's marker sits at its
 * proportional position, so the drawn length and the markers agree about where
 * you are. Below 1200px it is not rendered at all — mobile gets the sticky
 * action bar instead (spec 6.16), never a dot-nav.
 */

type Marker = { id: string; label: string; top: number; showLabel: boolean };

/** Vertical labels are as tall as they are long. Roughly 7px per character at
 *  --step--1, plus breathing room, decides whether two can coexist. */
function withLabelVisibility(
  markers: Omit<Marker, "showLabel">[],
  railHeight: number,
): Marker[] {
  let lastBottom = -Infinity;
  return markers.map((marker) => {
    const y = marker.top * railHeight;
    const height = marker.label.length * 7 + 16;
    const showLabel = y >= lastBottom;
    if (showLabel) lastBottom = y + height;
    return { ...marker, showLabel };
  });
}

export function ContourRail() {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();
  const frame = useRef<number | null>(null);

  // Measure section positions. Re-measured on resize, and once after load in
  // case images or fonts change the document height.
  useEffect(() => {
    const measure = () => {
      const nodes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-rail-label]"),
      );
      const docHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      const measured = nodes.map((node) => ({
        id: node.id,
        label: node.dataset.railLabel ?? "",
        // Proportional to scrollable distance, so a marker reaches the top
        // of the rail exactly when its section reaches the top of the view.
        top: Math.min(
          1,
          Math.max(0, (node.offsetTop - window.innerHeight * 0.2) / docHeight),
        ),
      }));
      setMarkers(withLabelVisibility(measured, window.innerHeight));
    };

    measure();
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    const t = window.setTimeout(measure, 1200);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      window.clearTimeout(t);
    };
  }, []);

  // Scroll progress, rAF-throttled. One continuous scroll-linked effect — the
  // motion budget in spec 4.6 allows exactly two.
  useEffect(() => {
    const onScroll = () => {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(() => {
        frame.current = null;
        const max = Math.max(
          document.documentElement.scrollHeight - window.innerHeight,
          1,
        );
        setProgress(Math.min(1, Math.max(0, window.scrollY / max)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  // Active section: the last one whose top has passed the upper third.
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-rail-label]"),
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [markers.length]);

  // Reduced motion: the path renders fully drawn on load (spec 4.5).
  const dashoffset = reduceMotion ? 0 : 1 - progress;

  return (
    <aside
      aria-label="Page sections"
      className="pointer-events-none fixed inset-y-0 left-0 z-40 hidden w-[var(--rail-w)] rail:block"
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 96 1000"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* The undrawn line, so the descent reads against something. */}
        <path
          d={CONTOUR}
          stroke="var(--rule)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0.5"
        />
        <path
          d={CONTOUR}
          stroke="var(--fg-strong)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={dashoffset}
          style={
            reduceMotion
              ? undefined
              : { transition: "stroke-dashoffset 120ms linear" }
          }
        />
      </svg>

      <ul className="pointer-events-auto absolute inset-0">
        {markers.map((marker) => {
          const isActive = marker.id === activeId;
          return (
            <li
              key={marker.id}
              className="absolute left-0 flex w-[var(--rail-w)] items-center gap-2"
              style={{ top: `${marker.top * 100}%` }}
            >
              <a
                href={`#${marker.id}`}
                className="group flex items-center gap-2 py-2 pl-10"
                aria-current={isActive ? "true" : undefined}
                title={marker.label}
              >
                <span
                  aria-hidden="true"
                  className="block shrink-0 transition-colors duration-[var(--dur-fast)]"
                  style={{
                    backgroundColor: isActive
                      ? "var(--amber)"
                      : "var(--fg-muted)",
                    height: "5px",
                    width: "5px",
                  }}
                />
                <span
                  className={[
                    "caption whitespace-nowrap transition-colors duration-[var(--dur-fast)] [writing-mode:vertical-rl]",
                    marker.showLabel || isActive ? "" : "sr-only",
                  ].join(" ")}
                  style={{ color: isActive ? "var(--fg-strong)" : undefined }}
                >
                  {marker.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

/** A section through the hillside: gentle, irregular, falling left to right. */
const CONTOUR =
  "M 19.5 0 C 30 70, 12 130, 22.5 205 S 36 300, 25.5 372 C 16.5 436, 31.5 486, 27 556 " +
  "S 13.5 648, 24 720 C 33 782, 18 842, 25.5 906 S 31.5 962, 22.5 1000";
