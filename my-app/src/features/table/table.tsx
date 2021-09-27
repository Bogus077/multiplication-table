import React, { ReactElement } from 'react';
import ProgressBar from '../progressBar/progressBar';
import NumbersRow from './numbersRow/numbersRow';
import Expression from '../expression/expression';
import Answers from '../answer/answer';
import Dialog from '../dialog/dialog';
import StartScreen from '../startScreen/startScreen';
import Button from '../ui/button/button';
import Summary from '../summary/summary';
import { useSelector, useDispatch } from 'react-redux';
import { getSteps, setSteps } from './tableSlice';
import { steps } from '../../lib/constants';

import styles from './table.module.css';

export default function Table() : ReactElement {
  const dispatch = useDispatch();
  const currentSteps = useSelector(getSteps);
  const onStartClick = () => {
    dispatch(setSteps(steps));
  };
  const isAllDone = currentSteps[currentSteps.length - 1]?.status === 'done' || currentSteps[currentSteps.length - 1]?.status === 'fail';

  if (isAllDone){
    return(
      <div className={styles.screen}>
        <Summary/>
        <Button text={'Начать заново'} onClickFunction={() => onStartClick()}/>
      </div>
    );
  }else if (currentSteps.length === 0){
    return(
      <div className={styles.screen}>
        <StartScreen/>
        <NumbersRow />
        <Button text={'Начать'} onClickFunction={() => onStartClick()}/>
      </div>
    );
  }else{
    return (
      <div className={styles.screen}>
        <ProgressBar/>
        <Expression />
        <Answers />
        <Dialog />
      </div>
    );
  }  
}
