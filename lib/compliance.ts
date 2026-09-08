import { isPlaceholder } from "./verified";
import raw from "@/content/avana-content.json";

/**
 * Regulatory gates. Spec sections 3.3 and 3.4.
 *
 * Two independent switches decide what this page is allowed to say. Both fail
 * closed. Neither is a styling concern and neither may be moved to satisfy a
 * layout.
 */

/* -------------------------------------------------------------------------
 * 1. MahaRERA registration (spec 3.3)
 *
 * MahaRERA Order 46C/2025 requires the registration number, the authority URL
 * and a scannable QR on every advertisement of a *registered* project. The
 * corollary matters more here: until the number is issued, the page cannot
 * advertise a specific unit or price at all. So the gate is derived from the
 * content file, not from an env var — filling in the number is what unlocks
 * pricing, and there is no way to ship prices without it.
 * ------------------------------------------------------------------------- */

export const reraRegistrationNumber: string | null =
  raw.rera.verified === true && !isPlaceholder(raw.rera.registrationNumber)
    ? raw.rera.registrationNumber
    : null;

export const isReraRegistered = reraRegistrationNumber !== null;

/**
 * The pre-registration variant. When false the page renders without prices,
 * without the plan tables and without the payment terms, and says so plainly.
 */
export const canPublishPricing = isReraRegistered;

/* -------------------------------------------------------------------------
 * 2. Plan A — assured returns (spec 3.4)
 *
 * Off unless someone deliberately turns it on, and it should not be turned on
 * without written sign-off from the developer's counsel. The flag is read once,
 * here, so `NEXT_PUBLIC_SHOW_PLAN_A` cannot be re-interpreted per component.
 * ------------------------------------------------------------------------- */

export const showPlanA = process.env.NEXT_PUBLIC_SHOW_PLAN_A === "true";

/**
 * Plan A additionally cannot appear while pricing is gated — an assured-return
 * table is a plan table.
 */
export const canPublishPlanA = showPlanA && canPublishPricing;
