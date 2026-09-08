# Avana Enclave 18

Marketing and lead-capture site for Avana Enclave 18 — eighteen villas on a
two-acre slope in Karjat valley — built against
`AVANA-ENCLAVE-18-BUILD-SPEC.md`.

Next.js 16 (App Router, React 19, Server Components) · TypeScript · Tailwind
v4 · Zod · Playwright.

Content lives in `content/avana-content.json`. Nothing marked `[VERIFY]` there
is ever rendered as fact — see "Content and compliance gates" below. The build
currently covers spec phases **P0–P8**; P9 (hardening) and P10 (content swap)
are outstanding — see "What's not done".

## Requirements

Node **≥ 20.9** (see `engines`). Built and tested on Node 22.

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
npm run build   # required: the suite drives a production server
npm test        # or: npx playwright test
```

Playwright starts a real production server (`npm run start`, reusing one
already listening on :3000) and covers the MahaRERA compliance assertions
(`tests/compliance.spec.ts`), the master-plan keyboard-navigation path
(`tests/masterplan.spec.ts`), the regulatory content gates
(`tests/gates.spec.ts`), and a full enquiry-form run against the real server
action (`tests/enquiry.spec.ts` — see "Environment variables" for what that run
actually persists to).

Point the suite elsewhere with `BASE_URL`. `CHROMIUM_PATH` overrides the
browser binary. `node scripts/shot.mjs <path> <out.png> [w] [h] [--full]`
screenshots a running server, with `--reduced-motion` to check the static
composition.

There is no lint script and no ESLint config in the repo; `tsc` via
`npm run build` is the only static check.

## Routes

| Route | Notes |
|---|---|
| `/` | The single marketing page — hero, measure band, location, master plan, villa, pools, features, amenities, evening, plans, payment, developer, enquiry |
| `/privacy` | Privacy notice (`content/privacy.ts`); linked from the footer and the form's consent line |
| `/specimen` | Design-system specimen — palette, type scale, primitives. Unlinked and `noindex`; exists so token drift is visible in one place |

## Architecture

```
app/            Routes, root layout, and the enquiry server action
components/     Presentation, grouped by role (layout, hero, plan, villa,
                commerce, form, data, media, sections, ui)
content/        avana-content.json (the copy) → types.ts → avana.ts (typed,
                gated accessors). Components never hold string literals.
lib/            Cross-cutting rules: compliance gates, the verification
                guard, contact-route validation, media resolution, fonts,
                lead persistence, rate limiting, Turnstile, ics, formatting
