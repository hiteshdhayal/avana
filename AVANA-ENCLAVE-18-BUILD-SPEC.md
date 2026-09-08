# Avana Enclave 18 — Landing Page Build Specification

**Version** 1.0 · **Prepared for** Batra & Sankhe Buildcon (Batra and Sons Infra Realty Developers LLP)
**Deliverable** One-page marketing + lead-capture site at `avanaenclave18.com`
**Status of this doc** Complete build brief. Hand the whole file to Claude Code and work through Section 14 phase by phase.

---

## 0. How to use this document

**Paste this as the kickoff prompt:**

> You are building a production marketing site for a luxury villa project in Karjat, Maharashtra. The complete specification is in `AVANA-ENCLAVE-18-BUILD-SPEC.md` and the content seed is in `avana-content.json`. Read both fully before writing code. Build in the phase order given in Section 14, and stop at the end of each phase for review. Follow the design tokens in Section 4 exactly — do not substitute your own palette, typefaces, or motion defaults. Where the spec marks something `[VERIFY]`, use the placeholder and add a `TODO` comment; do not invent facts, prices, or legal text.

**Rules for the builder:**

1. Every number, price and claim in Section 2 is either sourced from the client's decks or marked `[VERIFY]`. Nothing else gets stated as fact on the page.
2. Section 3 lists live contradictions in the source material. The site must not publish both sides of a contradiction. Where unresolved, use the value marked **USE**.
3. This is a regulated advertisement in Maharashtra (Section 3.3). The RERA block is not decoration and cannot be moved to satisfy a layout.
4. All supplied imagery is CGI. Every render carries an "artist's impression" attribution.
5. Build to the quality floor without announcing it: responsive to 360px, visible keyboard focus, `prefers-reduced-motion` honoured, AA contrast, no layout shift.

---

## 1. What this page is

**Subject.** 18 detached villas on a two-acre slope at Karjat Shindhol, in the Sahyadri foothills of Raigad district, roughly 95 minutes from the now-operational Navi Mumbai International Airport. Ground + first floor + terrace, private pool per villa, gated community with a clubhouse.

**Audience, in priority order:**

| # | Who | What they want | What converts them |
|---|-----|----------------|--------------------|
| 1 | Mumbai/Navi Mumbai HNI second-home buyer, 35–55 | A weekend house that isn't a flat in a tower | Photography, drive time, plot size, privacy, "only 18" |
| 2 | Investor, no intention of living there | Yield and exit | Plan A/B/C numbers, 15% upfront discount, 6–7% rental yield, possession in 9 months |
| 3 | NRI (Gulf/UK/US) | Trust and remote process | Developer credibility, RERA number, virtual tour, WhatsApp response |
| 4 | Channel partner / broker | Inventory and commission clarity | Plot availability, a partner enquiry route |

**The one job of the page:** get a qualified enquiry — a site-visit booking, a WhatsApp conversation, or a callback — from someone who understands they are buying a ₹1.6 Cr+ villa 95 minutes from the airport. Everything else is secondary.

**Success metrics:** ≥ 4% visitor→enquiry rate; ≥ 60% of enquiries reach the master-plan section; median time-on-page > 90s; LCP < 2.0s on 4G.

---

## 2. Verified fact sheet

Sources: **[CP]** = Batra & Sankhe company profile PDF · **[AE]** = Avana Enclave 18 PDF · **[IV]** = investment deck (screen-recorded video) · **[WEB]** = public record.

### 2.1 Project

| Field | Value | Source |
|---|---|---|
| Project name | Avana Enclave 18 | AE |
| Developer | Batra & Sankhe Buildcon, also Batra and Sons Infra Realty Developers LLP | CP |
| Developer tagline | we Build Dreams!! | CP |
| Units | 18 villas | AE, CP bullets |
| Land | 2 acres of sloping land (CP states 84 *ghunta*, which is ~2.09 acres — consistent) | AE, CP |
| Location | Karjat Shindhol, Karjat Valley, Raigad, Maharashtra 410201 | AE |
| Setting | Sahyadri range, valley and waterfall views | AE |
| Airport | 95 minutes from the new international airport (NMIA, Ulwe) | AE, WEB |
| Configuration | Ground + First Floor + Terrace | IV |
| Plot area | 3,500 sq ft | IV |
| Built-up area | 2,500 sq ft | IV |
| Carpet area | 1,950 sq ft | IV |
| Base villa price | ₹1.60 Crore onwards | IV |
| Possession | Within 9 months of booking | IV |
| Architecture | Sloping white-and-grey roofs, perimeter wall and gates | AE |
| Landscape | 2-acre slope garden; mango and Ashoka trees | AE |
| Roads | Paved / black bitumen internal roads | CP, IV |

### 2.2 Pool options (choose one per villa)

| Option | Name | Size |
|---|---|---|
| Pool A | Standard Family Pool | 12 ft × 12 ft |
| Pool B | Premium Lap Pool | 8 ft × 23 ft |
| Pool C | Luxury Pool with Jacuzzi | 10 ft × 20 ft |

### 2.3 Villa features (ownership programme)

- **Designer elevation** — premium architectural facade with bespoke designer finishes.
- **Master suite bathtub** — freestanding tub with designer CP fittings.
- **Landscaped garden** — manicured greenery, outdoor leisure deck, private gazebo seating.
- **Pool options** — A, B or C per the table above.

### 2.4 Community amenities

Clubhouse with lounge, indoor games and multipurpose hall **[AE]** · restaurant **[CP, IV]** · organic supermarket / on-site general store **[CP, IV]** · kids' play area **[CP]** · meditation zones and scenic sit-outs **[CP]** · water bodies and flower plantations **[CP]** · 24/7 security **[IV]** · dedicated parking per villa **[CP, IV]** · walking pathways **[AE]** · perimeter wall and gates **[AE]**.

> Community swimming pool: the investment deck refers to "a resort-style community pool"; the company profile puts the large pool inside the clubhouse. Treat as one facility — **USE:** "clubhouse pool".

### 2.5 Investment plans

**Plan A — Assured Return Investment**

| Field | Value |
|---|---|
| Ticket sizes | ₹10 L → ₹11.8 L (1 yr) · ₹25 L → ₹29.5 L (1 yr) · ₹30 L → ₹35.4 L (1 yr) |
| Tenure | 1 year (18%) or 2 years (36% total) |
| Rate | 18% p.a., fixed payouts |
| For | Investors wanting a fixed return without owning a villa |

**Plan B — Soft Launch Allotment**

1. Pre-launch pricing — base villa price ₹1.60 Cr.
2. 30% down at booking secures the allotment.
3. No further payment until structural completion.
4. Balance on a construction-linked plan; possession within 9 months of booking.

**Plan C — Luxury Villa Ownership Programme ("Own. Earn. Enjoy.")**

- 15% upfront discount on the villa price.
- Professionally managed rental programme targeting 6–7% annual yield.
- Owner retains personal use of the villa.

**Advantages recap (as written by the client):** 15% upfront discount · rental yield 6–7% p.a. · high capital appreciation · dual-use asset.

### 2.6 Contact

| Field | Value | Note |
|---|---|---|
| Phone | `+91 77150 39883` | `[VERIFY]` — deck prints `+9191-7715039883`, which has one digit group too many. Do not ship a broken `tel:` link. |
| Email | `info@batralifespace.com` | AE deck prints a URL in the email field; this address comes from CP. `[VERIFY]` |
| Project site | avanaenclave18.com | AE |
| Developer site | batralifespace.com | CP, AE |
| Address | Karjat Shindhol, Karjat Valley, Raigad, Maharashtra 410201 | AE |
| Map pin | The deck's QR resolves to a pin labelled "Crown Valley Residency" near Shindhol | `[VERIFY]` — confirm whether that is the site pin or a neighbouring project before linking it |

