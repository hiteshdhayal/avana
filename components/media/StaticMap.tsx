import { ButtonLink } from "@/components/ui/Button";

type Props = {
  lat: number | null;
  lng: number | null;
  geoVerified: boolean;
  address: string;
  label: string;
};

/**
 * A static map image, never an interactive embed — one costs 400 KB+ of
 * JavaScript and one map on this page is enough (spec 6.4).
 *
 * The pin is only drawn once coordinates are confirmed. Spec 2.6: the deck's
 * QR resolves to a pin labelled "Crown Valley Residency", which may be a
 * neighbouring project — so until `geo.verified` is true this renders the
 * address and a search link rather than dropping a pin on a guess.
 */
export function StaticMap({ lat, lng, geoVerified, address, label }: Props) {
  const key = process.env.MAPS_STATIC_KEY;
  const canPin = geoVerified && lat !== null && lng !== null;

  const href = canPin
    ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  if (canPin && key) {
    const src =
      `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}` +
      `&zoom=14&size=640x400&scale=2&maptype=terrain` +
      `&markers=color:0xE39B2E%7C${lat},${lng}&key=${key}`;
    return (
      <figure>
        <a href={href} target="_blank" rel="noopener">
          {/* Deliberately a plain <img>: this is a third-party URL that
              next/image would have to be told to trust, for one static asset. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={`Map showing ${label} at ${address}`}
            width={640}
            height={400}
            loading="lazy"
            className="w-full rounded-img"
          />
        </a>
        <figcaption className="caption mt-3">{address}</figcaption>
      </figure>
    );
  }

  return (
    <div className="rounded-img border border-[var(--rule)] bg-mist-hi p-6">
      <p className="font-sans text-body text-ink">{address}</p>
      <p className="caption mt-2">
        The exact site pin is being confirmed with the developer, so the map
        below opens a search for the address rather than a dropped pin.
      </p>
      <ButtonLink
        href={href}
        variant="ghost"
        className="mt-4"
        target="_blank"
        rel="noopener"
      >
        Open in Google Maps
      </ButtonLink>
    </div>
  );
}
