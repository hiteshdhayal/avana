"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { MediaRef } from "@/lib/media";

/**
 * MahaRERA disclosure block.
 *
 * ── DO NOT MOVE, SHRINK OR RESTYLE THIS TO SUIT A LAYOUT ──────────────────
 * MahaRERA Order 46C/2025 (8 April 2025), under s.11(2) of the RERA Act 2016
 * and Rule 14(2) of the Maharashtra RERA Rules 2017, requires every
 * advertisement of a registered project — websites explicitly included — to
 * carry the registration number, the MahaRERA website address and a scannable
 * QR code, placed in the TOP-RIGHT QUADRANT, at a font size EQUAL TO OR LARGER
 * THAN THE LARGEST FONT USED FOR THE PROJECT'S CONTACT DETAILS, in a
 * high-visibility colour, with the QR at correct aspect ratio. Penalties run
 * to ₹50,000 per non-compliant advertisement.
 *
 * The type-size constraint is enforced by `--contact-type-max` in
 * styles/tokens.css: every contact detail on the page is rendered at or below
 * that size, and the registration number is rendered *at* it. Changing one
 * without the other breaks the rule. tests/compliance.spec.ts measures the
 * rendered sizes and fails the build if that stops being true.
 * ──────────────────────────────────────────────────────────────────────────
 */

type Variant = "header" | "inline" | "footer";

type Props = {
  variant: Variant;
  /** `null` until MahaRERA issues the number — see lib/compliance.ts. */
  regNumber: string | null;
  authorityUrl: string;
  qr: MediaRef;
};

const AUTHORITY_LABEL = "maharera.maharashtra.gov.in";

export function RegBlock({ variant, regNumber, authorityUrl, qr }: Props) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetId = useId();

  const qrNode = (
    <QrCode qr={qr} regNumber={regNumber} />
  );

  // High contrast is part of the order: dark ink on a light ground, never a
  // light grey, and never over visual clutter.
  const shell =
    "bg-mist-hi text-ink rounded-s border border-[color-mix(in_srgb,var(--ink)_18%,transparent)]";

  if (variant === "header") {
    return (
      <div
        data-reg-block="header"
        className={`${shell} flex max-w-[86vw] items-center gap-2 px-2.5 py-2 sm:max-w-none sm:gap-3 sm:px-3`}
      >
        <div className="min-w-0">
          <p className="text-balance font-sans text-[length:var(--contact-type-max)] font-semibold leading-tight tracking-tight">
            {regNumber ? (
              <>
                <span className="sr-only">MahaRERA registration number </span>
                <span data-reg-number className="tnum">
                  {regNumber}
                </span>
              </>
            ) : (
              <span data-reg-number>
                MahaRERA<span className="sr-only"> registration</span>
                <span aria-hidden="true"> reg.</span> in process
              </span>
            )}
          </p>
          {/* Below sm the URL lives in the QR sheet, so the block still carries
              all three required elements without overflowing the viewport. */}
          <a
            href={authorityUrl}
            className="hidden font-sans text-caption text-ink-80 underline decoration-[color-mix(in_srgb,var(--ink)_35%,transparent)] underline-offset-2 hover:text-ink sm:inline-block"
            rel="noopener"
          >
            {AUTHORITY_LABEL}
          </a>
        </div>

        {/* Desktop: the QR itself. Mobile: a tap target that opens it — the
            block is never removed on small screens. */}
        <div className="hidden sm:block">{qrNode}</div>
        <button
          type="button"
          className="rounded-s border border-[var(--stone)] px-2 py-1 font-sans text-caption text-ink sm:hidden"
          aria-expanded={sheetOpen}
          aria-controls={sheetId}
          onClick={() => setSheetOpen(true)}
        >
          QR
        </button>

        {sheetOpen && (
          <div
            id={sheetId}
            role="dialog"
            aria-modal="true"
            aria-label="MahaRERA QR code"
            className="fixed inset-0 z-[80] flex items-end bg-[color-mix(in_srgb,var(--ink)_70%,transparent)] sm:hidden"
            onClick={() => setSheetOpen(false)}
          >
            <div
              className="w-full rounded-t-[4px] bg-mist-hi p-6 pb-[calc(24px+env(safe-area-inset-bottom))]"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-sans text-[length:var(--contact-type-max)] font-semibold text-ink">
                {regNumber ?? "MahaRERA registration in process"}
              </p>
              <div className="mt-4 flex items-center gap-4">
                {qrNode}
                <a href={authorityUrl} className="font-sans text-caption text-ink-80 underline">
                  {AUTHORITY_LABEL}
                </a>
              </div>
              <button
                type="button"
                className="mt-6 w-full rounded-m border border-[var(--stone)] py-3 font-sans text-caption text-ink"
                onClick={() => setSheetOpen(false)}
                autoFocus
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      data-reg-block={variant}
      className={`${shell} flex items-start gap-4 p-4`}
    >
      {qrNode}
      <div className="min-w-0">
        <p className="font-sans text-caption uppercase tracking-[0.08em] text-ink-55">
          MahaRERA
        </p>
        <p className="mt-1 font-sans text-[length:var(--contact-type-max)] font-semibold leading-tight text-ink">
          <span data-reg-number className={regNumber ? "tnum" : ""}>
            {regNumber ?? "Registration in process"}
          </span>
        </p>
        <a
          href={authorityUrl}
          rel="noopener"
          className="mt-1 inline-block font-sans text-caption text-ink-80 underline underline-offset-2 hover:text-ink"
        >
          {AUTHORITY_LABEL}
        </a>
      </div>
    </div>
  );
}

/** Always square — the order names a distorted QR as a violation. */
function QrCode({ qr, regNumber }: { qr: MediaRef; regNumber: string | null }) {
  if (qr.available && qr.src) {
    return (
      <Image
        src={qr.src}
        alt={
          regNumber
            ? `QR code linking to MahaRERA registration ${regNumber}`
            : "QR code linking to the MahaRERA project page"
        }
        width={96}
        height={96}
        className="h-24 w-24 shrink-0 bg-white"
        // 1:1, minimum 96 CSS px — spec 3.3.
      />
    );
  }

  return (
    <div
      className="grid h-24 w-24 shrink-0 place-items-center border border-dashed border-[var(--stone)] bg-white p-1 text-center"
      role="img"
      aria-label="MahaRERA QR code not yet supplied"
    >
      <span className="font-sans text-[11px] leading-tight text-ink-55">
        QR
        <br />
        pending
      </span>
    </div>
  );
}