hooks/          useActiveSection (scroll-spy for the header)
styles/         tokens.css — the palette, type scale and spacing scale
tests/          Playwright specs (compliance, gates, master plan, enquiry)
scripts/        Font subsetting, content audit, screenshot helper
```

Two conventions carry most of the weight:

- **Copy is data, not literals.** Everything routes through
  `content/avana.ts`, so the compliance gates apply once at the content layer
  instead of being re-implemented per component.
- **Rules live in `lib/`, not in components.** `canPublishPricing`,
  `publicClaim()`, `phoneIsUsable` and `resolveMedia()` are each defined once;
  a component asks, it does not decide. `lib/site.ts` derives the shared page
  chrome so the header, footer and enquiry section cannot disagree about the
  registration number or the contact routes.

## Content and compliance gates

All copy is typed data (`content/avana-content.json` → `content/types.ts` →
`content/avana.ts`). Two gates run once, at the content layer
(`lib/compliance.ts`), rather than being re-implemented per component:

- **MahaRERA registration** (spec 3.3). Until `rera.verified: true` and a real
  `rera.registrationNumber` are set, the site cannot advertise a price or a
  plan table — `PlansSection` and `PaymentSection` return `null`, so those
  sections are absent from the document entirely, not hidden with CSS. Filling
  in the number is what unlocks pricing. **Currently gated:** the seed has
  `verified: false`.
- **Plan A / assured returns** (spec 3.4). Off by default
  (`NEXT_PUBLIC_SHOW_PLAN_A=false`), and additionally impossible while pricing
  is gated. Do not set it to `true` without written sign-off from the
  developer's counsel on both the structure and the wording.

Any other field marked `verified: false` or `"[VERIFY]"` is withheld from
public-claim positions by `lib/verified.ts`'s `publicClaim()` guard, and logged
once in development so the gap stays visible while building.

`npm run audit:content` lists every field still withheld. **98 fields are
withheld today.**

## Environment variables

See `.env.example`. Every integration below degrades gracefully when its
variables are unset — the site still runs and the enquiry form still "succeeds"
from the visitor's point of view — but each absence is logged loudly
server-side, and **none of it is a substitute for setting the real values
before launch**:

| Variable | What it's for | If unset |
|---|---|---|
| `NEXT_PUBLIC_SHOW_PLAN_A` | Reveals the Plan A / assured-return table (spec 3.4) | Plan A is absent. Leave it `false` without counsel sign-off |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | Cloudflare bot check on the enquiry form | Widget doesn't load; server skips verification (honeypot + 3s fill-time guard still apply) |
| `RESEND_API_KEY` / `RESEND_FROM_EMAIL` / `SALES_NOTIFICATION_EMAIL` | Sales notification email per submission | Email is skipped |
| `GOOGLE_SHEETS_ID` / `GOOGLE_SERVICE_ACCOUNT_EMAIL` / `GOOGLE_SERVICE_ACCOUNT_KEY` | Row written to the sales team's sheet | Sheet write is skipped |
| `GOOGLE_SHEETS_RANGE` | Target range for that row | Defaults to `Leads!A:L` |
| `MAPS_STATIC_KEY` | Static map image | Location sections fall back to the address + a Google Maps search link |

### Where a lead goes when nothing is configured

The email and the sheet fail independently; one succeeding does not depend on
the other. If **neither** is configured, `lib/leads.ts` falls back, in order:

1. Appends the submission to `data/leads.local.jsonl` — a development
   convenience only. Gitignored, and ephemeral on Vercel.
2. If that write fails — which it will on any serverless platform, where the
   filesystem is read-only outside `/tmp` — the full lead is logged to the
   function logs instead, and the visitor still sees success.

So a deployed site with no sinks configured **does not lose leads outright,
but the only copy is in the platform's log retention**. Configure Resend or
the sheet before taking real traffic.

## Fonts

`npm run fonts:build` regenerates the self-hosted Fraunces subsets in
`public/fonts/` from Google's OFL source (see `scripts/build-fonts.sh` for why
they're subset rather than pulled from `next/font/google` directly — the stock
build costs 494 KB against a 110 KB budget). Re-run it if the content file
starts using characters outside the current Latin + rupee-sign subset.

The data/UI family is Switzer (Fontshare), named in spec 4.3. Switzer isn't
redistributable through a package registry, so it isn't vendored in this repo.
Drop the licensed `Switzer-Variable.woff2` (and optionally
`Switzer-Variable-Italic.woff2`) into `public/fonts/` and the site picks it up
automatically — `lib/fonts.ts` only emits the `@font-face` rule when the file
is actually present, so there's no 404 in the meantime. Until then, a
neo-grotesque (Geist) stands in for the same role.

## Known limitations

- **Rate limiting is per-instance.** `lib/rate-limit.ts` is an in-memory
  counter (5 submissions/IP/hour). Across multiple warm serverless instances
  the limit is enforced per instance, not globally. Acceptable at launch
  scale; swap the module for Upstash Redis or Vercel KV if volume justifies it
  — `checkRateLimit`'s call site doesn't change.
- **Turnstile fails closed on a network error**, but fails *open* when the
  secret is simply unset. Set the keys.
- **The footer year is pinned** to 2026 in `lib/site.ts`.

## What's not done

This is a complete build against the spec for phases P0–P8, with the content
the client supplied. It is not launch-ready.

### P9 — hardening (not started)

None of the following exists yet:

- **JSON-LD, `sitemap.ts`, `robots.ts`, OG image.** `app/layout.tsx` sets
  title, description, `metadataBase` and theme colour; there is no structured
  data, no sitemap, no social card. (`lib/schema.ts` is the enquiry form's Zod
  contract, not JSON-LD.)
- **Analytics and the consent gate.** `lib/analytics.ts` is written and safe —
  it pushes to `dataLayer`/`fbq` when they exist and no-ops otherwise — but
  nothing loads GA4 or the Meta pixel, and there is no consent banner. So no
  event currently reaches anywhere. Only 3 of its 10 declared events
  (`begin_enquiry`, `generate_lead`, `click_whatsapp`) have call sites at all;
  the hero, master-plan, plot/pool selection and plans events are unwired.
- **The axe pass.** `@axe-core/playwright` is installed but no spec uses it.
- **The performance budget run** (spec 11) has not been measured.

### P10 — content swap (blocked on the client)

- **MahaRERA registration number** — `[VERIFY]` in the seed. Until it's set,
  pricing and the plan tables stay off per the compliance gate above.
- **The MahaRERA QR** — `public/media/` does not exist, so
  `/media/maharera-qr.png` resolves to unavailable. The registration block
  needs a real QR at true 1:1 before it can satisfy Order 46C/2025.
- **Real imagery** — every image path in the content file points at a render
  that hasn't been supplied yet (spec 3.2); `<Figure>` shows a labelled
  "render pending" placeholder that holds the correct aspect ratio instead, so
  there's no layout shift when the real files land.
- **Phone number** — `contact.phoneVerified: false` (the deck prints
  `+9191-7715039883`, one digit group too many). The seeded fallback
  `+917715039883` *does* pass `lib/contact.ts`'s structural check, so the
  `tel:` and WhatsApp links are **currently live to an unconfirmed number**.
  Confirm it before launch. If a number that fails the check is substituted,
  every call/WhatsApp affordance disables itself and the enquiry form becomes
  the only route, rather than shipping a link that fails when tapped.
- **Sales email** — `contact.emailVerified: false`; `info@batralifespace.com`
  is well-formed and therefore in use.
- **RESEND / Google Sheets / Turnstile / Maps credentials** — not invented;
  see above.
- **Bedroom count, room distribution, orientation, most drive times, facing
  and pool per plot, developer trust facts, three assured-return payout rows**
  — all `[VERIFY]` in the seed and correspondingly absent from the rendered
  page.

Run `npm run audit:content` for the authoritative list; it exits clean only
when zero `[VERIFY]` markers remain.
