import React from 'react';
import Number from './number/number';
import styles from './numbersRow.module.css';

export default function NumbersRow() : React.ReactElement {
  const numbers = [2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className={styles.NumbersRow}>
      {numbers.map((number) => (
        <Number key={number} number={number} />
      ))}
    </div>
  );
}
