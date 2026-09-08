import type { SpecRow } from "@/content/types";

/**
 * The villa spec (spec 6.6). Unverified rows never reach this component —
 * `4 BHK` is held out until the client resolves the 3BHK/4BHK conflict
 * (spec 3.1, conflict 3), and the price row is absent until MahaRERA
 * registration issues.
 */
export function SpecTable({ rows }: { rows: SpecRow[] }) {
  return (
    <table className="w-full">
      <caption className="sr-only">Villa specification</caption>
      <tbody>
        {rows.map((row) => (
          <tr key={row.label} className="border-t border-[var(--rule)]">
            <th
              scope="row"
              className="py-3 pr-6 text-left font-sans text-body font-normal text-ink-80"
            >
              {row.label}
            </th>
            <td className="tnum py-3 text-right font-sans text-body font-medium text-ink">
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
