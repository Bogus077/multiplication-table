import React from 'react';
import NumbersRow from './numbersRow/numbersRow';
import styles from './table.module.css';

export default function Table() {

    return(
        <div className={styles.screen}>
            <NumbersRow/>
        </div>
    );
}