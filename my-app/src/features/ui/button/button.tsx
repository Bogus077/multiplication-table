import React from 'react';
import styles from './button.module.css';

interface IPropsTypes {
    text: string;
    onClickFunction: VoidFunction;
}

export default function Button(props: IPropsTypes): JSX.Element {

    return(
        <div className={styles.button} onClick={() => props.onClickFunction()}>
            {props.text}
        </div>
    );
}
