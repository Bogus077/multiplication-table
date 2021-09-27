import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { getSteps } from '../table/tableSlice';
import { countDoneSteps } from '../../lib/functions';
import styles from './summary.module.css';

export default function Summary(): ReactElement {
    const steps = useSelector(getSteps);
    const stepsDone = countDoneSteps(steps);
    
    return(
        <>
            <div className={styles.summary__header}>
                Твой результат: {stepsDone} из {steps.length}
            </div>
        </>
    );
}
