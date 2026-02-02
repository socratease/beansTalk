/**
 * LottieGroup - Placeholder for Lottie animations.
 *
 * Note: Actual Lottie integration would require lottie-react package
 * and animation JSON files. This is a placeholder implementation.
 *
 * Reference: Component Inventory §3 - Illustrative / Animation
 */

import { memo } from 'react';
import type { ElementPose } from '../../types';
import styles from './LottieGroup.module.css';

interface LottieGroupProps {
  pose: ElementPose;
  props?: {
    animation?: 'manhattan' | 'apollo';
    position?: 'left' | 'right';
  };
}

const defaultInfo = {
  title: 'Manhattan Project',
  description: 'Scientists collaborating on atomic research',
};

const animationLabels: Record<string, { title: string; description: string }> = {
  manhattan: defaultInfo,
  apollo: {
    title: 'Apollo Program',
    description: 'Engineers building the path to the moon',
  },
};

export const LottieGroup = memo(function LottieGroup({
  pose,
  props,
}: LottieGroupProps) {
  const { animation = 'manhattan', position = 'left' } = props ?? {};
  const draw = pose.draw ?? 1;
  const info = animationLabels[animation] ?? defaultInfo;

  return (
    <div
      className={`${styles.container} ${position === 'right' ? styles.right : styles.left}`}
    >
      <div
        className={styles.placeholder}
        style={{ opacity: 0.5 + draw * 0.5 }}
      >
        <div className={styles.icon}>🔬</div>
        <div className={styles.label}>{info.title}</div>
        <div className={styles.description}>{info.description}</div>
        <div className={styles.note}>[Lottie Animation Placeholder]</div>
      </div>
    </div>
  );
});
