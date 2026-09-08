import type { PaymentStep } from "@/content/types";

/**
 * Booking to keys (spec 6.12). The one place numbered markers are used —
 * this content genuinely is a sequence.
 */
export function PaymentTimeline({ steps }: { steps: PaymentStep[] }) {
  return (
    <ol className="grid gap-10 lg:grid-cols-4 lg:gap-0">
      {steps.map((step, i) => (
        <li
          key={step.n}
          className={[
            "relative pl-8 lg:pl-0 lg:pt-10",
            "lg:before:absolute lg:before:left-0 lg:before:right-4 lg:before:top-0 lg:before:h-px lg:before:bg-[var(--rule)]",
            i === 0 ? "lg:before:left-0" : "",
          ].join(" ")}
        >
          {/* Amber marker on the connector. */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-1.5 h-2 w-2 -translate-x-[3px] rounded-full bg-amber lg:top-0 lg:-translate-y-1/2"
          />
          <p className="subdisplay text-step-3 text-[var(--stone)]">
            {String(step.n).padStart(2, "0")}
          </p>
          <p className="mt-2 font-sans text-body font-medium text-ink">
            {step.title}
          </p>
          <p className="mt-1 font-sans text-caption text-ink-55">
            {step.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
