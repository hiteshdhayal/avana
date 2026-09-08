export function AdvantageStrip({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="mt-16 grid gap-x-8 gap-y-6 border-t border-[var(--rule)] pt-10 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <li key={item} className="font-sans text-body text-ink-80">
          {item}
        </li>
      ))}
    </ul>
  );
}
