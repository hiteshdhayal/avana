"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  from?: "left" | "right";
  className?: string;
};

/**
 * Spec 4.6's one named, bounded exception to the motion budget: a single
 * one-time reveal on the alternating Location/villa/pool rows, and nothing
 * else on the page.
 *
 * Plain IntersectionObserver + a CSS transition — the same primitives
 * useActiveSection/StickyActions/ContourRail already use — rather than a
 * JS animation library. That means the existing global
 * `prefers-reduced-motion` rule in globals.css (which forces every
 * transition to 1ms) covers this for free: no separate reduced-motion
 * branch to get wrong here.
 */
export function Reveal({ children, from = "left", className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-10% 0px", threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={from}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
