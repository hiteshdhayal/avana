/**
 * Walks avana-content.json and reports every field still withheld from the
 * public page — a `[VERIFY]` placeholder, a null, or a sibling `*Verified`
 * flag that is false. This is the launch checklist: pass it to the client as
 * "here is exactly what's left to confirm."
 *
 * Usage: npm run audit:content
 */
import contentJson from "../content/avana-content.json" with { type: "json" };

type Flag = { path: string; reason: string };

const VERIFY_MARKER = "[VERIFY]";

function isPlaceholder(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") {
    const t = value.trim();
    return t === "" || t === VERIFY_MARKER || t.startsWith(VERIFY_MARKER);
  }
  return false;
}

function walk(node: unknown, path: string, flags: Flag[]) {
  if (Array.isArray(node)) {
    node.forEach((item, i) => walk(item, `${path}[${i}]`, flags));
    return;
  }
  if (node && typeof node === "object") {
    const obj = node as Record<string, unknown>;

    for (const [key, value] of Object.entries(obj)) {
      if (key.startsWith("_")) continue; // editorial notes, not content
      const fieldPath = path ? `${path}.${key}` : key;

      if (isPlaceholder(value)) {
        flags.push({ path: fieldPath, reason: "placeholder ([VERIFY] or empty)" });
        continue;
      }

      // A sibling `<field>Verified: false` marks a real-looking value that
      // is not yet confirmed for publication.
      const verifiedKey = `${key}Verified`;
      if (
        typeof obj[verifiedKey] === "boolean" &&
        obj[verifiedKey] === false
      ) {
        flags.push({ path: fieldPath, reason: "verified: false" });
      }

      if (key === "verified" && value === false) {
        flags.push({ path: path, reason: "verified: false" });
      }

      // Catches *Verified flags whose base field doesn't share its exact
      // name (e.g. `orientationVerified` gating `bodyOrientation`,
      // `mapPinVerified` gating `mapPinLabel`) — the sibling-name check above
      // only catches the common `<field>Verified` convention.
      if (key.endsWith("Verified") && key !== "Verified" && value === false) {
        flags.push({ path: fieldPath, reason: "flag is false" });
      }

      walk(value, fieldPath, flags);
    }
  }
}

const flags: Flag[] = [];
walk(contentJson, "", flags);

// De-duplicate (a value can be flagged once for being a placeholder and
// again via a sibling `verified: false` on the same object).
const seen = new Set<string>();
const unique = flags.filter((f) => {
  const key = `${f.path}::${f.reason}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

if (unique.length === 0) {
  console.log("No [VERIFY] markers or unverified fields found. Ready for P10.");
  process.exit(0);
}

console.log(`${unique.length} field(s) still withheld from the public page:\n`);
for (const flag of unique.sort((a, b) => a.path.localeCompare(b.path))) {
  console.log(`  ${flag.path}  —  ${flag.reason}`);
}
console.log(
  "\nThese are omitted from the rendered site by lib/verified.ts's " +
    "publicClaim() guard. Confirm each with the client and flip the " +
    "corresponding *Verified flag to true (or supply the real value) to " +
    "publish it.",
);
