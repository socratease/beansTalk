/**
 * CostTimelineChart - Displays model cost timeline.
 *
 * Reference: Component Inventory §3 - Data Visualization
 */

import { memo } from 'react';
import type { ElementPose } from '../../types';
import styles from './CostTimelineChart.module.css';

interface CostTimelineChartProps {
  pose: ElementPose;
  props?: {
    models?: string[];
  };
}

// Mock cost data for models
const modelData: Record<string, { year: number; cost: number }> = {
  'GPT-1': { year: 2018, cost: 0.01 },
  'GPT-2': { year: 2019, cost: 0.1 },
  'GPT-3': { year: 2020, cost: 1 },
  'GPT-3.5': { year: 2022, cost: 5 },
  'ChatGPT': { year: 2022, cost: 10 },
  'GPT-4': { year: 2023, cost: 50 },
  'GPT-4o': { year: 2024, cost: 100 },
  'GPT-5': { year: 2025, cost: 500 },
};

export const CostTimelineChart = memo(function CostTimelineChart({
  pose,
  props,
}: CostTimelineChartProps) {
  const { models = ['GPT-1', 'GPT-2'] } = props ?? {};
  const draw = pose.draw ?? 1;

  // Calculate which models to show based on draw progress
  const visibleCount = Math.ceil(models.length * draw);
  const visibleModels = models.slice(0, visibleCount);

  // Find max cost for scaling
  const maxCost = Math.max(
    ...models.map((m) => modelData[m]?.cost ?? 0),
    1
  );

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Training Cost (Millions $)</h3>
      <div className={styles.chart}>
        {visibleModels.map((model, index) => {
          const data = modelData[model];
          if (!data) return null;

          const height = (Math.log10(data.cost + 1) / Math.log10(maxCost + 1)) * 100;
          const isLast = index === visibleModels.length - 1;
          const barDraw = isLast ? (draw * models.length) % 1 || 1 : 1;

          return (
            <div key={model} className={styles.barGroup}>
              <div
                className={styles.bar}
                style={{
                  height: `${height * barDraw}%`,
                  opacity: isLast ? 0.5 + barDraw * 0.5 : 1,
                }}
              />
              <span className={styles.label}>{model}</span>
              <span className={styles.cost}>${data.cost}M</span>
            </div>
          );
        })}
      </div>
    </div>
  );
});
