import React from 'react';
import styles from './startScreen.module.css';

export default function StartScreen() : JSX.Element{

  return(
    <>
      <div className={styles.message}>
        Выбери числа, с которыми хочешь потренироваться
      </div>
    </>
  );
}