"use client";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  label: string;
};

/**
 * DPDP Act 2023 consent (spec 6.14): unticked by default, no pre-checked box,
 * a link to the privacy notice.
 */
export function ConsentCheckbox({ checked, onChange, error, label }: Props) {
  return (
    <div>
      <label className="flex items-start gap-3">
        <input
          id="enquiry-consent"
          name="consent"
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "enquiry-consent-error" : undefined}
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--amber)]"
        />
        <span className="font-sans text-caption text-ink-80">
          {label}{" "}
          <a
            href="/privacy"
            target="_blank"
            rel="noopener"
            className="underline underline-offset-2 hover:text-ink"
          >
            Read the privacy notice.
          </a>
        </span>
      </label>
      {error && (
        <p id="enquiry-consent-error" role="alert" className="mt-1.5 text-caption text-alert">
          {error}
        </p>
      )}
    </div>
  );
}
