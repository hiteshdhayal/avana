import { z } from "zod";
import { E164 } from "./phone";

/**
 * The enquiry form's contract (spec 6.14), shared between the client
 * component (inline validation on blur) and the server action (the only copy
 * that is actually trusted).
 */

export const INTERESTS = [
  "Site visit",
  "Buy a villa",
  "Investment plan",
  "Channel partner",
] as const;

export const POOL_IDS = ["A", "B", "C"] as const;

export const enquirySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Enter your name.")
      .max(60, "Keep it under 60 characters."),
    phone: z
      .string()
      .trim()
      .regex(E164, "Enter a valid phone number."),
    email: z
      .string()
      .trim()
      .email("Enter a valid email address.")
      .optional()
      .or(z.literal("")),
    interest: z.enum(INTERESTS, {
      message: "Choose what you're enquiring about.",
    }),
    plot: z.string().trim().max(10).optional().or(z.literal("")),
    poolPreference: z.enum(POOL_IDS).optional().or(z.literal("")),
    preferredDate: z.string().trim().optional().or(z.literal("")),
    message: z
      .string()
      .trim()
      .max(500, "Keep it under 500 characters.")
      .optional()
      .or(z.literal("")),
    consent: z.literal(true, {
      error: "Please agree before you submit.",
    }),
    // Anti-spam (spec 6.14): a honeypot field that must stay empty, and the
    // client-recorded render time, checked server-side against a 3s minimum
    // fill time.
    company: z.string().max(0, "").optional().or(z.literal("")),
    renderedAt: z.coerce.number(),
    turnstileToken: z.string().optional().or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (data.interest === "Site visit" && !data.preferredDate) {
      ctx.addIssue({
        code: "custom",
        path: ["preferredDate"],
        message: "Pick a date for the visit.",
      });
    }
  });

export type EnquiryInput = z.infer<typeof enquirySchema>;
