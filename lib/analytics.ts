"use client";

/**
 * Analytics event dispatch (spec 10). A thin, no-op-safe wrapper: it pushes
 * to `dataLayer` when GA4 is loaded and calls `fbq` when the Meta pixel is
 * loaded, and does nothing when neither is present — which is the correct
 * behaviour before the visitor answers the consent banner (P9 wires the
 * scripts themselves behind that gate; this module only ever fires an event
 * into whatever is already loaded, it never loads a script).
 */

type EventName =
  | "view_hero"
  | "view_master_plan"
  | "select_plot"
  | "select_pool"
  | "view_plans"
  | "open_plan_a_calc"
  | "begin_enquiry"
  | "generate_lead"
  | "click_whatsapp"
  | "click_call";

declare global {
  interface Window {
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: EventName, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event, ...params });
  window.fbq?.("trackCustom", event, params);
}
