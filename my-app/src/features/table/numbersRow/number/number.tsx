import React from 'react';
import styles from './number.module.css';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { numberOn, getActiveNumbers } from '../../tableSlice';

export default function Number(props: any) {
  const dispatch = useDispatch();

  const cx = classNames.bind(styles);
  const numberClass = cx({
    number: true,
    number_active: useSelector(getActiveNumbers)[props.number],
  });

  const toggleNumber = () => {
    dispatch(numberOn(props.number));
  };

  return (
    <div className={numberClass} onClick={toggleNumber}>
      {props.number}
    </div>
  );
}
