/**
 * ScrollContainer - Provides vertical scroll affordance.
 *
 * Responsibilities:
 * - Defines scroll coordinate system (bottom → top progression)
 * - Exposes scrollTop, scrollHeight, clientHeight
 * - Reports scroll position changes to parent
 *
 * Reference: Component Inventory §1.2
 */

import { useRef, useEffect, useCallback, useState } from 'react';
import styles from './ScrollContainer.module.css';

/** Height multiplier for creating scroll space */
const SCROLL_HEIGHT_MULTIPLIER = 10;

interface ScrollContainerProps {
  children: React.ReactNode;
  /** Callback when scroll position changes */
  onScroll: (scrollTop: number, scrollHeight: number, clientHeight: number) => void;
}

export function ScrollContainer({ children, onScroll }: ScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Handle scroll events
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    onScroll(
      container.scrollTop,
      container.scrollHeight,
      container.clientHeight
    );
  }, [onScroll]);

  // Initialize scroll position to bottom (story beginning)
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isInitialized) return;

    // Set scroll to bottom (p = 0, story beginning)
    const yMax = container.scrollHeight - container.clientHeight;
    container.scrollTop = yMax;

    // Report initial position
    onScroll(yMax, container.scrollHeight, container.clientHeight);
    setIsInitialized(true);
  }, [onScroll, isInitialized]);

  // Attach scroll listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Handle resize
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleResize = () => {
      onScroll(
        container.scrollTop,
        container.scrollHeight,
        container.clientHeight
      );
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(container);
    return () => observer.disconnect();
  }, [onScroll]);

  return (
    <div ref={containerRef} className={styles.container}>
      {/* Scroll spacer to create scrollable height */}
      <div
        className={styles.spacer}
        style={{ height: `${SCROLL_HEIGHT_MULTIPLIER * 100}vh` }}
      />
      {/* Fixed viewport for content layers */}
      <div className={styles.viewport}>
        {children}
      </div>
    </div>
  );
}
