"use client";

import { useEffect, useState } from "react";

type Props = {
  telHref: string | null;
  whatsappHref: string | null;
  visitLabel: string;
};

/**
 * Mobile conversion bar (spec 6.16). Appears once 60% of the hero has scrolled
 * past, and hides while the enquiry form is in view — it would otherwise cover
 * the submit button.
 */
export function StickyActions({ telHref, whatsappHref, visitLabel }: Props) {
  const [shown, setShown] = useState(false);
  const [formInView, setFormInView] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const form = document.getElementById("enquire");
    if (!form) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFormInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  const visible = shown && !formInView;

  return (
    <div
      data-sticky-actions
      aria-hidden={!visible}
      className={[
        "fixed inset-x-0 bottom-0 z-50 bg-ink text-mist lg:hidden",
        "pb-[env(safe-area-inset-bottom)] transition-transform duration-[var(--dur-base)] ease-out",
        visible ? "translate-y-0" : "translate-y-full",
      ].join(" ")}
    >
      <div className="grid h-16 grid-cols-3 items-stretch">
        {telHref ? (
          <a
            href={telHref}
            data-analytics="click_call"
            data-contact-detail
            className="grid place-items-center font-sans text-caption"
            tabIndex={visible ? undefined : -1}
          >
            Call
          </a>
        ) : (
          <span />
        )}

        {whatsappHref ? (
          <a
            href={whatsappHref}
            data-analytics="click_whatsapp"
            data-contact-detail
            target="_blank"
            rel="noopener"
            className="grid place-items-center bg-amber font-sans text-caption font-medium text-amber-ink"
            tabIndex={visible ? undefined : -1}
          >
            WhatsApp
          </a>
        ) : (
          <span />
        )}

        <a
          href="#enquire"
          className="grid place-items-center font-sans text-caption"
          tabIndex={visible ? undefined : -1}
        >
          {visitLabel}
        </a>
      </div>
    </div>
  );
}
