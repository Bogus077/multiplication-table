import { stateTypes, stepsType } from './interfaces';

export const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

export const getActiveNumbersCount = (state: stateTypes): number => {
  let activeNumberCount = 0;

  for (const key in state.activeNumbers) {
    if (state.activeNumbers[key]) {
      activeNumberCount++;
    }
  }

  return activeNumberCount;
};

export const generateNewExpression = (state: stateTypes): Array<number> => {
  let newNumber1: number;
  let newNumber2: number;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    newNumber1 = getRandomNumber(2, 9);
    if (state.activeNumbers[newNumber1]) {
      break;
    }
  }

  // eslint-disable-next-line no-constant-condition
  while (true) {
    newNumber2 = getRandomNumber(2, 9);
    if (+state.lastItem !== +newNumber2) {
      break;
    }
  }

  return [newNumber1, newNumber2];
};

export const createAnswers = (answerRight: number): Array<number> => {
  const answersSet: Set<number> = new Set();
  answersSet.add(answerRight);

  for (let i = 0; i < 3; ) {
    const newNumber = getRandomNumber(2, 9);
    const newNumber2 = getRandomNumber(2, 9);

    if (!answersSet.has(newNumber * newNumber2)) {
      i++;
    }
    answersSet.add(newNumber * newNumber2);
  }

  const answers: Array<number> = [];
  answersSet.forEach((item) => answers.push(item));
  return answers.sort(compareNumbers);
};

export const compareNumbers = (a: number, b: number): number => {
  if (a > b) {
    return 1;
  } else if (a === b) {
    return 0;
  } else {
    return -1;
  }
};

export const editSteps = (steps: stepsType, status: string) : stepsType => {
  let newCurrent = false;
  const newSteps = steps.map((item: {[key:string]:string}) => {
    if(item.status == 'current'){
      newCurrent = true;
      return Object.assign({}, item, { status: status });
    }else if(newCurrent){
      newCurrent = false;
      return Object.assign({}, item, { status: 'current' });
    }
      return item;
  });
  return newSteps;
};

export const countDoneSteps = (steps: stepsType):number => {
  let stepsDone = 0;
  steps.forEach(item => {
      if(item.status === 'done'){
          stepsDone++;
      }
  });
  return stepsDone;
};