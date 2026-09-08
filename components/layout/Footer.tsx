import Link from "next/link";
import { RegBlock } from "./RegBlock";
import { Rule } from "@/components/ui/Rule";
import type { MediaRef } from "@/lib/media";

type Props = {
  projectName: string;
  developerLegalName: string;
  strapline: string;
  address: string;
  phoneDisplay: string | null;
  telHref: string | null;
  email: string;
  emailHref: string | null;
  developerSite: string;
  disclosure: string;
  regNumber: string | null;
  authorityUrl: string;
  qr: MediaRef;
  year: number;
};

const QUICK_LINKS = [
  { href: "#location", label: "Location" },
  { href: "#plan", label: "Master plan" },
  { href: "#villa", label: "The villa" },
  { href: "#pools", label: "Pool options" },
  { href: "#amenities", label: "Amenities" },
  { href: "#plans", label: "Ownership plans" },
  { href: "#enquire", label: "Book a site visit" },
];

export function Footer({
  projectName,
  developerLegalName,
  strapline,
  address,
  phoneDisplay,
  telHref,
  email,
  emailHref,
  developerSite,
  disclosure,
  regNumber,
  authorityUrl,
  qr,
  year,
}: Props) {
  return (
    <footer data-scheme="dark" className="bg-ink text-mist">
      <div className="container-page py-16 lg:py-24">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="subdisplay text-step-2">{projectName}</p>
            <span aria-hidden="true" className="mt-2 block h-px w-6 bg-brass" />
            <p className="measure mt-4 text-caption text-[var(--fg-muted)]">
              {strapline}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-sans text-caption text-[var(--fg-muted)]">
              This page
            </h2>
            <ul className="mt-4 space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-caption hover:text-[var(--fg-strong)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-caption text-[var(--fg-muted)]">
              Contact
            </h2>
            <address className="mt-4 space-y-2 not-italic">
              {phoneDisplay && telHref && (
                <a
                  href={telHref}
                  data-contact-detail
                  data-analytics="click_call"
                  className="tnum block font-sans text-caption hover:text-[var(--fg-strong)]"
                >
                  {phoneDisplay}
                </a>
              )}
              {emailHref && (
                <a
                  href={emailHref}
                  data-contact-detail
                  className="block font-sans text-caption hover:text-[var(--fg-strong)]"
                >
                  {email}
                </a>
              )}
              <p data-contact-detail className="font-sans text-caption text-[var(--fg-muted)]">
                {address}
              </p>
              <a
                href={developerSite}
                rel="noopener"
                className="block font-sans text-caption hover:text-[var(--fg-strong)]"
              >
                {developerSite.replace(/^https?:\/\//, "")}
              </a>
            </address>
            {emailHref && (
              /* DPDP Act 2023: a route to withdraw consent must be findable. */
              <p className="mt-4 text-caption text-[var(--fg-muted)]">
                To withdraw consent or ask us to delete your details, email{" "}
                <a href={emailHref} className="underline underline-offset-2">
                  {email}
                </a>
                .
              </p>
            )}
          </div>

          {/* The order requires the block on every advertisement; the header
              placement satisfies the quadrant rule and this one makes it
              impossible to miss. */}
          <div>
            <RegBlock
              variant="footer"
              regNumber={regNumber}
              authorityUrl={authorityUrl}
              qr={qr}
            />
          </div>
        </div>

        <Rule className="my-10" />

        <p className="max-w-none text-caption leading-relaxed text-[var(--fg-muted)]">
          {disclosure}
        </p>

        <Rule className="my-10" />

        <div className="flex flex-col gap-4 text-caption text-[var(--fg-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {developerLegalName}
          </p>
          <Link href="/privacy" className="hover:text-[var(--fg-strong)]">
            Privacy notice
          </Link>
        </div>
      </div>
    </footer>
  );
}
