/**
 * BeansTalkApp - Root application shell.
 *
 * Responsibilities:
 * - Owns the scroll container
 * - Computes normalized scroll progress
 * - Derives global state (altitude, atmosphere, beanstalk growth)
 * - Orchestrates rendering of the three layers
 * - Enforces single-source-of-truth scroll semantics
 *
 * Reference: Component Inventory §1.1
 */

import { useState, useCallback } from 'react';
import { ScrollStateProvider } from '../context/ScrollStateContext';
import { ScrollContainer } from './ScrollContainer';
import { BackgroundWorld, Beanstalk, ForegroundLayer } from './layers';
import { DebugOverlay } from './debug/DebugOverlay';
import styles from './BeansTalkApp.module.css';

/**
 * BeansTalkApp component.
 * Root of the entire presentation.
 */
export function BeansTalkApp() {
  // Raw scroll values - owned by this component
  const [scrollValues, setScrollValues] = useState({
    scrollTop: 0,
    scrollHeight: 1,
    clientHeight: 1,
  });

  // Handle scroll updates from ScrollContainer
  const handleScroll = useCallback(
    (scrollTop: number, scrollHeight: number, clientHeight: number) => {
      setScrollValues({ scrollTop, scrollHeight, clientHeight });
    },
    []
  );

  return (
    <div className={styles.app}>
      <ScrollContainer onScroll={handleScroll}>
        <ScrollStateProvider
          scrollTop={scrollValues.scrollTop}
          scrollHeight={scrollValues.scrollHeight}
          clientHeight={scrollValues.clientHeight}
        >
          {/* Layer 1: Persistent Background World (z-index: 0) */}
          <BackgroundWorld />

          {/* Layer 2: Beanstalk Progress Structure (z-index: 1) */}
          <Beanstalk />

          {/* Layer 3: Ephemeral Narrative Foreground (z-index: 2) */}
          <ForegroundLayer />

          {/* Debug overlay (development only) */}
          <DebugOverlay />
        </ScrollStateProvider>
      </ScrollContainer>
    </div>
  );
}
