/**
 * ScrollStateProvider - Centralized scroll state management.
 *
 * Provides global state derived from scroll position to all child components.
 * This is the single source of truth for all scroll-driven visual state.
 *
 * Reference: Component Inventory §1.3, Scroll Logic Contract §0
 */

import { createContext, useContext, useMemo } from 'react';
import type { GlobalState } from '../types';
import { computeGlobalState } from '../utils/stateDerivation';

/**
 * Context value type.
 */
interface ScrollStateContextValue {
  /** Complete global state derived from scroll position */
  state: GlobalState;
  /** Raw scroll values for debugging/advanced use */
  scroll: {
    scrollTop: number;
    scrollHeight: number;
    clientHeight: number;
  };
}

/**
 * Default state at story beginning (p = 0).
 */
const defaultState = computeGlobalState(0);

const ScrollStateContext = createContext<ScrollStateContextValue>({
  state: defaultState,
  scroll: {
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0,
  },
});

/**
 * Props for ScrollStateProvider.
 */
interface ScrollStateProviderProps {
  children: React.ReactNode;
  /** Current scroll position from container */
  scrollTop: number;
  /** Total scrollable height */
  scrollHeight: number;
  /** Visible height of container */
  clientHeight: number;
}

/**
 * Provider component that computes and distributes global state.
 *
 * All state derivation is pure and deterministic - given the same
 * scroll position, the same state will always be computed.
 */
export function ScrollStateProvider({
  children,
  scrollTop,
  scrollHeight,
  clientHeight,
}: ScrollStateProviderProps) {
  // Compute normalized progress from scroll position
  const yMax = scrollHeight - clientHeight;
  const p = yMax > 0 ? Math.min(1, Math.max(0, 1 - (scrollTop / yMax))) : 0;

  // Compute complete global state from progress
  const state = useMemo(() => computeGlobalState(p), [p]);

  // Memoize scroll values
  const scroll = useMemo(
    () => ({ scrollTop, scrollHeight, clientHeight }),
    [scrollTop, scrollHeight, clientHeight]
  );

  // Memoize context value
  const value = useMemo(
    () => ({ state, scroll }),
    [state, scroll]
  );

  return (
    <ScrollStateContext.Provider value={value}>
      {children}
    </ScrollStateContext.Provider>
  );
}

/**
 * Hook to access complete global state.
 */
export function useScrollState(): GlobalState {
  return useContext(ScrollStateContext).state;
}

/**
 * Hook to access just the normalized progress.
 */
export function useProgress(): number {
  return useContext(ScrollStateContext).state.p;
}

/**
 * Hook to access beanstalk state.
 */
export function useBeanstalkState() {
  return useContext(ScrollStateContext).state.beanstalk;
}

/**
 * Hook to access atmosphere state.
 */
export function useAtmosphereState() {
  const { fog, cloud, diffuse } = useContext(ScrollStateContext).state;
  return { fog, cloud, diffuse };
}

/**
 * Hook to access raw scroll values.
 */
export function useRawScroll() {
  return useContext(ScrollStateContext).scroll;
}
