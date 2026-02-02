/**
 * FloatingYearText - Displays a year as floating text.
 *
 * Reference: Component Inventory §3 - Text
 */

import { memo } from 'react';
import type { ElementPose } from '../../types';
import styles from './FloatingYearText.module.css';

interface FloatingYearTextProps {
  pose: ElementPose;
  props?: {
    year?: number;
    highlight?: boolean;
  };
}

export const FloatingYearText = memo(function FloatingYearText({
  props,
}: FloatingYearTextProps) {
  const { year = 2020, highlight = false } = props ?? {};

  return (
    <div className={`${styles.container} ${highlight ? styles.highlight : ''}`}>
      <span className={styles.year}>{year}</span>
    </div>
  );
});
