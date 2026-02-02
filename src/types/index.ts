/**
 * Core type definitions for beansTalk scroll-driven presentation.
 * All types derive from the Scroll Logic Contract.
 */

/**
 * Global state computed from scroll position.
 * This is the single source of truth for all visual state.
 */
export interface GlobalState {
  /** Normalized story progress [0, 1]. 0 = beginning, 1 = end */
  p: number;
  /** Altitude scalar [0, 1], derived from p via smoothstep */
  alt: number;
  /** Fog density channel [0, 1] */
  fog: number;
  /** Cloud intrusion channel [0, 1] */
  cloud: number;
  /** Light diffusion channel [0, 1] */
  diffuse: number;
  /** Beanstalk state */
  beanstalk: BeanstalkState;
}

/**
 * Beanstalk layer state.
 */
export interface BeanstalkState {
  /** Whether the beanstalk exists (p >= BEAN_INTRO_P) */
  exists: boolean;
  /** Growth scalar [0, 1], only meaningful when exists is true */
  g: number;
}

/**
 * Atmosphere channels affecting Background and Beanstalk only.
 */
export interface AtmosphereState {
  fog: number;
  cloud: number;
  diffuse: number;
}

/**
 * Pose state for a foreground element.
 */
export interface ElementPose {
  opacity: number;
  x?: number;
  y?: number;
  scale?: number;
  rotate?: number;
  zIndex?: number;
  /** For charts/graphics: draw progress [0, 1] */
  draw?: number;
  /** For tables: cell highlight states */
  highlights?: Record<string, boolean>;
}

/**
 * Segment definition for narrative elements.
 */
export interface Segment {
  /** Unique segment identifier */
  id: string;
  /** Progress where segment becomes eligible to render */
  start: number;
  /** End of entry transition */
  enterEnd: number;
  /** Start of exit transition */
  exitStart: number;
  /** Progress where segment must be fully removed */
  end: number;
  /** Component type to render */
  component: string;
  /** Optional props for the component */
  props?: Record<string, unknown>;
}

/**
 * Segment with computed local progress values.
 */
export interface ActiveSegment extends Segment {
  /** Local progress within entry phase [0, 1] */
  tEnter: number;
  /** Local progress within exit phase [0, 1] */
  tExit: number;
  /** Computed opacity based on entry/exit */
  opacity: number;
}
