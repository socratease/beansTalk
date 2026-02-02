/**
 * Pure helper functions for scroll-driven state computation.
 * All functions are deterministic and side-effect free.
 *
 * Reference: Scroll Logic Contract §2.1
 */

/**
 * Clamp a value to [0, 1] range.
 */
export function clamp01(x: number): number {
  return Math.min(1, Math.max(0, x));
}

/**
 * Linear interpolation between a and b.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Inverse linear interpolation: find t such that lerp(a, b, t) = x.
 * Result is clamped to [0, 1].
 */
export function invLerp(a: number, b: number, x: number): number {
  if (a === b) return 0;
  return clamp01((x - a) / (b - a));
}

/**
 * Smoothstep function: smooth Hermite interpolation between a and b.
 * Returns 0 when x <= a, 1 when x >= b, and smoothly interpolates between.
 */
export function smoothstep(a: number, b: number, x: number): number {
  const t = invLerp(a, b, x);
  return t * t * (3 - 2 * t);
}

/**
 * Range progress: compute local progress within a range [start, end].
 * Alias for invLerp for semantic clarity.
 */
export function rangeT(start: number, end: number, p: number): number {
  return invLerp(start, end, p);
}

/**
 * Compute normalized scroll progress from scroll position.
 *
 * The experience starts at the bottom (scrollTop = scrollHeight - clientHeight)
 * and progresses upward (scrollTop = 0).
 *
 * p = 0 → Story begins (bottom of scroll)
 * p = 1 → Story ends (top of scroll)
 *
 * Reference: Scroll Logic Contract §1.1
 */
export function computeProgress(
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number
): number {
  const yMax = scrollHeight - clientHeight;
  if (yMax <= 0) return 0;
  return clamp01(1 - (scrollTop / yMax));
}
