import type { PoolOption } from "@/content/types";

/**
 * The pool options, drawn to one scale (spec 6.7) — the point of the section:
 * switching options should show a lap pool actually being longer and narrower,
 * not just a different photograph.
 *
 * The plot is drawn as a 3,500 sq ft square and labelled as such. Area is the
 * only plot dimension in the source material, so the square is declared as a
 * scale reference rather than presented as the plot's shape. The villa
 * footprint is deliberately absent: it needs the approved ground-floor plan,
 * which has not been released (spec 3.2), and drawing a guess would put an
 * invented dimension on a page whose whole discipline is not doing that.
 */

const PLOT_SQFT = 3500;
const PLOT_SIDE_FT = Math.sqrt(PLOT_SQFT); // 59.16 ft
const PAD = 26;
const SIZE = 420;
const SCALE = (SIZE - PAD * 2) / PLOT_SIDE_FT;

export function PoolScaleDrawing({ pool }: { pool: PoolOption }) {
  const [wFt, hFt] = pool.ft;
  const w = wFt * SCALE;
  const h = hFt * SCALE;

  // Seated toward the rear of the plot, where a pool would sit behind a house.
  const x = PAD + 18;
  const y = SIZE - PAD - h - 18;

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      role="img"
      aria-label={`${pool.name}, ${wFt} by ${hFt} feet, drawn to scale inside a ${PLOT_SQFT} square foot plot`}
      className="h-auto w-full max-w-md"
    >
      <rect
        x={PAD}
        y={PAD}
        width={SIZE - PAD * 2}
        height={SIZE - PAD * 2}
        fill="none"
        stroke="var(--stone)"
        strokeWidth="1"
      />
      <text
        x={PAD}
        y={PAD - 9}
        className="font-sans tnum"
        style={{ fontSize: 13, fill: "var(--ink-55)" }}
      >
        3,500 sq ft plot, shown as a square for scale
      </text>

      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill="color-mix(in srgb, var(--terrace) 32%, transparent)"
        stroke="var(--terrace)"
        strokeWidth="1.5"
        style={{
          transition:
            "width var(--dur-base) var(--ease-out), height var(--dur-base) var(--ease-out), y var(--dur-base) var(--ease-out)",
        }}
      />

      {/* Dimension labels, ft with metres beneath (spec 6.7). */}
      <text
        x={x + w / 2}
        y={y - 10}
        textAnchor="middle"
        className="font-sans tnum"
        style={{ fontSize: 13, fill: "var(--ink)" }}
      >
        {wFt} ft
      </text>
      <text
        x={x + w + 10}
        y={y + h / 2}
        dominantBaseline="middle"
        className="font-sans tnum"
        style={{ fontSize: 13, fill: "var(--ink)" }}
      >
        {hFt} ft
      </text>
    </svg>
  );
}
