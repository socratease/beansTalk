/**
 * BulletRevealList - List with progressive bullet reveal.
 *
 * Reference: Component Inventory §3 - Lists
 */

import { memo } from 'react';
import type { ElementPose } from '../../types';
import styles from './BulletRevealList.module.css';

interface BulletRevealListProps {
  pose: ElementPose;
  props?: {
    items?: string[];
  };
}

export const BulletRevealList = memo(function BulletRevealList({
  pose,
  props,
}: BulletRevealListProps) {
  const { items = ['Item 1', 'Item 2', 'Item 3'] } = props ?? {};
  const draw = pose.draw ?? 1;

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {items.map((item, index) => {
          // Calculate local progress for each item
          const itemStart = index / items.length;
          const itemEnd = (index + 1) / items.length;
          const localProgress = Math.max(0, Math.min(1, (draw - itemStart) / (itemEnd - itemStart)));
          const opacity = localProgress;
          const translateX = (1 - localProgress) * 20;

          if (opacity <= 0) return null;

          return (
            <li
              key={index}
              className={styles.item}
              style={{
                opacity,
                transform: `translateX(${translateX}px)`,
              }}
            >
              <span className={styles.bullet}>●</span>
              <span className={styles.text}>{item}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
});
