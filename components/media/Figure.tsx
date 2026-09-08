import Image from "next/image";
import type { MediaRef } from "@/lib/media";
import { resolveMedia } from "@/lib/media";

export type Ratio = "21:9" | "3:2" | "4:5" | "16:9" | "1:1" | "native";

const ratios: Record<Ratio, string> = {
  "21:9": "21 / 9",
  "3:2": "3 / 2",
  "4:5": "4 / 5",
  "16:9": "16 / 9",
  "1:1": "1 / 1",
  native: "auto",
};

type Props = {
  src: string | null;
  alt: string;
  /** Editorial caption, under the credit line. */
  caption?: string;
  /**
   * Attribution. Spec 4.4 rule 4: all supplied imagery is CGI, so every render
   * carries this. It is a caption, not a footnote — pass `null` only for
   * non-render assets such as the MahaRERA QR code.
   */
  credit?: string | null;
  ratio?: Ratio;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Pre-resolved ref, for client components that cannot touch the filesystem. */
  media?: MediaRef;
};

/**
 * The only way an image enters this page (spec section 7), which is what
 * guarantees no render ever ships without its attribution.
 */
export function Figure({
  src,
  alt,
  caption,
  credit = "Artist's impression",
  ratio = "3:2",
  priority = false,
  sizes = "(max-width: 900px) 100vw, 60vw",
  className = "",
  media,
}: Props) {
  const ref = media ?? resolveMedia(src);
  const aspect = ratios[ratio];

  return (
    <figure className={className}>
      <div
        className="relative w-full overflow-hidden rounded-img bg-[color-mix(in_srgb,var(--stone)_45%,transparent)]"
        style={ratio === "native" ? undefined : { aspectRatio: aspect }}
      >
        {ref.available && ref.src ? (
          <Image
            src={ref.src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        ) : (
          <PendingRender label={alt} />
        )}
      </div>

      {(credit || caption) && (
        <figcaption className="mt-3 flex flex-col gap-1">
          {caption && <span className="caption block">{caption}</span>}
          {credit && <span className="credit block">{credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Shown where a render has not been delivered yet (spec 3.2). Deliberately
 * unmistakable: it must never be confused for the product, and it must hold the
 * exact box the real image will occupy so nothing shifts when it arrives.
 */
function PendingRender({ label }: { label: string }) {
  return (
    <div
      className="absolute inset-0 grid place-items-center bg-[var(--mist-hi)]"
      data-pending-render="true"
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
        viewBox="0 0 400 260"
      >
        {[40, 80, 120, 160, 200, 240].map((y, i) => (
          <path
            key={y}
            d={`M -20 ${y} C 80 ${y - 18 - i * 2}, 200 ${y + 16}, 420 ${y - 10}`}
            fill="none"
            stroke="var(--stone)"
            strokeWidth="1"
            opacity="0.5"
          />
        ))}
      </svg>
      <p className="caption relative px-6 text-center text-[var(--ink-55)]">
        Render pending — {label}
      </p>
    </div>
  );
}
