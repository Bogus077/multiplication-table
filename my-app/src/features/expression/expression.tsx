import React from "react";
import { useSelector } from "react-redux";
import styles from './expression.module.css';
import { expItem1, expItem2 } from "../table/tableSlice";

export default function Expression() {
    const number1 = useSelector(expItem1);
    const number2 = useSelector(expItem2);

    return (
        <div className={styles.expression}>
            <div className={styles.expression__item + ' ' + styles.expression__item_active}>{number1}</div>
            <div className={styles.expression__item}>x</div>
            <div className={styles.expression__item}>{number2}</div>
        </div>
    );
}