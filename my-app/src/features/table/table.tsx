import React, { ReactElement } from 'react';
import NumbersRow from './numbersRow/numbersRow';
import Button from '../ui/button/button';
import Expression from '../expression/expression';
import Answers from '../answer/answer';
import Dialog from '../dialog/dialog';
import { useDispatch } from 'react-redux';
import { newExpression } from './tableSlice';

import styles from './table.module.css';

export default function Table() : ReactElement {
  const dispatch = useDispatch();
  const getNextExpression = () => {
    dispatch(newExpression());
  };

  return (
    <div className={styles.screen}>
      <NumbersRow />
      {/* <Button text={'Следующий пример'} onClickFunction={getNextExpression} /> */}
      <Expression />
      <Answers />
      <Dialog />
    </div>
  );
}
