/**
 * ForegroundLayer - Layer 3: Ephemeral Narrative Foreground.
 *
 * Renders only active narrative segments based on current scroll progress.
 * Always rendered above Background and Beanstalk.
 * Never affected by atmospheric effects (fog, clouds).
 *
 * Reference: Visual System Contract §Layer 3, Component Inventory §2.3
 */

import { memo } from 'react';
import { useProgress } from '../../context/ScrollStateContext';
import { SegmentRenderer } from '../segments/SegmentRenderer';
import styles from './ForegroundLayer.module.css';

/**
 * ForegroundLayer component.
 * Container for all narrative segments.
 */
export const ForegroundLayer = memo(function ForegroundLayer() {
  const progress = useProgress();

  return (
    <div className={styles.container}>
      <SegmentRenderer progress={progress} />
    </div>
  );
});
