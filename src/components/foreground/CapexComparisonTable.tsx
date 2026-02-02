/**
 * CapexComparisonTable - Displays capital expenditure comparisons.
 *
 * Reference: Component Inventory §3 - Data Visualization
 */

import { memo } from 'react';
import type { ElementPose } from '../../types';
import styles from './CapexComparisonTable.module.css';

interface CapexComparisonTableProps {
  pose: ElementPose;
  props?: {
    type?: 'roadmap' | 'highlight' | 'capex_gdp';
  };
}

const roadmapData = [
  { year: 2022, compute: '10^24', investment: '$10B' },
  { year: 2024, compute: '10^25', investment: '$50B' },
  { year: 2026, compute: '10^26', investment: '$100B' },
  { year: 2028, compute: '10^27', investment: '$200B' },
  { year: 2030, compute: '10^28', investment: '$500B' },
];

const capexData = [
  { entity: 'Manhattan Project', cost: '$28B (adj.)', gdpPct: '0.4%' },
  { entity: 'Apollo Program', cost: '$280B (adj.)', gdpPct: '2.5%' },
  { entity: 'AI Training 2024', cost: '$100B', gdpPct: '0.4%' },
  { entity: 'AI Training 2030', cost: '$1T (est.)', gdpPct: '3%' },
];

export const CapexComparisonTable = memo(function CapexComparisonTable({
  pose,
  props,
}: CapexComparisonTableProps) {
  const { type = 'roadmap' } = props ?? {};
  const draw = pose.draw ?? 1;

  if (type === 'roadmap' || type === 'highlight') {
    const visibleRows = Math.ceil(roadmapData.length * draw);
    const highlightIndex = type === 'highlight' ? Math.floor(draw * 4) : -1;

    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Compute Power Roadmap</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Year</th>
              <th>FLOP Budget</th>
              <th>Investment</th>
            </tr>
          </thead>
          <tbody>
            {roadmapData.slice(0, visibleRows).map((row, index) => (
              <tr
                key={row.year}
                className={index === highlightIndex ? styles.highlighted : ''}
              >
                <td>{row.year}</td>
                <td className={styles.compute}>{row.compute}</td>
                <td className={styles.investment}>{row.investment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // capex_gdp type
  const visibleRows = Math.ceil(capexData.length * draw);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Capex vs GDP</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Project</th>
            <th>Total Cost</th>
            <th>% of GDP</th>
          </tr>
        </thead>
        <tbody>
          {capexData.slice(0, visibleRows).map((row) => (
            <tr key={row.entity}>
              <td>{row.entity}</td>
              <td className={styles.cost}>{row.cost}</td>
              <td className={styles.gdp}>{row.gdpPct}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
