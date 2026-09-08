import rawJson from "./avana-content.json";
import type { Content, Faq, Plan } from "./types";
import { containsMoney, isPlaceholder } from "@/lib/verified";
import { canPublishPlanA, canPublishPricing } from "@/lib/compliance";

/**
 * The typed, *gated* content export. Everything the page renders comes from
 * here — never from `avana-content.json` directly — so the two regulatory
 * gates (spec 3.3, 3.4) are applied once, at the source, and cannot be
 * forgotten in a component. Anything withheld is absent from the data, which
 * means absent from the DOM, the JSON-LD and the OG image too.
 */

const source = rawJson as unknown as Content;

/** Plan A is removed from the array entirely, not hidden with CSS. */
function gatePlans(content: Content): Content["plans"] {
  const items = content.plans.items.filter((plan: Plan) => {
    if (plan.id === "A") return canPublishPlanA;
    return plan.enabled !== false;
  });

  return { ...content.plans, items };
}

/**
 * Pre-registration variant (spec 3.3): no price, no plan tables, no payment
 * terms. Money-bearing rows are dropped from the data rather than blanked, so
 * a filtered list is short, not full of holes.
 */
function stripPricing(content: Content): Content {
  return {
    ...content,
    hero: {
      ...content.hero,
      fieldNotes: content.hero.fieldNotes.filter((n) => !containsMoney(n.value)),
    },
    measureBand: content.measureBand.filter((m) => !containsMoney(m.value)),
    villa: {
      ...content.villa,
      spec: content.villa.spec.filter(
        (row) => row.label !== "Price" && !containsMoney(row.value),
      ),
    },
    plans: { ...content.plans, items: [], advantages: [] },
    faq: content.faq.filter((f: Faq) => !containsMoney(f.a)),
  };
}

const gated: Content = (() => {
  const withPlans: Content = { ...source, plans: gatePlans(source) };
  return canPublishPricing ? withPlans : stripPricing(withPlans);
})();

export const content: Content = gated;

/** The unfiltered file. Scripts, tests and the content audit only. */
export const sourceContent: Content = source;

/* ---- Derived, gated views used in more than one place -------------------- */

export const project = content.project;
export const contact = content.contact;

/** Bedrooms are `[VERIFY]` (spec 3.1 conflict 3) — held out of the hero. */
export const bedroomsClaimable =
  content.project.bedroomsVerified === true &&
  !isPlaceholder(content.project.bedrooms);

/** Connectivity: render only rows the client has confirmed (spec 6.4). */
export const verifiedConnectivity = content.location.connectivity.filter(
  (row) => row.verified === true && row.minutes !== null,
);

/** Availability counts derive from the data, never hardcoded (spec 6.5) —
 *  and are only shown when someone actually maintains them. */
export const availabilityIsMaintained =
  content.masterPlan.availability.verified === true &&
  content.masterPlan.availability.source !== "placeholder";

/** The disclosure block with the registration number substituted, or the
 *  registration sentence removed while no number exists. */
export function disclosureText(regNumber: string | null): string {
  const text = content.disclosure;
  if (regNumber) return text.replace("{REG_NO}", regNumber);
  return text
    .replace(
      /\s*Project registered with MahaRERA under registration number \{REG_NO\}; details at [^.]+\./,
      "",
    )
    .trim();
}
