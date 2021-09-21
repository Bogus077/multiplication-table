import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSteps } from '../table/tableSlice';
import styles from './progressBar.module.css';
import classNames from 'classnames/bind';

export default function ProgressBar(): JSX.Element{
    const steps = useSelector(getSteps);
    const cx = classNames.bind(styles);

    return(
        <div className={styles.progressBar__wrapper}>
            {steps.map((item, i) => 
                <div key={i} className={cx({
                    progressBar__item: true,
                    progressBar__item_done: (item.status === 'done'),
                    progressBar__item_current: (item.status === 'current'),
                  })}></div>
            )}
        </div>
    );
}
