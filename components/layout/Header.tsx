"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RegBlock } from "./RegBlock";
import { ButtonLink } from "@/components/ui/Button";
import { useActiveSection } from "@/hooks/useActiveSection";
import type { MediaRef } from "@/lib/media-types";

const NAV = [
  { href: "#location", id: "location", label: "Location" },
  { href: "#plan", id: "plan", label: "Master plan" },
  { href: "#villa", id: "villa", label: "The villa" },
  { href: "#plans", id: "plans", label: "Plans" },
  { href: "#enquire", id: "enquire", label: "Visit" },
];

const NAV_IDS = NAV.map((n) => n.id);

type Props = {
  projectName: string;
  regNumber: string | null;
  authorityUrl: string;
  qr: MediaRef;
  /** Home page only: the header starts transparent over the hero render. */
  overHero?: boolean;
  ctaLabel: string;
};

export function Header({
  projectName,
  regNumber,
  authorityUrl,
  qr,
  overHero = false,
  ctaLabel,
}: Props) {
  const [solid, setSolid] = useState(!overHero);
  const active = useActiveSection(NAV_IDS);

  // Transparent over the hero; solid past 80vh (spec 6.1).
  useEffect(() => {
    if (!overHero) return;
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHero]);

  return (
    <header
      data-scheme={solid ? "light" : "dark"}
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-[var(--dur-base)]",
        solid
          ? "border-b border-[var(--stone)] bg-mist text-ink"
          : "border-b border-transparent bg-transparent text-mist",
      ].join(" ")}
    >
      {/* Below sm the reg block takes its own right-aligned line rather than
          squeezing the wordmark: the block may not shrink to fit a layout. */}
      <div className="container-page flex flex-wrap items-start justify-between gap-x-4 gap-y-2 py-3 lg:!pl-[var(--gutter-desk)]">
        <div className="flex min-w-0 items-center gap-8">
          <Link href="/#top" className="block shrink-0">
            <span className="subdisplay block text-[1.0625rem] leading-none sm:text-[1.375rem]">
              {projectName}
            </span>
            {/* 24px brass rule under the wordmark — spec 6.1. */}
            <span
              aria-hidden="true"
              className="mt-1.5 block h-px w-6 bg-brass"
            />
          </Link>

          <nav aria-label="Sections" className="hidden md:block">
            <ul className="flex items-center gap-6">
              {NAV.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-current={active === item.id ? "true" : undefined}
                    className={[
                      "block border-b py-1 font-sans text-caption transition-colors duration-[var(--dur-fast)]",
                      active === item.id
                        ? "border-amber"
                        : "border-transparent hover:border-[currentColor]",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex w-full shrink-0 items-start justify-end gap-3 sm:w-auto">
          {/* Wrapped rather than given `hidden lg:inline-flex`: the button's own
              `inline-flex` sits later in the cascade and would win. */}
          <div className="hidden lg:block">
            <ButtonLink href="#enquire" variant="ghost">
              {ctaLabel}
            </ButtonLink>
          </div>

          {/* Top-right quadrant. Non-negotiable placement — see RegBlock. */}
          <RegBlock
            variant="header"
            regNumber={regNumber}
            authorityUrl={authorityUrl}
            qr={qr}
          />
        </div>
      </div>
    </header>
  );
}