---

## 3. Conflicts and compliance — resolve before launch

### 3.1 Factual contradictions in the source material

| # | Conflict | Where | Decision |
|---|---|---|---|
| 1 | **Karjat vs Lonavala.** Brief says "Lonavala hills". Every document says Karjat Shindhol, Karjat Valley, Raigad. | Brief vs AE/IV | **USE: Karjat.** Both are Sahyadri, but they are ~40 km and one district apart, and the address, map pin and PIN code are all Karjat. Wrong location in schema and ad copy is a real problem. Confirm before build. |
| 2 | **18 vs 20 villas.** CP body text says "20 exclusive country-style bungalows"; its own bullets and the whole AE deck say 18. The name is *Enclave 18*. | CP p4 | **USE: 18.** Treat "20" as a stale draft. |
| 3 | **3BHK vs 4BHK.** AE stat strip says 4BHK; the investment deck says "spacious 3-bedroom villas". | AE vs IV | `[VERIFY]` — **USE: 4 BHK** (newer deck, matches 2,500 sq ft built-up) and hold the bedroom count out of the hero until confirmed. |
| 4 | **Architecture identity.** AE and IV show contemporary white villas with dark grey sloping roofs. CP shows a single-storey terracotta-tile Mediterranean villa and calls it "Casa-villa". | CP vs AE/IV | **USE: white-and-grey contemporary.** Do not put the terracotta villa on this site; it reads as a different project. |
| 5 | **Private pool per villa vs pool options.** CP: "each bungalow features its own private pool". IV: pool is a selectable configuration. | CP vs IV | **USE: every villa has a private pool; the owner chooses A, B or C.** |
| 6 | **Tree species.** CP: chaffa, mango, pine. AE: mango and Ashoka. | CP vs AE | **USE: mango and Ashoka** (AE is project-specific). |
| 7 | **Land unit.** 84 ghunta [CP] vs 2 acres [AE]. | — | Not a conflict — 84 ghunta ≈ 2.09 acres. State "2 acres"; the ghunta figure can appear in the spec table. |
| 8 | **Possession.** "Within 9 months" of booking [IV]; no date anywhere. | IV | Publish as "9 months from booking, subject to the agreement" — never a calendar date without RERA-declared completion date. |

### 3.2 Imagery status

Every image supplied — all five PNGs, both decks, and every frame of the video — is CGI or stock. There is no photograph of the actual site, no site survey drawing, and no approved elevation.

**Consequences for the build:**

- Every render carries a visible `Artist's impression` label. Not a footnote — a caption.
- The master plan (Section 6.5) ships as a **schematic** until the client provides the layout drawing. It must be labelled as indicative.
- Video frames are 848×480 and carry a `clideo.com` watermark. **Unusable.** Request the original deck files or the source renders at ≥ 2400px.
- Ask the client for: the survey/layout plan, the approved floor plans (the investment deck has a first-floor plan at unusable resolution), one drone photograph of the actual land, and the RERA-approved elevation.

### 3.3 Regulatory requirements — MahaRERA

MahaRERA Order 46C/2025 (8 April 2025), under s.11(2) of the RERA Act 2016 and Rule 14(2) of the Maharashtra RERA Rules 2017, requires that every advertisement or prospectus for a registered project — explicitly including websites, social media and WhatsApp — displays:

1. the **MahaRERA project registration number**,
2. the **MahaRERA website address**, and
3. a **scannable QR code** linking to the project's MahaRERA page,

placed in the **top-right quadrant**, at a font size **equal to or larger than the largest font used for the project's contact details**, in a colour with high visibility, and with the QR code at correct aspect ratio. Penalties run to ₹50,000 per non-compliant advertisement.

**Build requirements:**

- A `<RegBlock />` component pinned to the top-right of the viewport region on desktop (in the header, right-aligned) and repeated in the footer. It renders the registration number, `https://maharera.maharashtra.gov.in`, and the QR PNG at 1:1 aspect ratio, minimum 96×96 CSS px, on a light background with dark ink.
- Its type size is computed from the largest contact-detail type on the page. Add a comment in the component naming this constraint so nobody "tidies" it later.
- If the registration number is not yet issued, the page **cannot advertise a specific unit or price**. Ship a pre-registration variant that omits pricing and plan tables, and gate the full page behind the number. `[VERIFY]` with the client.
- Do not use light greys or place the QR near visual clutter — the order names both as violations.

### 3.4 The assured-return problem

Plan A advertises "18% p.a. guaranteed / assured returns" on a ₹10–30 lakh deposit with no property title. Publishing that on a public website is a materially different act from showing it in a private deck: assured-return arrangements in Indian real estate have attracted scrutiny as deposit-taking or collective investment schemes, and "guaranteed" return advertising carries consumer-protection and advertising-code exposure.

I'm not a lawyer and this is not legal advice. The build requirement is procedural:

- **Plan A does not go live without written sign-off** from the developer's counsel on both the structure and the wording. Build the component behind a feature flag `NEXT_PUBLIC_SHOW_PLAN_A`, default `false`.
- If it does go live: use the client's own contractual language, not marketing paraphrase; drop the words "guaranteed" and "assured" unless counsel confirms them; state the instrument, the security, and who is contractually liable; and attach the disclosure block from Section 12.4 directly under the table, not in the footer.
- Plans B and C are ordinary sale and rental-management propositions and don't carry the same issue, though the 6–7% yield still needs an "indicative, not guaranteed" qualifier.
- Never render a returns *calculator* for Plan A without the disclosure visible in the same viewport as the result.

---

## 4. Design system

### 4.1 The idea: contour

The single most characteristic fact about this project is not "luxury villas" — every villa project says that. It is that **eighteen houses are terraced down a two-acre slope in a valley**. The site is defined by its level changes. So the page is built as a descent: a single contour line drawn down the left edge of the page, drawn progressively as the visitor scrolls, with each section hanging off it like a station on a section drawing. The master plan is a topographic map you can actually use.

That gives one memorable, subject-specific device that also does real work — it tells you where you are, and it is the same visual language as the drawing an architect would hand you on site.

**Design plan (as agreed with the brief):**

- **Colour** — cool valley palette: ink, mist, stone, amber, terrace green, brass. One accent only.
- **Type** — one variable serif carrying display *and* small captions via its optical-size axis, plus one quiet grotesque for data.
- **Layout** — left-aligned, asymmetric 12-column, content in 1–7 with measured "field notes" in 9–12. Exactly one centred section: the master plan.
- **Principle** — the page reads like a survey document that happens to be beautiful. Restraint everywhere except the map.

**What I rejected, and why:** an ivory-and-terracotta editorial treatment with a Playfair headline (that is the default luxury-real-estate look and the default AI look at once); a dark hero with a bright accent and glassmorphic cards; a grid of identical rounded cards with soft shadows for amenities; and all-caps eyebrow labels above each section. The mist background is deliberately pushed cool and green-grey rather than warm cream, and section markers carry the section's name rather than `01 / 02 / 03`, because the sections are not a sequence. Numbers appear only where the content really is ordered — the payment stages and the possession timeline.

### 4.2 Colour tokens

