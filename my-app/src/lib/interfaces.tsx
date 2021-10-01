export type stepsType = Array<{ [key: string]: string }>;

export interface stateTypes {
  steps: stepsType;
  activeNumbers: {
    [key: string]: boolean;
  };
  expressionItem1: number;
  expressionItem2: number;
  lastItem: number;
  dialog: string;
  loading: boolean;
}
