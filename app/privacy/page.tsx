import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionInner } from "@/components/layout/Section";
import { privacyNotice } from "@/content/privacy";

export const metadata: Metadata = {
  title: "Privacy notice — Avana Enclave 18",
  description:
    "How Batra and Sankhe Buildcon collects, uses and stores details submitted through the Avana Enclave 18 enquiry form.",
};

export default function Privacy() {
  return (
    <main id="main">
      <Section>
        <SectionInner>
          <Link
            href="/"
            className="font-sans text-caption text-ink-55 hover:text-ink"
          >
            Avana Enclave 18
          </Link>
          <h1 className="subdisplay mt-4 text-step-3">{privacyNotice.title}</h1>
          <p className="measure-lead mt-4 text-lead">{privacyNotice.updated}</p>

          <div className="mt-14 space-y-12">
            {privacyNotice.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="subdisplay text-step-2">{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="measure mt-3 text-body"
                    data-pending={section.pending ? "true" : undefined}
                  >
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="measure mt-4 space-y-2">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="border-t border-[var(--rule)] pt-2 text-body"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </SectionInner>
      </Section>
    </main>
  );
}
