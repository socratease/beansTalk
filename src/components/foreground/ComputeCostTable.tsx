/**
 * ComputeCostTable - Displays compute cost growth table.
 *
 * Reference: Component Inventory §3 - Data Visualization
 */

import { memo } from 'react';
import type { ElementPose } from '../../types';
import styles from './ComputeCostTable.module.css';

interface ComputeCostTableProps {
  pose: ElementPose;
  props?: {
    startModel?: string;
    endModel?: string;
  };
}

const tableData = [
  { model: 'GPT-2', year: 2019, compute: '1x', cost: '$50K' },
  { model: 'GPT-3', year: 2020, compute: '100x', cost: '$5M' },
  { model: 'GPT-4', year: 2023, compute: '10,000x', cost: '$100M+' },
];

export const ComputeCostTable = memo(function ComputeCostTable({
  pose,
}: ComputeCostTableProps) {
  const draw = pose.draw ?? 1;
  const visibleRows = Math.ceil(tableData.length * draw);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Compute Cost Growth</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Model</th>
            <th>Year</th>
            <th>Relative Compute</th>
            <th>Est. Cost</th>
          </tr>
        </thead>
        <tbody>
          {tableData.slice(0, visibleRows).map((row, index) => (
            <tr
              key={row.model}
              style={{
                opacity: index === visibleRows - 1 ? draw * tableData.length % 1 || 1 : 1,
              }}
            >
              <td>{row.model}</td>
              <td>{row.year}</td>
              <td className={styles.compute}>{row.compute}</td>
              <td className={styles.cost}>{row.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
