import React, { ReactElement } from 'react';
import styles from './loading.module.css';

export default function Loading(): ReactElement {
  return <div className={styles.loading}>LOADING...</div>;
}
