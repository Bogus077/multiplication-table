import { createSlice, current, createAsyncThunk  } from '@reduxjs/toolkit';
import {
  getRandomNumber,
  getActiveNumbersCount,
  generateNewExpression,
  editSteps,
} from '../../lib/functions';
import { getStepsFromApi } from '../../api/stepsApi';
import { dialog } from '../../lib/lexicons';
import { stateTypes, stepsType } from '../../lib/interfaces';

const initialState: stateTypes = {
  steps: [],
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
  loading: false,
};

export const getAsyncSteps: any = createAsyncThunk(
  'getAsyncSteps',
  async() => {
    const response = await getStepsFromApi();
    return response;
  }
);

export const TableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setSteps: (state, action) => {
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
      state.lastItem = state.expressionItem2;
      const [newNumber1, newNumber2] = generateNewExpression(state);
      state.expressionItem1 = newNumber1;
      state.expressionItem2 = newNumber2;

      const steps = current(state.steps);
      const newSteps = editSteps(steps, 'fail');
      state.steps = newSteps;
    },
    goodAnswer: (state) => {
      state.dialog = dialog.goodAnswer;
      state.lastItem = state.expressionItem2;
      const [newNumber1, newNumber2] = generateNewExpression(state);
      state.expressionItem1 = newNumber1;
      state.expressionItem2 = newNumber2;

      const steps = current(state.steps);
      const newSteps = editSteps(steps, 'done');
      state.steps = newSteps;
    },
    newExpression: (state) => {
      const [newNumber1, newNumber2] = generateNewExpression(state);

      state.expressionItem1 = newNumber1;
      state.expressionItem2 = newNumber2;
      state.dialog = dialog.pushForNewAnswer;
    }
  },
  extraReducers: {
    [getAsyncSteps.pending] : (state) => {
      state.loading = true;
    },
    [getAsyncSteps.fulfilled] : (state, action) => {
      state.loading = false;
      state.steps = action.payload;
    },
    [getAsyncSteps.rejected] : (state) => {
      state.loading = false;
    }
  }
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
export const checkLoading = (state: { [key: string]: stateTypes }): boolean =>
  state.table.loading;

export const { setSteps, numberOn, badAnswer, goodAnswer, newExpression } =
  TableSlice.actions;
export default TableSlice.reducer;
