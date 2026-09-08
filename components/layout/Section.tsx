import type { ReactNode } from "react";

export type Background = "mist" | "mist-hi" | "ink" | "terrace";

const backgrounds: Record<Background, string> = {
  mist: "bg-mist text-ink-80",
  "mist-hi": "bg-mist-hi text-ink-80",
  ink: "bg-ink text-mist",
  terrace: "bg-terrace text-mist",
};

const schemes: Record<Background, "light" | "dark"> = {
  mist: "light",
  "mist-hi": "light",
  ink: "dark",
  terrace: "dark",
};

type Props = {
  id?: string;
  background?: Background;
  /** Registers a tick + label on the contour rail (spec 4.5). */
  rail?: { label: string };
  /** Skip the standard vertical rhythm — full-bleed media sections only. */
  bare?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * The one section-rhythm rule (spec 4.4): 128px desktop / 96 tablet / 72 mobile,
 * applied here and nowhere else. Per-section padding overrides are what make a
 * page's rhythm drift, so there is a single `.section-pad` class and every
 * section on the page goes through this component.
 */
export function Section({
  id,
  background = "mist",
  rail,
  bare = false,
  className = "",
  children,
}: Props) {
  return (
    <section
      id={id}
      data-scheme={schemes[background]}
      data-rail-label={rail?.label}
      className={`relative ${backgrounds[background]} ${bare ? "" : "section-pad"} ${className}`}
      style={{ scrollMarginTop: "var(--header-h, 88px)" }}
    >
      {children}
    </section>
  );
}

/** Standard measured container. Sections that need full bleed opt out. */
export function SectionInner({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={`container-page ${className}`}>{children}</div>;
}