```css
:root {
  --ink:      #0C1E26;  /* dusk in the valley. Large fields, display type on mist. */
  --ink-80:   #35474F;  /* body text on mist */
  --ink-55:   #6C7B81;  /* captions, disabled */
  --mist:     #EDEFE9;  /* page background. Cool green-grey, NOT cream. */
  --mist-hi:  #F6F7F3;  /* raised surfaces, form fields */
  --stone:    #BFC5BA;  /* contour lines, hairline rules, plot outlines */
  --terrace:  #35543F;  /* deep valley green. Map fills, second surface, secondary buttons. */
  --amber:    #E39B2E;  /* THE accent. Primary CTA, available plots, current state. Nothing else. */
  --amber-ink:#4A2F06;  /* text on amber */
  --brass:    #A9884F;  /* developer signature only: wordmark rule, credibility band */
  --alert:    #A3402F;  /* form errors */
}
```

Contrast: `--ink` on `--mist` = 13.9:1. `--ink-55` on `--mist` is captions-only at ≥ 14px (4.6:1). `--amber-ink` on `--amber` = 7.4:1. Never put `--amber` text on `--mist` below 18px.

Dark passages (hero, evening gallery, footer) invert: `--ink` background, `--mist` text, `--stone` at 40% for rules.

### 4.3 Typography

| Role | Family | Settings |
|---|---|---|
| Display | **Fraunces** (variable, Google Fonts) | `opsz` 144, `wght` 300, `SOFT` 0, `WONK` 1; tracking −0.025em; leading 0.95 |
| Sub-display / section heads | Fraunces | `opsz` 72, `wght` 400, tracking −0.015em, leading 1.05 |
| Captions and pull quotes | Fraunces | `opsz` 14, `wght` 400, italic for image captions |
| Body, UI, data | **Switzer** (Fontshare, self-hosted variable) | 400/500/600; `font-variant-numeric: tabular-nums` on every measurement, price and plot number |

Two families, clearly distinct, and Fraunces' optical-size axis means captions and headlines are the same voice at different scales rather than two unrelated fonts. Not Playfair; not Inter.

```css
--step--1: 0.8125rem;                        /* caption 13px / 1.45 */
--step-0:  1.0625rem;                        /* body 17px / 1.65 */
--step-1:  1.25rem;                          /* lead 20px / 1.55 */
--step-2:  clamp(1.5rem, 1.2vw + 1.2rem, 1.75rem);
--step-3:  clamp(2rem, 2.4vw + 1.3rem, 3.25rem);   /* section head */
--step-4:  clamp(2.75rem, 4.5vw + 1rem, 5rem);      /* sub-display */
--step-5:  clamp(3.25rem, 8.5vw, 8rem);            /* hero */
```

Body measure: 62–68 characters (`max-width: 34rem` at `--step-0`). Lead paragraphs 52ch.

**Typographic rules:** sentence case everywhere including buttons. No all-caps labels. No single accented word inside a headline. No `→` inside button text (the button is already a button). Numerals in the measure band and price tables are set in Switzer 500 with tabular figures so columns align.

### 4.4 Space, grid, shape

```css
--space: 4px;                     /* 4 8 12 16 24 32 48 64 96 128 160 */
--container: 1440px;
--gutter-desk: 72px;  --gutter-tab: 40px;  --gutter-mob: 20px;
--col: 12;  --col-gap: 24px;
--radius-none: 0;                 /* rules, plot shapes, the map */
--radius-s: 2px;                  /* inputs, chips */
--radius-m: 4px;                  /* buttons */
--radius-img: 3px;                /* images — nearly square, architectural */
```

Section rhythm: 128px vertical padding desktop, 96 tablet, 72 mobile. **One** padding rule, applied by a `<Section>` component — do not let per-section CSS override it (specificity collisions here are the usual cause of uneven rhythm).

Elevation: no soft grey drop shadows anywhere. Depth comes from a 1px `--stone` rule, a tonal step to `--mist-hi`, or overlap. The single exception is the master-plan detail drawer, which uses `box-shadow: -24px 0 48px rgba(12,30,38,0.10)` because it genuinely floats above the map.

### 4.5 The contour rail

A fixed 96px-wide column at the left of the viewport (desktop ≥ 1200px only), containing a vertical SVG polyline of gentle irregular bends — a section through the hillside, not a straight line.

- The path has `pathLength="1"`; `stroke-dashoffset` is bound to page scroll progress so the line draws as you descend.
- Each section registers a marker on the rail: a 5px tick plus the section name in Fraunces `opsz 14`, rotated 90°, in `--ink-55`. The active section's tick is `--amber` and its label goes to `--ink`.
- Clicking a marker scrolls to that section.
- Below 1200px the rail is not rendered. Do not substitute a dot-nav — mobile gets the sticky action bar instead (Section 6.16).
- `prefers-reduced-motion`: the path renders fully drawn on load; markers still highlight on section change, without transition.

### 4.6 Motion system

```css
--dur-fast: 180ms; --dur-base: 320ms; --dur-slow: 640ms; --dur-cinematic: 1200ms;
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);
--ease-inout: cubic-bezier(0.65, 0, 0.35, 1);
--ease-soft: cubic-bezier(0.33, 1, 0.68, 1);
```

Motion budget, deliberately small:

1. **One orchestrated page-load** (hero, Section 6.2). Nothing else animates on load.
2. **Two scroll-linked effects, both continuous**: the contour rail drawing, and a 0.12-factor parallax on the hero and evening-gallery backgrounds. Nothing else is scroll-triggered.
3. **Interaction motion** wherever the visitor changes something: plot hover/select, pool switch, plan tab change, accordion, form validation, drawer open. These are the ones that earn their keep because they show what changed.

**Explicitly forbidden:** fade-and-slide-up on every section as it enters the viewport, hover-lift on every card, counters that tick up when scrolled into view, marquee text, parallax on more than the two elements named above. These are the generic default and this project doesn't need them.

`@media (prefers-reduced-motion: reduce)`: all transitions to 1ms, parallax disabled, hero video replaced by its poster, contour pre-drawn, autoplaying gallery paused.

### 4.7 Art direction

- Renders are shown **large and uncropped**, one at a time, with a caption. No collages, no image grids with mismatched crops.
- Every render gets `Artist's impression` in Fraunces italic `opsz 14`, `--ink-55`, directly under the image, left-aligned to the image edge.
- Warm evening images (the aerial dusk render, the clubhouse at dusk) live in the two dark sections; daylight images live on mist. Do not mix a dusk render into a light section — the palette breaks.
- The terracotta single-storey villa from the company profile is **not used on this site** (Section 3.1, conflict 4).
- Aspect ratios: hero 21:9 desktop / 4:5 mobile; section images 3:2; gallery 4:5 portrait and 3:2 landscape alternating; floor plans native.

---

## 5. Page structure

| # | Section | Anchor | Background | Job |
|---|---|---|---|---|
| 1 | Header + RERA block | — | mist, transparent over hero | Compliance, phone, book-visit |
| 2 | Hero | `#top` | ink + render | Say what this is in one screen |
| 3 | Measure band | — | mist | Eight facts, no prose |
| 4 | The valley (location) | `#location` | mist | Where it is and how far |
| 5 | Master plan | `#plan` | ink | **The moment.** 18 plots, live availability |
| 6 | The villa | `#villa` | mist | Areas, configuration, floor plans |
| 7 | Pool options | `#pools` | mist-hi | Let them choose A/B/C |
| 8 | Inside | `#features` | mist | Four premium features |
| 9 | Amenities | `#amenities` | terrace green | The community |
| 10 | Evenings here | — | ink + dusk render | One emotional beat |
| 11 | Ownership plans | `#plans` | mist | Convert the investor |
| 12 | Payment & possession | `#payment` | mist-hi | Remove the money objection |
| 13 | The developer | `#developer` | mist | Trust |
| 14 | Enquire | `#enquire` | ink | Capture the lead |
| 15 | Footer + disclosures | — | ink | Legal, links, RERA repeat |
| 16 | Sticky action bar | — | ink | Mobile conversion, always present |

