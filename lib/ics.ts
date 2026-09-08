/**
 * A minimal .ics for "Add the site visit to your calendar" (spec 6.14).
 *
 * The form only collects a date, not a time (spec 6.14's field list has no
 * time input), so this is an all-day event — the sales team confirms the slot
 * by phone, which the description says explicitly rather than implying a
 * fixed hour the visitor never agreed to.
 */

function escapeText(value: string): string {
  return value.replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");
}

function dateStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

/** `date` is a plain `YYYY-MM-DD` from the form's date input. */
export function buildSiteVisitIcs(params: {
  date: string;
  address: string;
  uid: string;
}): string {
  const { date, address, uid } = params;
  const compact = date.replace(/-/g, "");
  const next = new Date(`${date}T00:00:00Z`);
  next.setUTCDate(next.getUTCDate() + 1);
  const compactNext = next.toISOString().slice(0, 10).replace(/-/g, "");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Avana Enclave 18//Site Visit//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dateStamp(new Date())}`,
    `DTSTART;VALUE=DATE:${compact}`,
    `DTEND;VALUE=DATE:${compactNext}`,
    "SUMMARY:Site visit — Avana Enclave 18",
    `DESCRIPTION:${escapeText(
      "The sales team will call to confirm the exact time. " +
        "Bring a photo ID.",
    )}`,
    `LOCATION:${escapeText(address)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  // .ics requires CRLF line endings.
  return lines.join("\r\n");
}
