"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Script from "next/script";
import { ConsentCheckbox } from "./ConsentCheckbox";
import { fieldDescribedBy, Field, inputClasses } from "./Field";
import { PhoneField } from "./PhoneField";
import { submitEnquiry, type EnquiryResult } from "@/app/actions/enquiry";
import { Button } from "@/components/ui/Button";
import { usePrefill } from "@/components/enquiry/PrefillProvider";
import { INTERESTS } from "@/lib/schema";
import { toE164, DEFAULT_COUNTRY_CODE } from "@/lib/phone";
import { track } from "@/lib/analytics";

type Props = {
  consentLabel: string;
  successTitle: string;
  successBody: string;
  failureMessage: string;
  telHref: string | null;
  phoneDisplay: string | null;
  whatsappHref: string | null;
};

const FAILURE_REASON_COPY: Record<string, string> = {
  spam: "That submission looked automated, so we didn't send it. If that's wrong, please try again.",
  "rate-limited": "Too many attempts from this connection. Please try again in a little while, or call us.",
  "bot-check-failed": "We couldn't confirm you're not a robot. Please try again.",
  "server-error": "That didn't send. Call us, or message us on WhatsApp.",
};

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function EnquiryForm({
  consentLabel,
  successTitle,
  successBody,
  failureMessage,
  telHref,
  phoneDisplay,
  whatsappHref,
}: Props) {
  const { plot, pool } = usePrefill();
  const [pending, startTransition] = useTransition();
  const [result, setResult] = useState<EnquiryResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [interest, setInterest] = useState<(typeof INTERESTS)[number]>(
    INTERESTS[0],
  );
  const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);
  const [localPhone, setLocalPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const renderedAt = useRef(Date.now());
  const beganRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  // Cloudflare's script calls this once it renders the widget.
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY) return;
    (window as unknown as { onTurnstileLoad?: () => void }).onTurnstileLoad =
      () => {
        const turnstile = (
          window as unknown as {
            turnstile?: {
              render: (
                el: HTMLElement,
                opts: { sitekey: string; callback: (token: string) => void },
              ) => void;
            };
          }
        ).turnstile;
        if (turnstile && turnstileRef.current) {
          turnstile.render(turnstileRef.current, {
            sitekey: TURNSTILE_SITE_KEY,
            callback: setTurnstileToken,
          });
        }
      };
  }, []);

  const onFieldFocus = () => {
    if (!beganRef.current) {
      beganRef.current = true;
      track("begin_enquiry");
    }
  };

  const onBlurField = (name: string, value: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      if (name === "name" && value.trim().length > 0 && value.trim().length < 2) {
        next.name = "Enter your name.";
      } else if (name === "name") {
        delete next.name;
      }
      return next;
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // A plain onSubmit + preventDefault, not the `action` prop: this
    // component already owns its pending state via useTransition, and a
    // form's `action` attribute is unambiguous only for actual Server
    // Actions passed directly — routing a local client closure through it
    // risked a native submission (a full navigation) instead of the
    // intercepted one, which is exactly what happened during testing.
    event.preventDefault();
    setErrors({});
    const formData = new FormData(event.currentTarget);

    // Compose the full E.164 number the schema expects.
    const phone = toE164(countryCode, localPhone);
    formData.set("phone", phone);
    formData.set("interest", interest);
    formData.set("plot", plot ?? "");
    formData.set("poolPreference", pool ?? "");
    formData.set("consent", consent ? "true" : "false");
    formData.set("renderedAt", String(renderedAt.current));
    formData.set("turnstileToken", turnstileToken);

    startTransition(async () => {
      const res = await submitEnquiry(formData);
      setResult(res);
      if (!res.ok && res.reason === "validation") {
        setErrors(res.fieldErrors);
      }
      if (res.ok) {
        track("generate_lead", { interest, plot: plot ?? undefined });
        if (res.ics) downloadIcs(res.ics);
      }
    });
  };

  if (result?.ok) {
    return (
      <SuccessPanel
        title={successTitle}
        body={successBody}
        phoneDisplay={phoneDisplay}
        whatsappHref={whatsappHref}
        ics={result.ics}
      />
    );
  }

  const topLevelError =
    result && !result.ok && result.reason !== "validation"
      ? (FAILURE_REASON_COPY[result.reason] ?? failureMessage)
      : null;

  return (
    <>
      {TURNSTILE_SITE_KEY && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileLoad&render=explicit"
          strategy="afterInteractive"
        />
      )}

      <form
        ref={formRef}
        onSubmit={onSubmit}
        onFocus={onFieldFocus}
        noValidate
        className="space-y-6"
      >
        <Field id="enquiry-name" label="Name" error={errors.name}>
          <input
            id="enquiry-name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={60}
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={fieldDescribedBy("enquiry-name", Boolean(errors.name), false)}
            onBlur={(e) => onBlurField("name", e.target.value)}
            className={`w-full ${inputClasses(Boolean(errors.name))}`}
          />
        </Field>

        <Field id="enquiry-phone" label="Phone" error={errors.phone}>
          <PhoneField
            countryCode={countryCode}
            local={localPhone}
            onCountryChange={setCountryCode}
            onLocalChange={setLocalPhone}
            onBlur={() => {}}
            error={errors.phone}
          />
        </Field>

        <Field id="enquiry-email" label="Email" optional error={errors.email}>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={fieldDescribedBy("enquiry-email", Boolean(errors.email), false)}
            className={`w-full ${inputClasses(Boolean(errors.email))}`}
          />
        </Field>

        <Field id="enquiry-interest" label="I'm interested in">
          <select
            id="enquiry-interest"
            name="interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value as (typeof INTERESTS)[number])}
            className={`w-full ${inputClasses(false)}`}
          >
            {INTERESTS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        {interest === "Site visit" && (
          <Field
            id="enquiry-date"
            label="Preferred date"
            error={errors.preferredDate}
          >
            <input
              id="enquiry-date"
              name="preferredDate"
              type="date"
              min={new Date().toISOString().slice(0, 10)}
              aria-invalid={Boolean(errors.preferredDate)}
              aria-describedby={fieldDescribedBy(
                "enquiry-date",
                Boolean(errors.preferredDate),
                false,
              )}
              className={`w-full ${inputClasses(Boolean(errors.preferredDate))}`}
            />
          </Field>
        )}

        <Field id="enquiry-message" label="Message" optional error={errors.message}>
          <textarea
            id="enquiry-message"
            name="message"
            rows={4}
            maxLength={500}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={fieldDescribedBy("enquiry-message", Boolean(errors.message), false)}
            className={`w-full ${inputClasses(Boolean(errors.message))}`}
          />
        </Field>

        {plot && (
          <p className="tnum text-caption text-ink-55">
            Asking about plot {plot}
            {pool ? `, pool ${pool}` : ""}.
          </p>
        )}

        {/* Honeypot: hidden from sighted and screen-reader users alike, and
            never revealed by any theme. A real visitor never fills this in. */}
        <div aria-hidden="true" className="sr-only" tabIndex={-1}>
          <label htmlFor="enquiry-company">Company</label>
          <input
            id="enquiry-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {TURNSTILE_SITE_KEY && <div ref={turnstileRef} />}

        <ConsentCheckbox checked={consent} onChange={setConsent} error={errors.consent} label={consentLabel} />

        {topLevelError && (
          <p role="alert" className="text-caption text-alert">
            {topLevelError}{" "}
            {telHref && (
              <a href={telHref} className="underline underline-offset-2">
                Call us
              </a>
            )}
            {telHref && whatsappHref && " or "}
            {whatsappHref && (
              <a href={whatsappHref} className="underline underline-offset-2" target="_blank" rel="noopener">
                message us on WhatsApp
              </a>
            )}
            .
          </p>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full sm:w-auto"
          disabled={pending || !consent}
          aria-busy={pending}
        >
          {pending ? (
            <>
              <Spinner /> Sending…
            </>
          ) : (
            "Send enquiry"
          )}
        </Button>
      </form>
    </>
  );
}

function Spinner() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function downloadIcs(ics: string) {
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "avana-site-visit.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function SuccessPanel({
  title,
  body,
  phoneDisplay,
  whatsappHref,
  ics,
}: {
  title: string;
  body: string;
  phoneDisplay: string | null;
  whatsappHref: string | null;
  ics: string | null;
}) {
  return (
    <div role="status" className="border border-[var(--rule)] bg-mist-hi p-8">
      <h3 className="subdisplay text-step-2">{title}</h3>
      <p className="measure mt-3 text-body">
        {phoneDisplay ? body.replace("+91 ••••• ••883", phoneDisplay) : body}
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        {whatsappHref && (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener"
            onClick={() => track("click_whatsapp", { location: "enquiry-success" })}
            className="inline-flex min-h-11 items-center justify-center rounded-m bg-amber px-5 py-2.5 font-sans text-caption font-medium text-amber-ink"
          >
            Message us on WhatsApp
          </a>
        )}
        {ics && (
          <button
            type="button"
            onClick={() => downloadIcs(ics)}
            className="inline-flex min-h-11 items-center justify-center rounded-m border border-[var(--rule)] px-5 py-2.5 font-sans text-caption text-ink"
          >
            Add the site visit to your calendar
          </button>
        )}
      </div>
    </div>
  );
}
