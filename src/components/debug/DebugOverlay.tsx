/**
 * DebugOverlay - Development debugging information.
 *
 * Shows current scroll progress and derived state values.
 * Can be toggled with 'd' key or hidden in production.
 */

import { memo, useState, useEffect } from 'react';
import { useScrollState } from '../../context/ScrollStateContext';
import styles from './DebugOverlay.module.css';

export const DebugOverlay = memo(function DebugOverlay() {
  const [visible, setVisible] = useState(true);
  const state = useScrollState();

  // Toggle with 'd' key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'd' && !e.ctrlKey && !e.metaKey) {
        setVisible((v) => !v);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.title}>Debug (press 'd' to toggle)</div>
      <div className={styles.row}>
        <span className={styles.label}>Progress (p):</span>
        <span className={styles.value}>{state.p.toFixed(4)}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Altitude:</span>
        <span className={styles.value}>{state.alt.toFixed(4)}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Fog:</span>
        <span className={styles.value}>{state.fog.toFixed(4)}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Cloud:</span>
        <span className={styles.value}>{state.cloud.toFixed(4)}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Diffuse:</span>
        <span className={styles.value}>{state.diffuse.toFixed(4)}</span>
      </div>
      <div className={styles.divider} />
      <div className={styles.row}>
        <span className={styles.label}>Beanstalk:</span>
        <span className={styles.value}>
          {state.beanstalk.exists ? 'Yes' : 'No'}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Growth (g):</span>
        <span className={styles.value}>
          {state.beanstalk.g.toFixed(4)}
        </span>
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${state.p * 100}%` }}
        />
      </div>
    </div>
  );
});
