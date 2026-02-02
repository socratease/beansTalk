/**
 * FooterThankYou - Closing thank you message.
 *
 * Reference: Component Inventory §3 - Text
 */

import { memo } from 'react';
import type { ElementPose } from '../../types';
import styles from './FooterThankYou.module.css';

interface FooterThankYouProps {
  pose: ElementPose;
  props?: Record<string, unknown>;
}

export const FooterThankYou = memo(function FooterThankYou(
  _props: FooterThankYouProps
) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Thank You</h2>
      <p className={styles.subtitle}>For climbing the beanstalk with us</p>
    </div>
  );
});
