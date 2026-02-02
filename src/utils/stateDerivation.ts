/**
 * State derivation functions for computing global state from scroll progress.
 * All functions are pure and deterministic.
 *
 * Reference: Scroll Logic Contract §2, §3
 */

import type { GlobalState, BeanstalkState, AtmosphereState } from '../types';
import { clamp01, smoothstep } from './scrollMath';

// Constants from Scroll Logic Contract
// These define the scroll ranges for atmospheric and beanstalk effects

/** Progress where altitude/atmosphere begins affecting visuals */
export const ALT_START = 0.55;

/** Progress where atmosphere reaches maximum intensity */
export const ALT_END = 0.95;

/** Progress where beanstalk begins to appear (2023 moment) */
export const BEAN_INTRO_P = 0.36;

/** Progress where initial beanstalk emergence is complete */
export const BEAN_FULL_P = 0.40;

/**
 * Compute altitude scalar from progress.
 * Altitude increases with progress, used to drive atmospheric effects.
 *
 * Reference: Scroll Logic Contract §2.2
 */
export function computeAltitude(p: number): number {
  return smoothstep(ALT_START, ALT_END, p);
}

/**
 * Compute atmosphere channels from altitude.
 * These affect only Background and Beanstalk layers.
 *
 * Reference: Scroll Logic Contract §2.3
 */
export function computeAtmosphere(alt: number): AtmosphereState {
  return {
    fog: smoothstep(0.10, 1.00, alt),
    cloud: smoothstep(0.25, 1.00, alt),
    diffuse: smoothstep(0.00, 1.00, alt),
  };
}

/**
 * Compute beanstalk state from progress.
 *
 * - Before BEAN_INTRO_P: beanstalk does not exist
 * - At and after BEAN_INTRO_P: beanstalk exists permanently
 * - Growth is monotonic and continuous
 *
 * Reference: Scroll Logic Contract §3
 */
export function computeBeanstalkState(p: number): BeanstalkState {
  const exists = p >= BEAN_INTRO_P;

  // Growth scalar: 0 at BEAN_INTRO_P, 1 at p = 1
  // g = (p - BEAN_INTRO_P) / (1 - BEAN_INTRO_P)
  const g = exists
    ? clamp01((p - BEAN_INTRO_P) / (1 - BEAN_INTRO_P))
    : 0;

  return { exists, g };
}

/**
 * Compute complete global state from normalized scroll progress.
 * This is the primary state derivation function.
 *
 * Given any progress p, this function returns a deterministic GlobalState
 * that can be used to render the entire presentation.
 *
 * Reference: Scroll Logic Contract §9
 */
export function computeGlobalState(p: number): GlobalState {
  const alt = computeAltitude(p);
  const atmosphere = computeAtmosphere(alt);
  const beanstalk = computeBeanstalkState(p);

  return {
    p,
    alt,
    fog: atmosphere.fog,
    cloud: atmosphere.cloud,
    diffuse: atmosphere.diffuse,
    beanstalk,
  };
}
