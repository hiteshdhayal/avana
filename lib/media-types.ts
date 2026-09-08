/**
 * A resolved asset reference. Split from `lib/media` so client components can
 * describe one without importing the filesystem lookup that produces it.
 */
export type MediaRef = {
  src: string | null;
  available: boolean;
};
