import { steps } from '../lib/constants';
import { stepsType } from '../lib/interfaces';

// export default function getStepsFromApi(): any {
//   setTimeout(() => {
//     return 'ok';
//   }, 1000);
// }

export const getStepsFromApi = () : Promise<stepsType> => new Promise((resolve) => {
  setTimeout(() => resolve(steps), 1000);
});
