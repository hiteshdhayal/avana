"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { PoolId } from "@/content/types";

/**
 * Carries a selection made on the master plan or the pool configurator into the
 * enquiry form (spec 6.5, 6.7, 6.14).
 *
 * It wraps server-rendered children, so sections stay server components — only
 * the pieces that actually read or write the selection become client code.
 */
type Prefill = {
  plot: string | null;
  pool: PoolId | null;
  setPlot: (plot: string | null) => void;
  setPool: (pool: PoolId | null) => void;
  /** Select a plot and take the visitor to the form. */
  enquireAboutPlot: (plot: string) => void;
};

const PrefillContext = createContext<Prefill | null>(null);

export function PrefillProvider({ children }: { children: ReactNode }) {
  const [plot, setPlot] = useState<string | null>(null);
  const [pool, setPool] = useState<PoolId | null>(null);

  const enquireAboutPlot = useCallback((next: string) => {
    setPlot(next);
    const target = document.getElementById("enquire");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
    // Focus the first field so keyboard users land where the action is.
    window.setTimeout(
      () => document.getElementById("enquiry-name")?.focus(),
      reduced ? 0 : 700,
    );
  }, []);

  const value = useMemo(
    () => ({ plot, pool, setPlot, setPool, enquireAboutPlot }),
    [plot, pool, enquireAboutPlot],
  );

  return (
    <PrefillContext.Provider value={value}>{children}</PrefillContext.Provider>
  );
}

export function usePrefill(): Prefill {
  const ctx = useContext(PrefillContext);
  if (!ctx) {
    throw new Error("usePrefill must be used inside <PrefillProvider>");
  }
  return ctx;
}
