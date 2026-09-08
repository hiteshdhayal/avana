import "server-only";
import fs from "node:fs";
import path from "node:path";

import type { MediaRef } from "./media-types";

export type { MediaRef };

/**
 * Asset resolution.
 *
 * Spec 3.2: every supplied image is CGI, the usable originals have not been
 * delivered yet, and the video frames are watermarked and unpublishable. So
 * the content file points at render paths that do not exist yet.
 *
 * Rather than shipping broken <img>s or inventing stand-in photography, we
 * check at build time whether the file is actually there. If it is not,
 * <Figure> draws a labelled placeholder that holds the exact layout box — no
 * layout shift when the real render lands, and no chance of a placeholder
 * being mistaken for the product.
 */

const cache = new Map<string, boolean>();

function existsInPublic(src: string): boolean {
  const cached = cache.get(src);
  if (cached !== undefined) return cached;

  let exists = false;
  try {
    const rel = src.replace(/^\//, "");
    exists = fs.existsSync(path.join(process.cwd(), "public", rel));
  } catch {
    exists = false;
  }
  cache.set(src, exists);
  return exists;
}

export function resolveMedia(src: string | null | undefined): MediaRef {
  if (!src) return { src: null, available: false };
  if (/^https?:\/\//.test(src)) return { src, available: true };
  return { src, available: existsInPublic(src) };
}
