/**
 * AtmosphereController - Maps altitude to fog, clouds, diffusion.
 *
 * Affects Background and Beanstalk only.
 * MUST NEVER affect narrative foreground legibility.
 *
 * Reference: Visual System Contract §Atmosphere, Scroll Logic Contract §2.3
 */

import { memo } from 'react';
import styles from './AtmosphereController.module.css';

interface AtmosphereControllerProps {
  /** Fog density [0, 1] */
  fog: number;
  /** Cloud intrusion [0, 1] */
  cloud: number;
  /** Light diffusion [0, 1] */
  diffuse: number;
}

/**
 * AtmosphereController component.
 * Renders fog and cloud overlays that affect only the background layer.
 */
export const AtmosphereController = memo(function AtmosphereController({
  fog,
  cloud,
  diffuse,
}: AtmosphereControllerProps) {
  return (
    <div className={styles.container}>
      {/* Fog layer - rises from bottom */}
      <div
        className={styles.fog}
        style={{
          opacity: fog * 0.7,
          transform: `translateY(${(1 - fog) * 30}%)`,
        }}
      />

      {/* Cloud layer - descends from top */}
      <div
        className={styles.clouds}
        style={{
          opacity: cloud * 0.6,
          transform: `translateY(${(1 - cloud) * -20}%)`,
        }}
      />

      {/* Light diffusion - overall brightness/contrast adjustment */}
      <div
        className={styles.diffusion}
        style={{
          opacity: diffuse * 0.3,
        }}
      />
    </div>
  );
});
