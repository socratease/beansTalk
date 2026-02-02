/**
 * SegmentWrapper - Applies pose transforms to segment content.
 *
 * Wraps each segment's content and applies opacity, position, and scale
 * based on the computed pose.
 *
 * Reference: Scroll Logic Contract §4.1
 */

import { memo } from 'react';
import type { ElementPose } from '../../types';
import styles from './SegmentWrapper.module.css';

interface SegmentWrapperProps {
  pose: ElementPose;
  children: React.ReactNode;
}

/**
 * SegmentWrapper component.
 * Applies pose-based transforms to children.
 */
export const SegmentWrapper = memo(function SegmentWrapper({
  pose,
  children,
}: SegmentWrapperProps) {
  const { opacity, x = 0, y = 0, scale = 1, rotate = 0, zIndex } = pose;

  // Don't render if fully transparent
  if (opacity <= 0) {
    return null;
  }

  return (
    <div
      className={styles.wrapper}
      style={{
        opacity,
        transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotate}deg)`,
        zIndex: zIndex ?? 'auto',
      }}
    >
      {children}
    </div>
  );
});
