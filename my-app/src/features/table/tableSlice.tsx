import { createSlice, current  } from '@reduxjs/toolkit';
import {
  getRandomNumber,
  getActiveNumbersCount,
  generateNewExpression,
  editSteps,
} from '../../lib/functions';
import { dialog } from '../../lib/lexicons';
import { steps } from '../../lib/constants';
import { stateTypes, stepsType } from '../../lib/interfaces';

const initialState: stateTypes = {
  steps: steps,
  activeNumbers: {
    '2': true,
    '3': true,
    '4': true,
    '5': true,
    '6': true,
    '7': true,
    '8': true,
    '9': true,
  },
  expressionItem1: getRandomNumber(2, 9),
  expressionItem2: getRandomNumber(2, 9),
  lastItem: 0,
  dialog: dialog.pushForNewAnswer,
};

export const TableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    changeStep: (state, action) => {
      state.steps = action.payload;
    },
    numberOn: (state: stateTypes, action) : void => {
      const activeNumberCount: number = getActiveNumbersCount(state);
      if (state.activeNumbers[action.payload]) {
        if (activeNumberCount !== 1) {
          state.activeNumbers[action.payload] =
            !state.activeNumbers[action.payload];
          state.dialog = dialog.pushForNewAnswer;
        } else {
          state.dialog = dialog.needOneMore;
        }
      } else {
        state.activeNumbers[action.payload] =
          !state.activeNumbers[action.payload];
        state.dialog = dialog.pushForNewAnswer;
      }

      const [newNumber1, newNumber2] = generateNewExpression(state);
      state.expressionItem1 = newNumber1;
      state.expressionItem2 = newNumber2;
    },
    badAnswer: (state) => {
      state.dialog = dialog.wrongAnswer;
    },
    goodAnswer: (state) => {
      state.dialog = dialog.goodAnswer;
      state.lastItem = state.expressionItem2;
      const [newNumber1, newNumber2] = generateNewExpression(state);
      state.expressionItem1 = newNumber1;
      state.expressionItem2 = newNumber2;

      const steps = current(state.steps);
      const newSteps = editSteps(steps);
      state.steps = newSteps;
    },
    newExpression: (state) => {
      const [newNumber1, newNumber2] = generateNewExpression(state);

      state.expressionItem1 = newNumber1;
      state.expressionItem2 = newNumber2;
      state.dialog = dialog.pushForNewAnswer;
    }
  },
});

export const getActiveNumbers = (state: {
  [key: string]: stateTypes;
}): { [key: string]: boolean } => state.table.activeNumbers;
export const expItem1 = (state: { [key: string]: stateTypes }): number =>
  state.table.expressionItem1;
export const expItem2 = (state: { [key: string]: stateTypes }): number =>
  state.table.expressionItem2;
export const getDialog = (state: { [key: string]: stateTypes }): string =>
  state.table.dialog;
export const getSteps = (state: { [key: string]: stateTypes }): stepsType =>
  state.table.steps;

export const { changeStep, numberOn, badAnswer, goodAnswer, newExpression } =
  TableSlice.actions;
export default TableSlice.reducer;
