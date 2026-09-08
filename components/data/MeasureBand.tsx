import type { Measure } from "@/content/types";

/**
 * Eight facts, no headline, no prose (spec 6.3). Explicitly no count-up
 * animation — the motion budget spends nothing here.
 */
export function MeasureBand({ items }: { items: Measure[] }) {
  return (
    <section aria-label="Key facts" className="border-y border-[var(--rule)] bg-mist">
      <div className="container-page">
        <ul
          className="
            flex snap-x snap-mandatory gap-px overflow-x-auto
            sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4
          "
        >
          {items.map((item) => (
            <li
              key={`${item.value}-${item.label}`}
              className="
                min-w-[42vw] shrink-0 snap-start border-r border-[var(--rule)] py-12 pr-6
                last:border-r-0 sm:min-w-0
                sm:[&:nth-child(2n)]:border-r-0
                lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0
              "
            >
              <p className="tnum font-sans text-step-2 font-medium text-ink">
                {item.value}
              </p>
              <p className="mt-1 font-sans text-caption text-ink-55">
                {item.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
