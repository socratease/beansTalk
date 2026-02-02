/**
 * OrdersOfMagnitudeDemo - Visual demonstration of scale.
 *
 * Shows escalating circles/cookies to demonstrate orders of magnitude.
 *
 * Reference: Component Inventory §3 - Conceptual Demos
 */

import { memo } from 'react';
import type { ElementPose } from '../../types';
import styles from './OrdersOfMagnitudeDemo.module.css';

interface OrdersOfMagnitudeDemoProps {
  pose: ElementPose;
  props?: Record<string, unknown>;
}

const magnitudes = [
  { label: '1', size: 10 },
  { label: '10', size: 20 },
  { label: '100', size: 35 },
  { label: '1,000', size: 55 },
  { label: '10,000', size: 80 },
  { label: '100,000', size: 110 },
];

export const OrdersOfMagnitudeDemo = memo(function OrdersOfMagnitudeDemo({
  pose,
}: OrdersOfMagnitudeDemoProps) {
  const draw = pose.draw ?? 1;
  const visibleCount = Math.ceil(magnitudes.length * draw);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Orders of Magnitude</h3>
      <div className={styles.circles}>
        {magnitudes.slice(0, visibleCount).map((mag, index) => {
          const isLast = index === visibleCount - 1;
          const localDraw = isLast ? (draw * magnitudes.length) % 1 || 1 : 1;
          const size = mag.size * localDraw;

          return (
            <div key={mag.label} className={styles.item}>
              <div
                className={styles.circle}
                style={{
                  width: size,
                  height: size,
                  opacity: isLast ? 0.5 + localDraw * 0.5 : 1,
                }}
              />
              <span className={styles.label}>{mag.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
});
