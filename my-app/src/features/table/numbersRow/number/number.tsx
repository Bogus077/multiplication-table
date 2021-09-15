import React from "react";
import styles from './number.module.css';
import classNames from 'classnames/bind';

export default function Number (props: any) {

    let cx = classNames.bind(styles);
    let numberClass = cx({
        'number': true,
        'number_active': false
    });
    
    return(
        <div className={numberClass}>
            {props.number}
        </div>
    );
}