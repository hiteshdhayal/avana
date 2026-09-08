import "server-only";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import type { EnquiryInput } from "./schema";

/**
 * Lead persistence (spec 10): a sales notification email via Resend, and a
 * row in the sheet the sales team already works from.
 *
 * Both are optional at the environment level, and both fail independently —
 * one succeeding does not depend on the other. If *neither* is configured,
 * the submission is appended to a local JSONL file instead of being silently
 * dropped, and every call logs which sinks it actually reached. That local
 * file is a development convenience, not a production lead store: it lives on
 * ephemeral disk on Vercel and is gitignored. Configure RESEND_API_KEY and
 * the GOOGLE_SHEETS_* variables before launch — see README "Environment
 * variables". `npm run audit:content` also flags their absence.
 */

export type LeadRecord = EnquiryInput & { submittedAt: string; ip: string };

export type PersistResult = {
  email: "sent" | "not-configured" | "failed";
  sheet: "written" | "not-configured" | "failed";
  localFallback: boolean;
};

function subjectFor(lead: LeadRecord): string {
  // Spec 10: the qualifying facts belong in the subject — the sales team
  // reads it on a phone.
  const plotSuffix = lead.plot ? ` — Plot ${lead.plot}` : "";
  return `Avana enquiry — ${lead.name} — ${lead.interest}${plotSuffix}`;
}

function summaryLines(lead: LeadRecord): string[] {
  return [
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    lead.email ? `Email: ${lead.email}` : null,
    `Interest: ${lead.interest}`,
    lead.plot ? `Plot: ${lead.plot}` : null,
    lead.poolPreference ? `Pool preference: ${lead.poolPreference}` : null,
    lead.preferredDate ? `Preferred visit date: ${lead.preferredDate}` : null,
    lead.message ? `Message: ${lead.message}` : null,
    `Submitted: ${lead.submittedAt}`,
    `IP: ${lead.ip}`,
  ].filter((line): line is string => line !== null);
}

async function sendNotificationEmail(
  lead: LeadRecord,
): Promise<PersistResult["email"]> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.SALES_NOTIFICATION_EMAIL;
  if (!apiKey || !to) {
    console.warn(
      "[avana:leads] RESEND_API_KEY or SALES_NOTIFICATION_EMAIL not set — " +
        "skipping the sales notification email.",
    );
    return "not-configured";
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "Avana Enclave 18 <onboarding@resend.dev>",
      to,
      subject: subjectFor(lead),
      text: summaryLines(lead).join("\n"),
      replyTo: lead.email || undefined,
    });
    if (error) {
      console.error("[avana:leads] Resend rejected the email", error);
      return "failed";
    }
    return "sent";
  } catch (error) {
    console.error("[avana:leads] failed to send notification email", error);
    return "failed";
  }
}

async function writeToSheet(lead: LeadRecord): Promise<PersistResult["sheet"]> {
  const sheetId = process.env.GOOGLE_SHEETS_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY?.replace(/\\n/g, "\n");
  const range = process.env.GOOGLE_SHEETS_RANGE ?? "Leads!A:L";

  if (!sheetId || !clientEmail || !privateKey) {
    console.warn(
      "[avana:leads] GOOGLE_SHEETS_ID / GOOGLE_SERVICE_ACCOUNT_EMAIL / " +
        "GOOGLE_SERVICE_ACCOUNT_KEY not set — skipping the sheet write.",
    );
    return "not-configured";
  }

  try {
    const { sheets: sheetsClient } = await import("@googleapis/sheets");
    const { JWT } = await import("google-auth-library");
    const auth = new JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = sheetsClient({ version: "v4", auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            lead.submittedAt,
            lead.name,
            lead.phone,
            lead.email ?? "",
            lead.interest,
            lead.plot ?? "",
            lead.poolPreference ?? "",
            lead.preferredDate ?? "",
            lead.message ?? "",
            lead.ip,
          ],
        ],
      },
    });
    return "written";
  } catch (error) {
    console.error("[avana:leads] failed to write to the sheet", error);
    return "failed";
  }
}

async function appendLocalFallback(lead: LeadRecord): Promise<void> {
  const dir = path.join(process.cwd(), "data");
  const file = path.join(dir, "leads.local.jsonl");
  await mkdir(dir, { recursive: true });
  await appendFile(file, `${JSON.stringify(lead)}\n`, "utf8");
  console.warn(
    `[avana:leads] no email or sheet sink configured — wrote to ${file}. ` +
      "This is a development fallback only; configure real sinks before launch.",
  );
}

export async function persistLead(lead: LeadRecord): Promise<PersistResult> {
  const [email, sheet] = await Promise.all([
    sendNotificationEmail(lead),
    writeToSheet(lead),
  ]);

  let localFallback = false;
  if (email !== "sent" && sheet !== "written") {
    localFallback = true;
    await appendLocalFallback(lead);
  }

  return { email, sheet, localFallback };
}
