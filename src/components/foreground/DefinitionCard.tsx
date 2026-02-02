/**
 * DefinitionCard - Displays a term definition.
 *
 * Reference: Component Inventory §3 - Text
 */

import { memo } from 'react';
import type { ElementPose } from '../../types';
import styles from './DefinitionCard.module.css';

interface DefinitionCardProps {
  pose: ElementPose;
  props?: {
    title?: string;
    content?: string;
  };
}

export const DefinitionCard = memo(function DefinitionCard({
  props,
}: DefinitionCardProps) {
  const {
    title = 'Term',
    content = 'Definition placeholder...',
  } = props ?? {};

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.divider} />
      <p className={styles.content}>{content}</p>
    </div>
  );
});
