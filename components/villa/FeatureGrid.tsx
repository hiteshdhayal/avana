import { Figure } from "@/components/media/Figure";
import type { Feature } from "@/content/types";
import { resolveMedia } from "@/lib/media";

/**
 * Inside — four features, asymmetric (spec 6.8). Feature 1 spans 7 columns
 * with a large image; 2 and 3 sit in a 5-column stack, text only, divided by a
 * hairline; 4 spans full width beneath with a wide image. No hover effects —
 * these are read, not clicked (except feature 4's link to #pools).
 */
export function FeatureGrid({ features }: { features: Feature[] }) {
  const [lead, ...rest] = features;
  const wide = rest.find((f) => f.span >= 12);
  const stacked = rest.filter((f) => f.span < 12);

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
      {lead && (
        <div className="lg:col-span-7">
          <Figure
            media={resolveMedia(lead.image)}
            alt={lead.title}
            ratio="3:2"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          <h3 className="subdisplay mt-6 text-step-2">{lead.title}</h3>
          <p className="measure mt-3 text-body">{lead.body}</p>
        </div>
      )}

      {stacked.length > 0 && (
        <div className="lg:col-span-4 lg:col-start-9">
          {stacked.map((feature, i) => (
            <div
              key={feature.title}
              className={i > 0 ? "mt-8 border-t border-[var(--rule)] pt-8" : ""}
            >
              <h3 className="subdisplay text-step-2">{feature.title}</h3>
              <p className="measure mt-3 text-body">{feature.body}</p>
            </div>
          ))}
        </div>
      )}

      {wide && (
        <a
          href={wide.href ?? undefined}
          className="lg:col-span-12"
          aria-label={wide.href ? `${wide.title} — see pool options` : undefined}
        >
          <Figure
            media={resolveMedia(wide.image)}
            alt={wide.title}
            ratio="21:9"
            sizes="100vw"
          />
          <h3 className="subdisplay mt-6 text-step-2">{wide.title}</h3>
          <p className="measure mt-3 text-body">{wide.body}</p>
        </a>
      )}
    </div>
  );
}