---

## 6. Section specifications

### 6.1 Header

```
┌──────────────────────────────────────────────────────────────────────────┐
│  AVANA ENCLAVE 18        Location  Plan  Villa  Plans  │  MahaRERA P5…   │
│  ── brass rule ──                                      │  [QR]  maharera │
│                                                        │  .maharashtra…  │
└──────────────────────────────────────────────────────────────────────────┘
```

- Wordmark left: "Avana Enclave 18" in Fraunces `opsz 72` `wght 400`, with a 1px `--brass` rule beneath it, 24px wide. Under 640px, wordmark only.
- Centre nav: Location · Master plan · The villa · Plans · Visit. Switzer 500, `--step--1`. Active section underlined 1px `--amber`.
- **Right: `<RegBlock variant="header" />`** — MahaRERA number, QR (96×96), maharera.maharashtra.gov.in. Per Section 3.3 this occupies the top-right quadrant and its type is ≥ the largest contact-detail type on the page. On mobile it collapses to the number + a tap target that opens the QR in a sheet — it does **not** disappear.
- Behaviour: transparent over the hero with `--mist` text; on scroll past 80vh it becomes `--mist` with a `--stone` bottom hairline and `--ink` text, transitioning over `--dur-base`. Sticky.
- Right of nav: one ghost button "Book a site visit" (scrolls to `#enquire`).

### 6.2 Hero — the one orchestrated moment

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│                          [ valley render, full bleed, ink overlay ]      │
│                                                                          │
│   Eighteen villas,                                                       │
│   one hillside in Karjat                          Plot   3,500 sq ft     │
│                                                   Built  2,500 sq ft     │
│   Private pools, 3,500 sq ft plots and the        Config G + 1 + terrace │
│   Sahyadris on three sides — ninety-five          From   ₹1.60 Cr        │
│   minutes from the new airport.                                          │
│                                                                          │
│   [ Book a site visit ]  [ See the master plan ]                         │
│                                                                          │
│   ─────────────────────────────────────────────────  Artist's impression │
└──────────────────────────────────────────────────────────────────────────┘
```

**Copy**
- H1: `Eighteen villas, one hillside in Karjat`
- Lead: `Private pools, 3,500 sq ft plots and the Sahyadris on three sides — ninety-five minutes from the new airport.`
- Primary CTA: `Book a site visit` · Secondary: `See the master plan`
- Field notes (right, Switzer tabular): `Plot 3,500 sq ft` / `Built-up 2,500 sq ft` / `Configuration G + 1 + terrace` / `From ₹1.60 Cr`

**Media.** Desktop: 8–12s silent loop, `muted playsinline loop autoplay preload="none"`, poster shown until `canplaythrough`, AVIF poster ≤ 180 KB. Mobile and `saveData`/`prefers-reduced-motion`: poster only, no video fetch. Overlay `linear-gradient(100deg, rgba(12,30,38,.78) 0%, rgba(12,30,38,.45) 45%, rgba(12,30,38,.15) 100%)` so type stays ≥ 7:1.

**Load sequence** (total 1.6s, runs once, skipped entirely under reduced motion):

| t | What |
|---|---|
| 0 ms | Poster visible, scaled 1.06, ink overlay at 100% |
| 120 ms | Overlay eases to final opacity, image to scale 1.0 over 1200ms `--ease-soft` |
| 300 ms | H1 line 1 clip-reveals upward from a horizon mask, 640ms `--ease-out` |
| 420 ms | H1 line 2, same, 120ms offset |
| 700 ms | Lead paragraph fades in, 320ms |
| 820 ms | Buttons fade in, 320ms |
| 900 ms | Field notes draw in with their 1px `--stone` rules extending left-to-right, 480ms, 60ms stagger |
| 1400 ms | Contour rail begins drawing; video swaps in if ready |

The H1 reveal is a `clip-path` inset animation, not a translate+fade — the type appears to rise from behind the horizon, which is the one moment of theatre on the page.

**Scroll:** the poster/video translates at 0.12× scroll and the overlay darkens to 0.9 by 100vh, so type stays readable as it exits.

### 6.3 Measure band

A full-width strip of eight facts, no headline, no prose. `--mist` background, 1px `--stone` rules between cells, 48px vertical padding.

`18 villas` · `2 acres` · `3,500 sq ft plot` · `2,500 sq ft built-up` · `G + 1 + terrace` · `Private pool` · `95 min from NMIA` · `From ₹1.60 Cr`

Value in Switzer 500 `--step-2` tabular; label beneath in `--step--1` `--ink-55`. Four columns desktop, two tablet, horizontally scrollable single row on mobile with scroll-snap. **No count-up animation.**

### 6.4 The valley — location and connectivity

```
┌───────────────────────────────┬──────────────────────────────────────────┐
│                               │  Karjat, where the plain runs out        │
│  [ Sahyadri valley render ]   │                                          │
│                               │  The site sits on a south-facing slope   │
│                               │  above Karjat Shindhol, in the Sahyadri  │
│                               │  foothills of Raigad. Waterfalls in the  │
│                               │  monsoon, the valley open to the west,   │
│                               │  and Karjat town's market and temple a   │
│                               │  few minutes down the road.              │
│                               │                                          │
│                               │  ─── Navi Mumbai Intl. airport   95 min  │
│                               │  ─── Karjat railway station      [VERIFY]│
│                               │  ─── Mumbai (Chembur)            [VERIFY]│
│                               │  ─── Pune                        [VERIFY]│
│                               │  ─── Lonavala                    [VERIFY]│
│                               │                                          │
│                               │  [ Open in Google Maps ]                 │
└───────────────────────────────┴──────────────────────────────────────────┘
```

**Copy**
- H2: `Karjat, where the plain runs out`
- Body: `The site sits on a south-facing slope above Karjat Shindhol, in the Sahyadri foothills of Raigad. Waterfalls through the monsoon, the valley open to the west, and Karjat town's market and temple a few minutes down the road.`
- `[VERIFY]` "south-facing" and "open to the west" — confirm orientation from the survey plan before publishing. If unconfirmed, cut both.

**Connectivity rail.** Each row is a 1px `--stone` line whose length is proportional to drive time, with the destination and time at the end. Only the 95-minute airport figure is sourced; every other row is `[VERIFY]` — the builder must not invent distances. Populate from `content.location.connectivity` and render only entries with `verified: true`.

**Map.** Static Mapbox/Google Static Maps image (no interactive embed — it costs 400 KB+ of JS and one map on this page is enough), with an amber pin, wrapped in a link that opens the live map. Confirm the pin coordinates first (Section 2.6).

**Note for the airport line:** NMIA opened to domestic traffic on 25 December 2025 and to international flights on 15 July 2026, so the copy should read `the new Navi Mumbai International Airport` in the present tense, not "upcoming".

### 6.5 Master plan — the interactive moment

