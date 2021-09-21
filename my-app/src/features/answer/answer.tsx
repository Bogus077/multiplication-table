import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { expItem1, expItem2, badAnswer, goodAnswer } from '../table/tableSlice';
import { createAnswers } from '../../lib/functions';

import styles from './answers.module.css';

export default function Answers(): JSX.Element {
  const dispatch = useDispatch();
  const number1 = useSelector(expItem1);
  const number2 = useSelector(expItem2);
  const answerRight = number1 * number2;

  const answers = createAnswers(answerRight);

  const checkAnswer = (e:any) => {
    +e.target.innerHTML === answerRight
      ? dispatch(goodAnswer())
      : dispatch(badAnswer());
  };

  return (
    <div className={styles.answers}>
      {answers.map((item, i) => (
        <AnswerItem number={item} key={i} checkFunction={checkAnswer} />
      ))}
    </div>
  );
}

function AnswerItem(props: { number: number; checkFunction:any}) {
  return (
    <div
      className={styles.answer__item}
      onClick={(e) => props.checkFunction(e)}>
      {props.number}
    </div>
  );
}