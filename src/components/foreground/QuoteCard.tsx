/**
 * QuoteCard - Displays a quote with attribution.
 *
 * Reference: Component Inventory §3 - Text
 */

import { memo } from 'react';
import type { ElementPose } from '../../types';
import styles from './QuoteCard.module.css';

interface QuoteCardProps {
  pose: ElementPose;
  props?: {
    quote?: string;
    attribution?: string;
    highlight?: boolean;
  };
}

export const QuoteCard = memo(function QuoteCard({ props }: QuoteCardProps) {
  const {
    quote = 'Placeholder quote text...',
    attribution = 'Unknown',
    highlight = false,
  } = props ?? {};

  return (
    <div className={`${styles.container} ${highlight ? styles.highlight : ''}`}>
      <blockquote className={styles.quote}>
        <span className={styles.openQuote}>"</span>
        {quote}
        <span className={styles.closeQuote}>"</span>
      </blockquote>
      <cite className={styles.attribution}>— {attribution}</cite>
    </div>
  );
});