Full-viewport `--ink` section. This is where the page spends its boldness; everything else stays quiet so this lands.

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Eighteen plots, three terraces                    Available 11 ▪        │
│                                                    On hold    4 ▫        │
│         ╭─────────── contour ───────────╮          Sold       3 ▪        │
│      ╭──┤  ▪01  ▪02  ▫03  ▪04  ▪05  ▪06 ├──╮                             │
│      │  ╰───────────────────────────────╯  │      Filter by pool         │
│      │   ╭────────────────────────────╮    │      [All] [A] [B] [C]      │
│      │   │ ▪07  ▪08  ▪09  ▪10  ▫11 ▪12│    │                             │
│      │   ╰────────────────────────────╯    │      Click a plot to see    │
│      │      ╭──────────────────────╮       │      its size, pool and     │
│      ╰──────┤ ▪13 ▪14 ▪15 ▫16 ▪17 ▪18├─────╯      orientation.           │
│             ╰──────────────────────╯                                     │
│                                                                          │
│  Indicative layout. Final plot boundaries as per the sanctioned plan.    │
└──────────────────────────────────────────────────────────────────────────┘
```

**Build.** A hand-authored SVG (`viewBox="0 0 1200 780"`), not an image:
- Background: 6–8 contour polylines in `--stone` at 18% opacity, spaced to read as a slope falling left-to-right.
- Three terrace bands as subtle `--terrace` fills at 22% opacity.
- 18 plot polygons, each `<g role="button" tabindex="0" aria-label="Plot 7, 3,500 square feet, Pool B, available">`.
- Access road as a 3px `--stone` dashed path; the clubhouse and gate as two labelled shapes.
- North arrow, a scale bar, and the amber "you are here" gate marker.

**States.** `available` → `--amber` fill at 85%; `on-hold` → `--stone` outline, no fill; `sold` → `--terrace` fill at 45%, label struck through. Hover/focus: plot lifts to full opacity, its number scales 1.08 over `--dur-fast`, and a hairline connects it to a floating label. Selected: 2px `--mist` outline.

**Interaction.**
- Click/Enter opens a right drawer (420px desktop, bottom sheet mobile) with: plot number, area, terrace, pool type, facing, status, one render, and a `Enquire about Plot 07` button that pre-fills the form's `plot` field and scrolls to `#enquire`.
- Pool filter chips dim non-matching plots to 25% opacity over `--dur-base`.
- Keyboard: `Tab` enters the map, arrow keys move between plots in reading order, `Enter` opens the drawer, `Esc` closes it. This is not optional — 18 interactive shapes with no keyboard path is an accessibility failure.
- Legend counts derive from the data, never hardcoded.

**Data.** `content.plots[]` — see `avana-content.json`. Ship with the schematic 6/6/6 terrace arrangement and `"layoutStatus": "schematic"`, which forces the caption `Indicative layout. Final plot boundaries as per the sanctioned plan.` to render. When the real survey drawing arrives, replace the SVG paths and set `"layoutStatus": "surveyed"`.

**Honesty constraint.** Availability shown here is a sales claim. Either wire it to something the sales team actually updates (a CMS field or a Google Sheet read at build/ISR time) or don't show counts at all. A stale "11 available" is worse than no number.

### 6.6 The villa

Two columns: left, a floor-plan viewer; right, the spec table and prose.

**Copy**
- H2: `Two and a half thousand square feet, over three levels`
- Body: `Ground floor for living — kitchen, dining, a bedroom and the garden deck. First floor for the family — bedrooms, the master suite with its freestanding tub, and a balcony over the valley. The terrace is yours to decide.`
- `[VERIFY]` the room distribution above against the approved plans before publishing. If plans aren't available, cut to the spec table alone.

**Spec table** (Switzer, tabular, 1px `--stone` row rules):

| Plot area | 3,500 sq ft |
| Built-up area | 2,500 sq ft |
| Carpet area | 1,950 sq ft |
| Configuration | Ground + first floor + terrace |
| Bedrooms | 4 BHK `[VERIFY]` |
| Private pool | Choose from three |
| Parking | Dedicated, in-plot |
| Possession | 9 months from booking |
| Price | ₹1.60 Cr onwards |

**Floor-plan viewer.** Tabs: `Ground` · `First` · `Terrace`. Each is an SVG or high-res PNG on `--mist-hi` with a pinch/scroll zoom (max 2.5×) and a dimension legend. Only the first-floor plan exists in the source material and only at unusable resolution — ship with a `Plan available on request` state for missing levels rather than a placeholder drawing. Tab change cross-fades over `--dur-base`; no slide.

### 6.7 Pool options — configurator

`--mist-hi` background. Three options, one selected at a time.

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Choose your pool                                                        │
│                                                                          │
│  ┌────────────────────────────────┐   ( ) Pool A  Standard family        │
│  │  plot outline, to scale        │       12 × 12 ft                     │
│  │  ┌────────┐                    │   (•) Pool B  Premium lap            │
│  │  │  pool  │   ← animates       │       8 × 23 ft                      │
│  │  └────────┘                    │   ( ) Pool C  Luxury with jacuzzi    │
│  │  villa footprint               │       10 × 20 ft                     │
│  └────────────────────────────────┘                                      │
│  [ render of the selected pool ]                                         │
└──────────────────────────────────────────────────────────────────────────┘
```

- **The scale drawing is the point.** One SVG showing the 3,500 sq ft plot boundary, the villa footprint and the pool rectangle, all to the same scale. Switching options animates the pool rectangle's width/height over `--dur-base` `--ease-out`, so you see a lap pool actually being longer and narrower. Dimensions render in ft with metres beneath (`8 × 23 ft · 2.4 × 7.0 m`).
- The render swaps with a 320ms cross-fade. Preload all three at `sizes="(max-width: 900px) 100vw, 50vw"`.
- Radio-group semantics: `role="radiogroup"`, arrow-key navigation, `aria-checked`.
- Selected option writes to state and pre-fills the enquiry form's `poolPreference`.
- Caption: `Pool sizes are as offered at booking. Positioning within the plot varies by terrace level.` `[VERIFY]`

### 6.8 Inside — premium features

Four features, asymmetric layout — deliberately not four identical cards. A 12-column grid: feature 1 spans 7 columns with a large image; features 2 and 3 sit in a 5-column stack as text-only with a hairline rule between; feature 4 spans the full width beneath with a wide 21:9 image.

1. **Designer elevation** — `Premium architectural facade with bespoke designer finishes, crafted to reflect luxury living and distinguished curb appeal.`
2. **Master suite bathtub** — `A freestanding bathtub with designer CP fittings in the master suite.`
3. **Landscaped garden** — `Manicured planting, an outdoor leisure deck and a private gazebo.`
4. **Pool options** — `Standard family pool, premium lap pool or a luxury pool with jacuzzi — chosen at booking.` Links to `#pools`.

No hover effects on these. They are read, not clicked.

### 6.9 Amenities

Full-bleed `--terrace` green section with `--mist` text — the only green field on the page, so it reads as the "shared land" chapter.

**Copy** — H2: `What the eighteen share`
Lead: `A clubhouse at the centre of the enclave, a shop you can walk to, and two acres of planting between the houses.`

Ten items in a three-column list, each a name in Switzer 500 and one line beneath in `--mist` at 70%:

| Item | Line |
|---|---|
| Clubhouse | Lounge, indoor games and a multipurpose hall for gatherings. |
| Clubhouse pool | A resort-style pool for the community, beyond your own. |
| Restaurant | On-site dining for weekends and guests. |
| Organic supermarket | Everyday essentials without leaving the gate. |
| Kids' play area | A dedicated, enclosed play zone. |
| Meditation zones | Quiet sit-outs at the edge of the slope. |
| Water bodies | Landscaped water features through the enclave. |
| Mango and Ashoka planting | Shade trees chosen for the terrain. |
| Paved internal roads | Black bitumen, graded for the slope. |
| 24/7 security | Perimeter wall, gates and manned entry. |

