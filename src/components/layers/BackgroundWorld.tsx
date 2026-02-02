/**
 * BackgroundWorld - Layer 1: Persistent Background World.
 *
 * A single pastoral scene rendered once and never replaced.
 * Evolves only through scroll-mapped atmosphere and parallax.
 *
 * Contractual Rules:
 * - Exists for the entire duration of the presentation
 * - Is initialized exactly once
 * - Is never removed, reset, or swapped
 * - Does not scroll with content
 * - Does not react to foreground elements
 *
 * Reference: Visual System Contract §Layer 1, Component Inventory §2.1
 */

import { memo } from 'react';
import { useScrollState } from '../../context/ScrollStateContext';
import { AtmosphereController } from './AtmosphereController';
import styles from './BackgroundWorld.module.css';

/**
 * BackgroundWorld component.
 * Memoized to prevent unnecessary re-renders.
 * Atmosphere effects are applied via AtmosphereController.
 */
export const BackgroundWorld = memo(function BackgroundWorld() {
  const { alt, fog, cloud, diffuse } = useScrollState();

  // Compute color temperature shift based on altitude
  // Early: warm (hue-rotate 0), Late: cool (hue-rotate toward blue)
  const colorTemperature = diffuse * -15; // degrees

  // Compute saturation reduction with altitude
  const saturation = 1 - (diffuse * 0.3);

  return (
    <div className={styles.container}>
      {/* Base pastoral scene (placeholder) */}
      <div
        className={styles.scene}
        style={{
          filter: `
            hue-rotate(${colorTemperature}deg)
            saturate(${saturation})
          `,
        }}
      >
        {/* Sky gradient */}
        <div className={styles.sky} />

        {/* Distant hills - furthest parallax layer */}
        <div
          className={styles.hillsFar}
          style={{ transform: `translateY(${alt * -20}px)` }}
        />

        {/* Mid hills - medium parallax */}
        <div
          className={styles.hillsMid}
          style={{ transform: `translateY(${alt * -10}px)` }}
        />

        {/* Near hills and ground - slight parallax */}
        <div
          className={styles.hillsNear}
          style={{ transform: `translateY(${alt * -5}px)` }}
        />

        {/* Cottage and farmland details */}
        <div className={styles.farmland}>
          <div className={styles.cottage} />
          <div className={styles.fields} />
        </div>
      </div>

      {/* Atmosphere overlay (fog, clouds) */}
      <AtmosphereController fog={fog} cloud={cloud} diffuse={diffuse} />
    </div>
  );
});
