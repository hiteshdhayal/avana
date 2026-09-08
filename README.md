# Avana Enclave 18

Marketing and lead-capture site for Avana Enclave 18, built against
`AVANA-ENCLAVE-18-BUILD-SPEC.md`. Content lives in
`content/avana-content.json`; nothing marked `[VERIFY]` there is ever
rendered as fact — see "Content and compliance gates" below.

## Develop

```bash
npm install
npm run dev
```

## Build and run

```bash
npm run build
npm run start
```

## Test

```bash
npx playwright test
```

Playwright drives a real production server (`npm run start`) and includes
the MahaRERA compliance assertions, the master-plan keyboard-navigation
path, the regulatory content gates, and a full enquiry-form run against the
real server action (see "Environment variables" for what that run actually
persists to).

## Fonts

`npm run fonts:build` regenerates the self-hosted Fraunces subsets in
`public/fonts/` from Google's OFL source (see `scripts/build-fonts.sh` for
why they're subset rather than pulled from `next/font/google` directly).
Re-run it if the content file starts using characters outside the current
Latin + rupee-sign subset.

The data/UI family is Switzer (Fontshare), named in spec 4.3. Switzer isn't
redistributable through a package registry, so it isn't vendored in this
repo. Drop the licensed `Switzer-Variable.woff2` (and optionally
`Switzer-Variable-Italic.woff2`) into `public/fonts/` and the site picks it
up automatically — see `lib/fonts.ts`. Until then, a neo-grotesque
(Geist) stands in for the same role.

## Content and compliance gates

All copy is typed data (`content/avana-content.json` → `content/types.ts` →
`content/avana.ts`), not string literals in components. Two gates run once,
at the content layer (`lib/compliance.ts`), rather than being re-implemented
per component:

- **MahaRERA registration** (spec 3.3). Until `rera.verified: true` and a
  real `rera.registrationNumber` are set, the site cannot advertise a price
  or a plan table — those sections are absent from the page entirely, not
  hidden with CSS. Filling in the number is what unlocks pricing.
- **Plan A / assured returns** (spec 3.4). Off by default
  (`NEXT_PUBLIC_SHOW_PLAN_A=false`). Do not set it to `true` without written
  sign-off from the developer's counsel on both the structure and the
  wording.

Any other field marked `verified: false` or `"[VERIFY]"` is withheld from
public-claim positions by `lib/verified.ts`'s `publicClaim()` guard, and
logged once in development so the gap stays visible while building.

## Environment variables

See `.env.example`. Every integration below degrades gracefully when its
variables are unset — the site still runs and the enquiry form still
"succeeds" from the visitor's point of view — but each absence is logged
loudly server-side, and **none of it is a substitute for setting the real
values before launch**:

| Variable | What it's for | If unset |
|---|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Cloudflare bot check on the enquiry form | Widget doesn't load; server skips verification (honeypot + 3s fill-time guard still apply) |
| `RESEND_API_KEY` / `RESEND_FROM_EMAIL` / `SALES_NOTIFICATION_EMAIL` | Sales notification email per submission | Email is skipped |
| `GOOGLE_SHEETS_ID` / `GOOGLE_SERVICE_ACCOUNT_EMAIL` / `GOOGLE_SERVICE_ACCOUNT_KEY` | Row written to the sales team's sheet | Sheet write is skipped |
| `MAPS_STATIC_KEY` | Static map image | Location sections fall back to the address + a Google Maps search link |

If **neither** the email nor the sheet is configured, a submission is
appended to `data/leads.local.jsonl` instead of being silently dropped —
that file is a development convenience only (ephemeral on Vercel,
gitignored), not a production lead store.

## What's not done

This is a complete build against the spec with the content the client
supplied. It is not launch-ready:

- **MahaRERA registration number** — `[VERIFY]` in the seed. Until it's
  set, pricing and the plan tables stay off per the compliance gate above.
- **Real imagery** — every image path in the content file points at a
  render that hasn't been supplied yet (spec 3.2); `<Figure>` shows a
  labelled "render pending" placeholder that holds the correct aspect
  ratio instead.
- **Phone number** — `contact.phoneVerified: false` (the deck prints one
  digit group too many); `lib/contact.ts` validates it structurally and
  disables every `tel:`/WhatsApp link if it doesn't parse as a real number.
- **RESEND / Google Sheets / Turnstile credentials** — not invented; see
  above.
- **Bedroom count, room distribution, orientation, most drive times,
  facing per plot, developer trust facts** — all `[VERIFY]` in the seed and
  correspondingly absent from the rendered page.

`npm run audit:content` lists every field still withheld.