One image: the dusk clubhouse render, full-width 21:9 beneath the list, captioned.

### 6.10 Evenings here — the emotional beat

Dark `--ink` section, one full-bleed image (the aerial dusk render with lamp-lit pathways), 0.12 parallax, and a single short passage set in Fraunces `opsz 72` at `--step-4`, maximum 24 words:

> `After sunset the lamps come on along the pathways, and eighteen houses read as one small town on the hillside.`

Nothing else. No CTA, no cards. This is the pause before the commercial half of the page.

### 6.11 Ownership plans

The conversion section for investor traffic. Three plans as three columns on desktop (stacked on mobile), each with a heading, a one-line positioning statement, a spec list and a CTA.

**H2:** `Three ways in`
**Lead:** `Buy a villa at soft-launch pricing, buy one and let us run it as a rental, or invest without owning a villa at all.`

| | Plan A — Assured return | Plan B — Soft launch allotment | Plan C — Ownership programme |
|---|---|---|---|
| One-liner | Invest without buying a villa. | Secure a villa at pre-launch pricing. | Own it, and earn from it. |
| Entry | ₹10 L / ₹25 L / ₹30 L | 30% at booking | Villa price less 15% |
| Term | 1 or 2 years | 9 months to possession | Ongoing |
| Return | 18% p.a. / 36% over 2 years | — | 6–7% p.a. indicative rental yield |
| Suits | Fixed-return investors | Buyers wanting the launch price | Buyers wanting use and income |
| CTA | `Talk to us about Plan A` | `Check available plots` | `Talk to us about Plan C` |

**Plan A specifics**
- Behind `NEXT_PUBLIC_SHOW_PLAN_A` (default `false`) until counsel signs off — Section 3.4.
- Optional micro-calculator: a segmented control for ₹10 L / ₹25 L / ₹30 L and 1 yr / 2 yr, showing the payout from a lookup table in content, never a live formula. The verified pairs are 10→11.8, 25→29.5, 30→35.4 at one year; two-year figures are `[VERIFY]` and must be supplied, not extrapolated.
- The disclosure block (Section 12.4) renders inside the same card, above the fold of that card, not in the footer.

**Plan C specifics** — the words "6–7%" always carry `indicative` in the same sentence; add `Rental income is not guaranteed and depends on occupancy.` under the figure.

**Advantages strip** beneath the three columns, four items, no cards: `15% upfront discount` · `6–7% indicative rental yield` · `Long-term capital appreciation` · `Use it yourself, let it when you don't`.

### 6.12 Payment and possession

This content genuinely is a sequence, so it is the one place numbered markers are used.

```
 01 ───────── 02 ───────── 03 ───────── 04
 Book         Build         Balance      Possession
 30% down     No payment    Construction 9 months
 at booking   until         linked       from booking
              structure     instalments
              completes
```

Horizontal stepped rail on desktop with a 1px `--stone` connector and amber markers; vertical on mobile. Each step: number in Fraunces `opsz 72` `--stone`, title in Switzer 500, body in `--step--1`.

Copy:
1. `Book` — `30% down at booking secures your plot and villa at soft-launch pricing.`
2. `Build` — `No further payment until the structure is complete.`
3. `Balance` — `The remainder is paid against construction milestones.`
4. `Possession` — `Handover within nine months of booking.`

Beneath: `Payment terms are as set out in the allotment letter and agreement for sale. Figures here are indicative.`

### 6.13 The developer

Credibility band on `--mist`, brass hairline above.

**H2:** `Built by Batra & Sankhe Buildcon`
**Body:** `Batra & Sankhe Buildcon — registered as Batra and Sons Infra Realty Developers LLP — builds residential projects across the Mumbai region. Avana Enclave 18 is its flagship hillside development.`

Three principles from the company profile, as a plain list with brass rules, no icons:
- `Clear agreements` — `Terms set out in writing from day one.`
- `Aligned responsibilities` — `Defined ownership of every commitment.`
- `Shared trust` — `Revenue upfront, and long-term accountability.`

Right column: `[VERIFY]` panel for the facts that build trust and which the client must supply — years in business, projects delivered, units handed over, LLP identification number, registered office. Do not invent any of these. If none are supplied, drop the panel; an empty stat is worse than no stat.

Link: `batralifespace.com` and `info@batralifespace.com`.

### 6.14 Enquire

Dark `--ink` section, two columns: form left (7 cols), contact and reassurance right (4 cols).

**H2:** `Come and see the slope`
**Lead:** `We'll arrange a site visit, walk you through the plots that are still open, and answer the money questions properly. Weekends included.`

**Form fields**

| Field | Type | Rules |
|---|---|---|
| `name` | text | required, 2–60 |
| `phone` | tel | required, `+91` default with country selector, validated against E.164 |
| `email` | email | optional, validated if present |
| `interest` | select | Site visit · Buy a villa · Investment plan · Channel partner |
| `plot` | hidden/text | pre-filled from the master plan |
| `poolPreference` | hidden/text | pre-filled from the configurator |
| `preferredDate` | date | shown only when `interest = Site visit` |
| `message` | textarea | optional, 0–500 |
| `consent` | checkbox | **required**, unticked by default |

**Consent copy (required):** `I agree that Batra & Sankhe Buildcon may contact me by phone, WhatsApp and email about Avana Enclave 18, and may store my details for that purpose.` India's Digital Personal Data Protection Act 2023 requires clear notice and affirmative consent before collecting personal data, and a route to withdraw it — so: unticked by default, no pre-checked boxes, a link to the privacy notice, and a withdrawal email address in the footer.

**Behaviour**
- Inline validation on blur, not on keystroke. Errors in `--alert` beneath the field with an icon, `aria-describedby` wired.
- Submit: button label becomes `Sending…`, disabled, spinner. Success replaces the form with a confirmation panel: `Thanks — we've got it. Someone from the sales team will call you on +91 ••••• ••883 within a business day.` and two buttons: `Message us on WhatsApp` and `Add the site visit to your calendar` (`.ics` download).
- Failure: `That didn't send. Call us on +91 77150 39883, or message us on WhatsApp.` with both as live links. Never a generic "something went wrong".
- Protection: honeypot field, 3s minimum form-fill time, Cloudflare Turnstile, and per-IP rate limit of 5/hour at the route handler.

**Right column:** phone (tap-to-call), WhatsApp button (`https://wa.me/917715039883?text=` + a pre-filled message including the plot number if one is selected), site address, the static map, and `<RegBlock variant="inline" />`.

### 6.15 Footer

`--ink`. Four columns: wordmark and one line about the project · quick links · contact and developer · disclosures.

Then a full-width disclosure band (Section 12.4), and a bottom row: `© 2026 Batra and Sons Infra Realty Developers LLP` · `Privacy notice` · `Terms` · `<RegBlock variant="footer" />`.

### 6.16 Sticky action bar (mobile only, < 900px)

Fixed bottom, `--ink`, 64px, safe-area padded, three equal targets: `Call` · `WhatsApp` · `Book a visit`. Appears after 60% of the hero has scrolled past, hides while the enquiry form is in view (it would cover the submit button), returns on scroll away. `--amber` fill on the middle action only.

---

## 7. Component inventory

