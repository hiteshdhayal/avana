import type { Plot } from "@/content/types";
import { formatNumber } from "@/lib/format";

/**
 * The map's text alternative (spec 12.1): a visually hidden table listing all
 * 18 plots, so screen-reader users get the same information rather than a
 * shape they cannot read.
 */
export function PlotTable({
  plots,
  showAvailability,
}: {
  plots: Plot[];
  showAvailability: boolean;
}) {
  return (
    <table className="sr-only">
      <caption>All 18 plots at Avana Enclave 18</caption>
      <thead>
        <tr>
          <th scope="col">Plot</th>
          <th scope="col">Area</th>
          <th scope="col">Terrace</th>
          <th scope="col">Pool</th>
          {showAvailability && <th scope="col">Status</th>}
        </tr>
      </thead>
      <tbody>
        {plots.map((plot) => (
          <tr key={plot.id}>
            <th scope="row">{plot.number}</th>
            <td>{formatNumber(plot.areaSqft)} sq ft</td>
            <td>{plot.terrace}</td>
            <td>{plot.pool ? `Pool ${plot.pool}` : "To be selected"}</td>
            {showAvailability && <td>{plot.status.replace("-", " ")}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
