/**
 * Beanstalk - Layer 2: Emergent Progress Structure.
 *
 * Lifecycle:
 * - Does not exist initially
 * - Appears at BEAN_INTRO_P (2023 moment)
 * - Once introduced: never disappears, never shrinks, never resets
 *
 * Growth is a continuous, monotonic function of scroll progress.
 *
 * Reference: Visual System Contract §Layer 2, Scroll Logic Contract §3
 */

import { memo } from 'react';
import { useBeanstalkState, useAtmosphereState } from '../../context/ScrollStateContext';
import { BeanstalkRenderer } from './BeanstalkRenderer';
import styles from './Beanstalk.module.css';

/**
 * Beanstalk component.
 * Conditionally renders based on existence state.
 * Growth is passed to BeanstalkRenderer for visualization.
 */
export const Beanstalk = memo(function Beanstalk() {
  const { exists, g } = useBeanstalkState();
  const { fog, cloud } = useAtmosphereState();

  // Do not render if beanstalk does not exist yet
  if (!exists) {
    return null;
  }

  // Compute atmosphere effects on beanstalk
  // Beanstalk is affected by fog/cloud but less than background
  const atmosphereOpacity = 1 - (fog * 0.3 + cloud * 0.2);

  return (
    <div
      className={styles.container}
      style={{
        opacity: atmosphereOpacity,
      }}
    >
      <BeanstalkRenderer growth={g} />
    </div>
  );
});
