/**
 * SegmentRenderer - Selects and renders active segments.
 *
 * Responsibilities:
 * - Determines which segments are active based on progress
 * - Computes entry/exit pose for each active segment
 * - Renders appropriate component for each segment
 *
 * Reference: Component Inventory §4, Scroll Logic Contract §4
 */

import { memo, useMemo } from 'react';
import { getActiveSegments } from '../../data/narrativeRegistry';
import { rangeT, smoothstep } from '../../utils/scrollMath';
import type { Segment, ActiveSegment, ElementPose } from '../../types';
import { SegmentWrapper } from './SegmentWrapper';

// Import all foreground components
import { FloatingYearText } from '../foreground/FloatingYearText';
import { QuoteCard } from '../foreground/QuoteCard';
import { SectionTitle } from '../foreground/SectionTitle';
import { DefinitionCard } from '../foreground/DefinitionCard';
import { FooterThankYou } from '../foreground/FooterThankYou';
import { CostTimelineChart } from '../foreground/CostTimelineChart';
import { ComputeCostTable } from '../foreground/ComputeCostTable';
import { CapexComparisonTable } from '../foreground/CapexComparisonTable';
import { TechUtopiaOverlay } from '../foreground/TechUtopiaOverlay';
import { LottieGroup } from '../foreground/LottieGroup';
import { OrdersOfMagnitudeDemo } from '../foreground/OrdersOfMagnitudeDemo';
import { BulletRevealList } from '../foreground/BulletRevealList';

/**
 * Component registry mapping component names to implementations.
 */
const componentRegistry: Record<string, React.ComponentType<{ pose: ElementPose; props?: Record<string, unknown> }>> = {
  FloatingYearText,
  QuoteCard,
  SectionTitle,
  DefinitionCard,
  FooterThankYou,
  CostTimelineChart,
  ComputeCostTable,
  CapexComparisonTable,
  TechUtopiaOverlay,
  LottieGroup,
  OrdersOfMagnitudeDemo,
  BulletRevealList,
};

interface SegmentRendererProps {
  progress: number;
}

/**
 * Compute pose for a segment based on current progress.
 *
 * Reference: Scroll Logic Contract §4.2
 */
function computePose(segment: Segment, p: number): ElementPose {
  const tEnter = rangeT(segment.start, segment.enterEnd, p);
  const tExit = rangeT(segment.exitStart, segment.end, p);

  // Standard envelope: fade in during entry, fade out during exit
  const enterOpacity = smoothstep(0, 1, tEnter);
  const exitOpacity = 1 - smoothstep(0, 1, tExit);
  const opacity = enterOpacity * exitOpacity;

  // Y offset for subtle slide effect
  const enterY = (1 - tEnter) * 30;
  const exitY = tExit * -30;
  const y = enterY + exitY;

  // Scale for subtle pop effect
  const enterScale = 0.95 + tEnter * 0.05;
  const exitScale = 1 - tExit * 0.05;
  const scale = enterScale * exitScale;

  // Draw progress for charts (0 to 1 during entry phase)
  const draw = tEnter;

  return {
    opacity,
    y,
    scale,
    draw,
  };
}

/**
 * SegmentRenderer component.
 */
export const SegmentRenderer = memo(function SegmentRenderer({
  progress,
}: SegmentRendererProps) {
  // Get active segments for current progress
  const activeSegments = useMemo(
    () => getActiveSegments(progress),
    [progress]
  );

  // Compute poses for all active segments
  const segmentsWithPose: ActiveSegment[] = useMemo(
    () =>
      activeSegments.map((segment) => {
        const pose = computePose(segment, progress);
        return {
          ...segment,
          tEnter: rangeT(segment.start, segment.enterEnd, progress),
          tExit: rangeT(segment.exitStart, segment.end, progress),
          opacity: pose.opacity,
        };
      }),
    [activeSegments, progress]
  );

  return (
    <>
      {segmentsWithPose.map((segment) => {
        const Component = componentRegistry[segment.component];
        if (!Component) {
          console.warn(`Unknown component: ${segment.component}`);
          return null;
        }

        const pose = computePose(segment, progress);

        return (
          <SegmentWrapper key={segment.id} pose={pose}>
            <Component pose={pose} props={segment.props} />
          </SegmentWrapper>
        );
      })}
    </>
  );
});