```
components/
  layout/     Header, RegBlock, ContourRail, Section, Footer, StickyActions
  hero/       Hero, HeroMedia, FieldNotes
  data/       MeasureBand, SpecTable, ConnectivityRail
  plan/       MasterPlan, PlotShape, PlotLegend, PlotFilter, PlotDrawer
  villa/      FloorPlanViewer, PoolConfigurator, PoolScaleDrawing, FeatureGrid
  commerce/   PlanColumns, PlanACalculator, PaymentTimeline, AdvantageStrip
  media/      Figure (image + artist's impression caption), Gallery, StaticMap
  form/       EnquiryForm, Field, PhoneField, ConsentCheckbox, SubmitState
  ui/         Button, Chip, Rule, Disclosure, Drawer, Tabs
```

Selected props:

```ts
<Section id background="mist"|"mist-hi"|"ink"|"terrace" rail={{label:string}} children />
<Figure src alt caption? credit="Artist's impression" ratio="21:9"|"3:2"|"4:5" priority? />
<MasterPlan plots={Plot[]} layoutStatus="schematic"|"surveyed" onSelect={(id)=>void} filter />
<PoolConfigurator options={PoolOption[]} value onChange />
<RegBlock variant="header"|"inline"|"footer" regNumber qrSrc />
<PlanACalculator table={PayoutRow[]} enabled={flag} />
```

`<Figure>` is the only way images enter the page, which guarantees no render ever ships without its attribution.

---

## 8. Tech stack and structure

| Concern | Choice | Why |
|---|---|---|
| Framework | **Next.js 15, App Router, TypeScript** | Static export with per-section metadata, server actions for the form, `next/image` |
| Styling | **Tailwind CSS v4** with the tokens in `@theme` | Tokens live in one place; no runtime CSS-in-JS |
| Motion | **motion** (`motion/react`, ex-Framer Motion) | Scroll-linked values, layout animations, `useReducedMotion` built in |
| Smooth scroll | **Lenis** | Only for the rail's scroll-progress feel; disable under reduced motion |
| Fonts | `next/font/google` for Fraunces, self-hosted Switzer woff2 | No FOUT, no external font request for Switzer |
| Forms | Server action + **Zod** | Validation shared client and server |
| Email | **Resend** | Sales notification + auto-reply |
| Lead store | **Google Sheets API** or Supabase table | Sales team already lives in a sheet — check first |
| Bot defence | **Cloudflare Turnstile** | Lighter than reCAPTCHA |
| Analytics | GA4 + Meta Pixel, both consent-gated | Meta is where the ad spend goes for this segment |
| Host | **Vercel**, `ap-south-1` region for the form route | Audience is in India |

```
app/
  layout.tsx              fonts, metadata, JSON-LD, Lenis provider
  page.tsx                composes every section in order
  actions/enquiry.ts      server action: zod → turnstile → resend → sheet
  api/revalidate/route.ts availability updates
  opengraph-image.tsx
content/
  avana.ts                typed re-export of avana-content.json
  plots.ts
public/
  media/  (renders, poster, QR)
styles/tokens.css
lib/  analytics.ts  whatsapp.ts  format.ts (₹ lakh/crore formatting)
```

**Currency formatting** — one helper, used everywhere: `₹1.60 Cr`, `₹29.5 L`, never `16000000`. Indian digit grouping (`Intl.NumberFormat('en-IN')`) for any raw rupee figure.

---

## 9. Content model

All copy lives in `avana-content.json` (supplied alongside this spec) and is imported as typed data. No string literals in components except UI chrome. This is what lets the client change a price without a developer, and what lets you swap the whole page to Marathi later.

```ts
type Plot = {
  id: string;            // "P07"
  number: number;        // 7
  terrace: 1 | 2 | 3;
  areaSqft: number;      // 3500
  pool: "A" | "B" | "C" | null;
  facing: string | null; // [VERIFY] from survey
  status: "available" | "on-hold" | "sold";
  path: string;          // SVG path data
  labelXY: [number, number];
};
```

Every content field that is unverified carries `"verified": false`; components must not render an unverified field in a public claim position. Write one guard: `assertVerified(field)` in dev, silent omit in production.

---

## 10. Lead handling and analytics

**Flow:** submit → server action → Zod → Turnstile verify → write to sheet/DB → Resend to `sales@` (and auto-reply to the visitor if email given) → optional WhatsApp Cloud API template → return typed result.

**Sales notification email** must contain, in the subject: `Avana enquiry — {name} — {interest}{ plot ? " — Plot "+plot : ""}`. The sales team reads subjects on a phone; put the qualifying facts there.

**Analytics events** (GA4 names, mirrored to Meta):

| Event | Fired when |
|---|---|
| `view_hero` | Hero 50% visible |
| `view_master_plan` | Map section 50% visible |
| `select_plot` | Plot drawer opens (`plot_id`, `status`) |
| `select_pool` | Pool option changed (`pool`) |
| `view_plans` | Plans section 50% visible |
| `open_plan_a_calc` | Calculator interacted with |
| `begin_enquiry` | First field focused |
| `generate_lead` | Submission succeeds (`interest`, `plot`, `value: 1`) |
| `click_whatsapp` / `click_call` | Respective taps, with `location` |

Consent gate: no analytics or pixel loads before the consent banner is answered. Under the DPDP Act, treat analytics identifiers as personal data and don't set them pre-consent.

---

## 11. Performance budget

| Metric | Budget |
|---|---|
| LCP (4G, mid Android) | < 2.0s |
| INP | < 200ms |
| CLS | < 0.05 |
| Initial JS, gzipped | < 180 KB |
| Hero poster | ≤ 180 KB AVIF |
| Any single render | ≤ 220 KB AVIF at 1600px |
| Total page weight, first view | ≤ 1.6 MB |
| Fonts | ≤ 110 KB (Fraunces variable subset + Switzer 400/500/600) |

Rules: `next/image` with AVIF then WebP, explicit `sizes` on every image; only the hero poster is `priority`; hero video `preload="none"` and never fetched on mobile or `saveData`; the master plan is inline SVG (no image request); the map is a static image; Lenis and the motion library are dynamically imported and skipped entirely under `prefers-reduced-motion`; no icon font — inline SVG only; fonts subset to Latin + `₹`.

A large share of this audience is on mid-tier Android on 4G. If the hero video costs more than 400ms of LCP on a Moto-class device, cut it and ship the still. The still is beautiful; the video is optional.

---

## 12. Accessibility, legal copy, and the disclosure block

### 12.1 Accessibility floor
- Every interactive plot reachable and operable by keyboard, with a visible 2px `--amber` focus ring offset 2px.
- The map has a text alternative: a visually-hidden table listing all 18 plots with number, area, pool and status. Screen-reader users get the same information.
- Colour is never the only signal: `sold` plots are struck through as well as tinted; `available` carries a filled marker.
- All form errors are programmatically associated and announced via `aria-live="polite"`.
- Skip link to `#main`. Landmarks on header, main, footer. One `h1`.
- `prefers-reduced-motion` honoured throughout (Section 4.6).
- Target sizes ≥ 44×44 px on mobile, including plot hit areas — enlarge the plot polygons' invisible hit shapes on touch.

### 12.2 Required page copy
- `Artist's impression` on every render.
- `Indicative layout. Final plot boundaries as per the sanctioned plan.` on the master plan.
- `Payment terms are as set out in the allotment letter and agreement for sale.` under the payment timeline.
- `Rental income is indicative and not guaranteed.` wherever 6–7% appears.

### 12.3 Privacy notice
A real page at `/privacy`, not a modal: what is collected, why, who it is shared with, retention period, and how to withdraw consent or request deletion, with a named contact address. Required by the DPDP Act 2023 and needed for Meta ad approval.

### 12.4 Disclosure block

