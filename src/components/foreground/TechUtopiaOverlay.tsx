/**
 * TechUtopiaOverlay - Tech utopia drop-in illustrations.
 *
 * Reference: Component Inventory §3 - Illustrative / Animation
 */

import { memo } from 'react';
import type { ElementPose } from '../../types';
import styles from './TechUtopiaOverlay.module.css';

interface TechUtopiaOverlayProps {
  pose: ElementPose;
  props?: Record<string, unknown>;
}

export const TechUtopiaOverlay = memo(function TechUtopiaOverlay({
  pose,
}: TechUtopiaOverlayProps) {
  const draw = pose.draw ?? 1;

  // Stagger appearance of icons based on draw progress
  const icons = [
    { id: 'tractor', label: '🚜', delay: 0 },
    { id: 'windmill', label: '🌾', delay: 0.25 },
    { id: 'robot', label: '🤖', delay: 0.5 },
    { id: 'spaceship', label: '🚀', delay: 0.75 },
  ];

  return (
    <div className={styles.container}>
      {icons.map((icon) => {
        const localProgress = Math.max(0, (draw - icon.delay) / 0.25);
        const opacity = Math.min(1, localProgress);
        const scale = 0.5 + opacity * 0.5;

        if (opacity <= 0) return null;

        return (
          <div
            key={icon.id}
            className={styles.icon}
            style={{
              opacity,
              transform: `scale(${scale})`,
            }}
          >
            <span className={styles.emoji}>{icon.label}</span>
          </div>
        );
      })}
    </div>
  );
});
