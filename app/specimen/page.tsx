import type { Metadata } from "next";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Figure } from "@/components/media/Figure";
import { Rule } from "@/components/ui/Rule";
import { Section, SectionInner } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Specimen — Avana Enclave 18",
  robots: { index: false, follow: false },
};

/**
 * Design-system specimen (spec 14, P0). Not linked from the site and not
 * indexed — it exists so the palette, the type scale and the primitives can be
 * checked in isolation, and so a drift in tokens is visible in one place.
 */

const palette = [
  ["--ink", "#0C1E26", "dusk in the valley", "13.9:1 on mist"],
  ["--ink-80", "#35474F", "body text on mist", "8.1:1 on mist"],
  ["--ink-55", "#6C7B81", "captions ≥ 14px only", "4.6:1 on mist"],
  ["--mist", "#EDEFE9", "page background", "cool green-grey, not cream"],
  ["--mist-hi", "#F6F7F3", "raised surfaces", "—"],
  ["--stone", "#BFC5BA", "rules, contours, plots", "non-text"],
  ["--terrace", "#35543F", "map fills, second surface", "8.6:1 with mist"],
  ["--amber", "#E39B2E", "THE accent, nothing else", "never as text < 18px"],
  ["--amber-ink", "#4A2F06", "text on amber", "7.4:1 on amber"],
  ["--brass", "#A9884F", "developer signature only", "non-text"],
  ["--alert", "#A3402F", "form errors", "6.3:1 on mist"],
] as const;

const scale = [
  ["--step-5", "text-step-5", "display", "Eighteen villas"],
  ["--step-4", "text-step-4", "subdisplay", "One hillside in Karjat"],
  ["--step-3", "text-step-3", "subdisplay", "Section heading"],
  ["--step-2", "text-step-2", "", "Measure band value"],
  ["--step-1", "text-lead", "", "Lead paragraph, 52ch measure"],
  ["--step-0", "text-body", "", "Body copy, 62–68 characters"],
  ["--step--1", "text-caption", "", "Caption and data label"],
] as const;

export default function Specimen() {
  return (
    <main id="main">
      <Section rail={{ label: "Colour" }}>
        <SectionInner>
          <h1 className="display text-step-4">Specimen</h1>
          <p className="measure-lead mt-6 text-lead">
            Tokens from spec 4.2–4.4. If something on the page does not use one
            of these, it is a bug.
          </p>

          <h2 className="subdisplay mt-16 text-step-3">Colour</h2>
          <ul className="mt-8 grid gap-px bg-[var(--rule)] sm:grid-cols-2 lg:grid-cols-3">
            {palette.map(([token, hex, use, contrast]) => (
              <li key={token} className="bg-mist p-4">
                <div
                  className="h-16 w-full rounded-s border border-[var(--rule)]"
                  style={{ background: `var(${token})` }}
                />
                <p className="tnum mt-3 font-sans text-caption text-ink">
                  {token} · {hex}
                </p>
                <p className="text-caption text-ink-55">{use}</p>
                <p className="text-caption text-ink-55">{contrast}</p>
              </li>
            ))}
          </ul>
        </SectionInner>
      </Section>

      <Section background="mist-hi" rail={{ label: "Type" }}>
        <SectionInner>
          <h2 className="subdisplay text-step-3">Type</h2>
          <p className="measure mt-4 text-body">
            Fraunces for display and captions through its optical-size axis;
            a quiet grotesque for body, UI and data. Sentence case everywhere,
            including buttons. Tabular figures on every measurement.
          </p>
          <div className="mt-10 space-y-8">
            {scale.map(([token, cls, family, sample]) => (
              <div key={token}>
                <p className="tnum font-sans text-caption text-ink-55">
                  {token} · {cls}
                </p>
                <p className={`${family} ${cls} text-ink`}>{sample}</p>
              </div>
            ))}
          </div>

          <h3 className="subdisplay mt-16 text-step-2">Tabular figures</h3>
          <table className="tnum mt-4 w-full max-w-md font-sans text-body">
            <tbody>
              {[
                ["Plot area", "3,500 sq ft"],
                ["Built-up area", "2,500 sq ft"],
                ["Carpet area", "1,950 sq ft"],
              ].map(([k, v]) => (
                <tr key={k} className="border-t border-[var(--rule)]">
                  <th scope="row" className="py-3 text-left font-normal text-ink-80">
                    {k}
                  </th>
                  <td className="py-3 text-right text-ink">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </SectionInner>
      </Section>

      <Section rail={{ label: "Primitives" }}>
        <SectionInner>
          <h2 className="subdisplay text-step-3">Primitives</h2>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button variant="primary" size="lg">
              Book a site visit
            </Button>
            <ButtonLink href="#" variant="secondary">
              See the master plan
            </ButtonLink>
            <Button variant="ghost">Talk to us</Button>
            <Button variant="primary" disabled>
              Sending…
            </Button>
          </div>
          <Rule className="my-10" />
          <div className="max-w-xl">
            <Figure
              src="/media/valley-day.avif"
              alt="the valley at Karjat Shindhol"
              ratio="3:2"
              caption="Figure holds the layout box whether or not the render exists."
            />
          </div>
        </SectionInner>
      </Section>

      <Section background="ink" rail={{ label: "Dark" }}>
        <SectionInner>
          <h2 className="subdisplay text-step-3">Dark passage</h2>
          <p className="measure mt-4 text-body">
            Ink ground, mist text, stone at 40% for rules. Captions and credits
            resolve automatically — no per-section colour overrides.
          </p>
          <Rule className="my-8" />
          <p className="credit">Artist&rsquo;s impression</p>
        </SectionInner>
      </Section>

      <Section background="terrace" rail={{ label: "Terrace" }}>
        <SectionInner>
          <h2 className="subdisplay text-step-3">Terrace green</h2>
          <p className="measure mt-4 text-body">
            The only green field on the page, so it reads as the shared-land
            chapter.
          </p>
        </SectionInner>
      </Section>
    </main>
  );
}
