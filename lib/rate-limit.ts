import "server-only";

/**
 * Per-IP rate limit for the enquiry route (spec 6.14): 5 submissions/hour.
 *
 * This is an in-memory token count, which is honest about its one real
 * limitation: on a serverless platform with more than one warm instance, the
 * limit is enforced per instance, not globally. That is an acceptable
 * approximation for a launch-scale enquiry form; if volume ever justifies it,
 * swap this module for Upstash Redis or Vercel KV — the call site
 * (`checkRateLimit`) does not need to change.
 */

const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Bound memory growth: forget IPs that have not submitted in a while.
function sweep(now: number) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  if (buckets.size > 5000) sweep(now);

  const existing = buckets.get(ip);
  if (!existing || existing.resetAt <= now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_PER_WINDOW - 1 };
  }

  if (existing.count >= MAX_PER_WINDOW) {
    return { allowed: false, remaining: 0 };
  }

  existing.count += 1;
  return { allowed: true, remaining: MAX_PER_WINDOW - existing.count };
}
