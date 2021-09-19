import React from 'react';
import { getDialog } from '../table/tableSlice';
import { useSelector } from 'react-redux';

import styles from './dialog.module.css';

export default function Dialog() {
  const dialog = useSelector(getDialog);

  return <div className={styles.dialog}>{dialog}</div>;
}