Renders in the footer, and again inside the Plan A card if that plan is enabled. Wording to be replaced by the developer's counsel — this is a placeholder shape, not approved legal text:

> `All images are artist's impressions and do not represent the final product. Plot layouts, areas, specifications, amenities and payment terms are indicative and subject to change and to the sanctioned plans and the agreement for sale. Nothing on this page is an offer or a contract. Prices are exclusive of GST, stamp duty, registration and other statutory charges. Investment returns described here are as per the terms of the relevant agreement, are subject to its conditions, and are not a guarantee of future performance. Project registered with MahaRERA under registration number {REG_NO}; details at https://maharera.maharashtra.gov.in.`

---

## 13. SEO and metadata

- **Title:** `Avana Enclave 18 — 18 villas with private pools in Karjat | Batra & Sankhe Buildcon`
- **Description:** `Eighteen 4 BHK villas on a two-acre slope in Karjat valley. 3,500 sq ft plots, private pools, clubhouse. 95 minutes from Navi Mumbai International Airport. From ₹1.60 Cr.`
- **OG image:** generated at `/opengraph-image` — the valley render with the wordmark and `18 villas · Karjat · from ₹1.60 Cr`, 1200×630.
- **JSON-LD:** `Organization` (developer) + `SingleFamilyResidence` with `numberOfRooms`, `floorSize` (2,500 sq ft), `address` (Karjat Shindhol, Raigad, 410201), `geo` `[VERIFY]`, and `offers` with `priceCurrency: INR`, `price: 16000000`, `priceValidUntil` — plus `FAQPage` for Section 13.1.
- `robots.txt`, `sitemap.xml`, canonical to `https://avanaenclave18.com/`.
- **Do not** claim Lonavala in metadata unless the client confirms it (Section 3.1). Local search for the wrong town is a lead-quality problem, not just an accuracy one.

### 13.1 FAQ block (renders above the footer, also feeds JSON-LD)

1. `Where exactly is Avana Enclave 18?` — Karjat Shindhol, Karjat valley, Raigad district, Maharashtra 410201.
2. `How far is it from the airport?` — About 95 minutes by road from Navi Mumbai International Airport.
3. `What does a villa cost?` — From ₹1.60 Cr, exclusive of statutory charges.
4. `How big is each villa?` — 3,500 sq ft plot, 2,500 sq ft built-up, 1,950 sq ft carpet, ground + first floor + terrace.
5. `Does every villa get a pool?` — Yes, with three sizes to choose from at booking.
6. `When is possession?` — Within nine months of booking.
7. `Can I let the villa out?` — Yes, through the managed rental programme under Plan C.
8. `Is the project RERA registered?` — `[VERIFY]` state the number, or say registration is in process and remove all pricing until it issues.

---

## 14. Build phases

Stop for review at the end of each phase.

**P0 — Foundation.** Next.js + TS + Tailwind v4, tokens from Section 4.2–4.4 in `@theme`, fonts loaded and subset, `<Section>` with the single padding rule, `<Figure>`, `<Button>`, `<Rule>`. *Done when:* a blank page renders the type scale and palette on a specimen route and Lighthouse is 100/100 on an empty page.

**P1 — Shell.** Header with `<RegBlock>`, contour rail, footer, sticky mobile bar, smooth scroll, section anchors. *Done when:* the RERA block sits in the top-right quadrant at compliant size on every breakpoint, and the rail draws correctly on scroll and is absent under reduced motion.

**P2 — Hero + measure band.** The full load sequence in Section 6.2. *Done when:* the sequence runs once at 60fps on a mid Android, LCP < 2.0s on throttled 4G, and reduced motion produces a static composed hero with no missing content.

**P3 — Location.** Copy, connectivity rail rendering only verified rows, static map. *Done when:* unverified rows are absent, not blank.

**P4 — Master plan.** The whole of Section 6.5, including keyboard navigation, the drawer, filters, and the hidden data table. *Done when:* all 18 plots are operable by keyboard alone, the legend counts derive from data, and selecting a plot pre-fills the form field.

**P5 — Villa + pools.** Spec table, floor-plan viewer with a graceful missing-plan state, pool configurator with the to-scale drawing. *Done when:* switching pools animates the rectangle to the correct proportions and the selection reaches the form.

**P6 — Features, amenities, evenings.** *Done when:* no image renders without its caption, and the dark sections hold AA contrast.

**P7 — Plans, payment, developer.** Plan A behind its flag and defaulting off. *Done when:* with the flag off, no assured-return language appears anywhere in the DOM, including JSON-LD.

**P8 — Enquiry.** Server action, validation, Turnstile, Resend, sheet write, WhatsApp deep link, success and failure states, `.ics`. *Done when:* a real submission lands in the sheet and the inbox with the plot number in the subject, and the failure path shows working phone links.

**P9 — Hardening.** Performance budget, axe clean, keyboard pass, 360px pass, metadata, JSON-LD, sitemap, OG image, analytics with consent gate. *Done when:* every budget in Section 11 is met on a throttled run and axe reports zero violations.

**P10 — Content swap.** Replace CGI placeholders with the real renders at full resolution, real floor plans, the surveyed master plan, the RERA number and QR, verified contact details, and counsel-approved disclosure text. *Done when:* zero `[VERIFY]` markers remain in `avana-content.json`.

---

## 15. Asset manifest

| Supplied file | What it is | Use |
|---|---|---|
| `1788799004301_image.png` | Sahyadri valley, daylight, mist | **Hero poster** and location section |
| `1788798942251_image.png` | Aerial dusk, lamp-lit pathways | **Evenings here** (6.10) |
| `1788798923976_image.png` | Clubhouse / restaurant at dusk | **Amenities** (6.9) |
| `1788798962030_image.png` | Deck slide screenshot; the underlying render is the row of white villas | Request the original render — do not ship a screenshot with slide text baked in |
| `1788798910538_image.png` | Terracotta single-storey villa with pool | **Do not use** — off-brand (Section 3.1, conflict 4) |
| `WhatsApp_Video…mp4` | Screen recording of the investment deck | Source of fact only. 848×480 with a `clideo.com` watermark — no frame is publishable |
| `AVANA_ENCLAVE_18.pdf` | Project deck | Copy source; renders inside are usable if the original PSD/PNG can be obtained |
| `Batra___Sankhe_Buildcon.pdf` | Company profile | Developer section copy |

**Ask the client for, before P10:** original renders at ≥ 2400px wide (exterior day, exterior dusk, clubhouse, three pool variants, master bedroom, living, aerial); the sanctioned layout/survey plan; approved ground, first and terrace floor plans; one real photograph of the land; the MahaRERA number and QR PNG; the correct phone number and sales email; the LLP identification number and registered address; and a 10–15s drone clip if a hero video is wanted.

---

## 16. Do not

- Do not add a fade-up reveal to every section, or a hover-lift to every card. The motion budget in Section 4.6 is the whole budget.
- Do not add an all-caps tracked eyebrow above headings, meta strings joined with middle dots, or `→` inside button labels.
- Do not turn the amenity list into ten identical rounded cards with soft shadows.
- Do not invent drive times, room counts, facing directions, delivery track records, or two-year payout figures. Unverified content is omitted, not guessed.
- Do not publish availability counts that nobody updates.
- Do not put the RERA block in the footer only, or shrink it to fit a layout.
- Do not ship a watermarked video frame or a slide screenshot as a render.
- Do not use a second accent colour. Amber is the only one.
- Do not autoplay audio, open a chat widget unprompted, or fire an exit-intent modal. This audience is being asked for ₹1.6 crore; the page should behave like it costs that much.
