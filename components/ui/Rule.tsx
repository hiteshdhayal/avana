type Props = {
  className?: string;
  vertical?: boolean;
};

/** A 1px hairline. Depth on this page comes from rules and tonal steps —
 *  never a soft grey drop shadow (spec 4.4). */
export function Rule({ className = "", vertical = false }: Props) {
  if (vertical) {
    return (
      <span
        aria-hidden="true"
        className={`inline-block w-px self-stretch bg-[var(--rule)] ${className}`}
      />
    );
  }
  return <hr className={`rule ${className}`} />;
}
