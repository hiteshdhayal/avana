"use client";

import type { ReactNode } from "react";

type Props = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
};

/**
 * Field shell (spec 6.14): errors sit beneath the field in `--alert`, with
 * `aria-describedby` wired so screen readers hear them.
 */
export function Field({ id, label, error, hint, optional, children }: Props) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div>
      <label htmlFor={id} className="font-sans text-caption text-ink-80">
        {label}
        {optional && <span className="text-ink-55"> (optional)</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-caption text-ink-55">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 flex items-center gap-1.5 text-caption text-alert"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            className="h-3.5 w-3.5 shrink-0"
            fill="currentColor"
          >
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm.75 3.5v4.25h-1.5V4.5h1.5ZM8 11.75a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8Z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

export const fieldDescribedBy = (id: string, hasError: boolean, hasHint: boolean) =>
  hasError ? `${id}-error` : hasHint ? `${id}-hint` : undefined;

/**
 * Deliberately carries no width utility. Tailwind resolves conflicting width
 * classes by their position in the *compiled* stylesheet, not by their order
 * in a className string — so a `w-full` baked in here could not be reliably
 * overridden by a width class appended at the call site (this cost real time
 * to track down: the country-code select in PhoneField was rendering full
 * width because of exactly this). Every call site sets its own width.
 */
export const inputClasses = (hasError: boolean) =>
  [
    "rounded-s border bg-mist-hi px-3.5 py-2.5 font-sans text-body text-ink",
    "transition-colors duration-[var(--dur-fast)] placeholder:text-ink-55",
    hasError
      ? "border-alert"
      : "border-[var(--rule)] focus:border-[var(--ink-55)]",
  ].join(" ");
