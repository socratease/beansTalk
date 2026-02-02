/**
 * SectionTitle - Displays a section heading.
 *
 * Reference: Component Inventory §3 - Text
 */

import { memo } from 'react';
import type { ElementPose } from '../../types';
import styles from './SectionTitle.module.css';

interface SectionTitleProps {
  pose: ElementPose;
  props?: {
    title?: string;
  };
}

export const SectionTitle = memo(function SectionTitle({
  props,
}: SectionTitleProps) {
  const { title = 'Section Title' } = props ?? {};

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.underline} />
    </div>
  );
});
