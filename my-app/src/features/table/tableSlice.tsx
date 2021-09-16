import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { getRandomNumber, getActiveNumbersCount, generateNewExpression } from '../../lib/functions';
import { dialog } from '../../lib/lexicons';

const initialState: {
    activeNumbers: {
        [key: string]: boolean
    },
    expressionItem1: number,
    expressionItem2: number,
    dialog: string,
} = {
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
    expressionItem1: getRandomNumber(2,9),
    expressionItem2: getRandomNumber(2,9),
    dialog: dialog.pushForNewAnswer,
}

export const TableSlice = createSlice ({
    name: 'table',
    initialState,
    reducers: {
        numberOn: (state:any, action:any) => {
            let activeNumberCount:number = getActiveNumbersCount(state);
            if(state.activeNumbers[action.payload]){
                if (activeNumberCount !== 1){
                    state.activeNumbers[action.payload] = !state.activeNumbers[action.payload];
                    state.dialog = dialog.pushForNewAnswer;
                }else{
                    state.dialog = dialog.needOneMore;
                }
            }else{
                state.activeNumbers[action.payload] = !state.activeNumbers[action.payload];
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
            const [newNumber1, newNumber2] = generateNewExpression(state);
            state.expressionItem1 = newNumber1;
            state.expressionItem2 = newNumber2;
        },
        newExpression: (state) => {
            const [newNumber1, newNumber2] = generateNewExpression(state);

            state.expressionItem1 = newNumber1;
            state.expressionItem2 = newNumber2;
            state.dialog = dialog.pushForNewAnswer;
        }
    }
})

export const getActiveNumbers = (state:any) => state.table.activeNumbers;
export const expItem1 = (state:any) => state.table.expressionItem1;
export const expItem2 = (state:any) => state.table.expressionItem2;
export const getDialog = (state:any) => state.table.dialog;

export const {numberOn, badAnswer, goodAnswer, newExpression} = TableSlice.actions;
export default TableSlice.reducer;