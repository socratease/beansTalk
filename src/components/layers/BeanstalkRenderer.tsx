/**
 * BeanstalkRenderer - SVG/DOM implementation of beanstalk growth.
 *
 * Rendering contract:
 * - Visible extent is a deterministic function of growth scalar g
 * - No time-based easing; all easing is a function of scroll progress
 * - Anchored to bottom-left of container
 *
 * Reference: Scroll Logic Contract §3.4
 */

import { memo, useMemo } from 'react';
import styles from './BeanstalkRenderer.module.css';

interface BeanstalkRendererProps {
  /** Growth scalar [0, 1] */
  growth: number;
}

/**
 * Generate SVG path for a curving beanstalk vine.
 * The path grows from bottom to top based on growth scalar.
 */
function generateBeanstalkPath(growth: number, height: number, width: number): string {
  if (growth <= 0) return '';

  const maxHeight = height * 0.95;
  const currentHeight = maxHeight * growth;

  // Base position (bottom center of container)
  const startX = width * 0.6;
  const startY = height;

  // Generate a winding path upward
  const segments: string[] = [`M ${startX} ${startY}`];

  const numCurves = Math.ceil(growth * 8);
  const segmentHeight = currentHeight / Math.max(numCurves, 1);

  let currentY = startY;
  let currentX = startX;

  for (let i = 0; i < numCurves; i++) {
    const direction = i % 2 === 0 ? 1 : -1;
    const amplitude = width * 0.15 * (1 - i / (numCurves + 2));

    const nextY = currentY - segmentHeight;
    const nextX = startX + direction * amplitude * 0.5;

    const cp1X = currentX + direction * amplitude;
    const cp1Y = currentY - segmentHeight * 0.3;
    const cp2X = nextX + direction * amplitude * 0.5;
    const cp2Y = nextY + segmentHeight * 0.3;

    segments.push(`C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${nextX} ${nextY}`);

    currentY = nextY;
    currentX = nextX;
  }

  return segments.join(' ');
}

/**
 * Generate leaf positions along the beanstalk.
 */
function generateLeaves(growth: number, height: number, width: number): Array<{
  x: number;
  y: number;
  rotation: number;
  scale: number;
}> {
  if (growth <= 0) return [];

  const leaves: Array<{ x: number; y: number; rotation: number; scale: number }> = [];
  const maxHeight = height * 0.95;
  const currentHeight = maxHeight * growth;
  const numLeaves = Math.floor(growth * 12);

  const startX = width * 0.6;
  const startY = height;

  for (let i = 0; i < numLeaves; i++) {
    const t = (i + 1) / (numLeaves + 1);
    const y = startY - currentHeight * t;

    // Offset x based on curve pattern
    const direction = Math.floor(i / 2) % 2 === 0 ? 1 : -1;
    const amplitude = width * 0.1 * (1 - t * 0.5);
    const x = startX + direction * amplitude;

    leaves.push({
      x,
      y,
      rotation: direction * (30 + Math.random() * 20),
      scale: 0.5 + t * 0.5,
    });
  }

  return leaves;
}

/**
 * BeanstalkRenderer component.
 * Uses SVG for the main vine and positioned divs for leaves.
 */
export const BeanstalkRenderer = memo(function BeanstalkRenderer({
  growth,
}: BeanstalkRendererProps) {
  // Use fixed dimensions for consistent rendering
  const width = 300;
  const height = 1000;

  const path = useMemo(
    () => generateBeanstalkPath(growth, height, width),
    [growth, height, width]
  );

  const leaves = useMemo(
    () => generateLeaves(growth, height, width),
    [growth, height, width]
  );

  // Compute stroke dasharray for growth animation
  const pathLength = 2000; // Approximate max path length
  const visibleLength = pathLength * growth;

  return (
    <div className={styles.container}>
      {/* SVG vine */}
      <svg
        className={styles.svg}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="vineGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#2d5a27" />
            <stop offset="50%" stopColor="#3d7a37" />
            <stop offset="100%" stopColor="#4a9a47" />
          </linearGradient>
        </defs>

        {/* Main vine path */}
        <path
          d={path}
          fill="none"
          stroke="url(#vineGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength - visibleLength}
          className={styles.vine}
        />

        {/* Secondary thinner vine */}
        <path
          d={path}
          fill="none"
          stroke="#4a9a47"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={pathLength}
          strokeDashoffset={pathLength - visibleLength}
          opacity="0.5"
        />
      </svg>

      {/* Leaves */}
      <div className={styles.leaves}>
        {leaves.map((leaf, index) => (
          <div
            key={index}
            className={styles.leaf}
            style={{
              left: `${(leaf.x / width) * 100}%`,
              bottom: `${((height - leaf.y) / height) * 100}%`,
              transform: `rotate(${leaf.rotation}deg) scale(${leaf.scale})`,
            }}
          />
        ))}
      </div>
    </div>
  );
});
