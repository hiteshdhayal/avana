"use client";

import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from "@/lib/phone";
import { fieldDescribedBy, inputClasses } from "./Field";

type Props = {
  countryCode: string;
  local: string;
  onCountryChange: (code: string) => void;
  onLocalChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
};

/** `+91` default with a country selector, per spec 6.14. */
export function PhoneField({
  countryCode,
  local,
  onCountryChange,
  onLocalChange,
  onBlur,
  error,
}: Props) {
  const hasError = Boolean(error);
  return (
    <div className="flex gap-2">
      <select
        aria-label="Country code"
        value={countryCode}
        onChange={(e) => onCountryChange(e.target.value)}
        className={`${inputClasses(hasError)} w-28 shrink-0`}
      >
        {COUNTRY_CODES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.code} {c.label}
          </option>
        ))}
      </select>
      {/* min-w-0 on the wrapper, not the input: Tailwind utility precedence
          is determined by class order in the compiled stylesheet, not by
          order in the className string, so `w-full` from inputClasses()
          cannot be reliably overridden by appending `flex-1` after it. The
          wrapper constrains the width instead; the input's own `w-full`
          then simply fills it, no override needed. */}
      <div className="min-w-0 flex-1">
        <input
          id="enquiry-phone"
          name="phoneLocal"
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          required
          aria-invalid={hasError}
          aria-describedby={fieldDescribedBy("enquiry-phone", hasError, false)}
          value={local}
          onChange={(e) => onLocalChange(e.target.value)}
          onBlur={onBlur}
          className={`w-full ${inputClasses(hasError)}`}
          placeholder="77150 39883"
        />
      </div>
    </div>
  );
}

export { DEFAULT_COUNTRY_CODE };
