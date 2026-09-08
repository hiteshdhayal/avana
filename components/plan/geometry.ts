/**
 * Schematic geometry for the master plan (spec 6.5).
 *
 * The 18 plot polygons come from `avana-content.json` — the 6/6/6 terrace
 * arrangement the spec says to ship until the survey drawing arrives. What is
 * here is the ground they sit on: contour lines, the three terrace bands, the
 * access road and the two buildings, all derived from the plot rows so the
 * slope reads consistently.
 *
 * Everything is indicative. When the sanctioned layout arrives, replace the
 * plot paths in content and set `layoutStatus: "surveyed"` — see NORTH and
 * SCALE below, which stay hidden until then.
 */

/** Contour polylines, falling left to right across the slope. */
export const CONTOURS: string[] = Array.from({ length: 8 }, (_, i) => {
  const y = 46 + i * 96;
  const drop = 34 + i * 3;
  return (
    `M -20 ${y} C 220 ${y - drop * 0.7}, 480 ${y + 12}, 720 ${y - drop} ` +
    `S 1040 ${y - drop * 1.5}, 1240 ${y - drop * 1.1}`
  );
});

/** The three terraces, as bands the plot rows sit inside. */
export const TERRACE_BANDS = [
  { terrace: 1, d: "M 86 135 L 1042 83 L 1042 247 L 86 299 Z" },
  { terrace: 2, d: "M 126 335 L 1082 289 L 1082 453 L 126 499 Z" },
  { terrace: 3, d: "M 171 535 L 1127 494 L 1127 658 L 171 699 Z" },
] as const;

/** Access road: one spine up the western edge, with a spur to each terrace. */
export const ROAD_SPINE =
  "M 54 764 C 44 690, 68 620, 58 540 S 44 400, 60 320 S 50 190, 58 104";

export const ROAD_SPURS = [
  "M 58 566 L 171 519",
  "M 58 352 L 126 319",
  "M 58 152 L 86 137",
];

/** Gate — the amber "you are here" marker, at the foot of the road. */
export const GATE = { x: 54, y: 764, label: "Gate" };

/** Clubhouse, on the flat ground at the foot of the slope. */
export const CLUBHOUSE = {
  x: 505,
  y: 706,
  width: 190,
  height: 56,
  label: "Clubhouse",
};

/**
 * The north arrow and the scale bar are drawn only once the survey confirms
 * them. Spec 6.4 marks orientation `[VERIFY]`, and a scale bar on a schematic
 * that is explicitly "not to scale" would be false precision — the same rule
 * that keeps invented drive times off the page.
 */
export const NORTH = { x: 1140, y: 60 };
export const SCALE_BAR = { x: 86, y: 742, feet: 50, units: 117 };
