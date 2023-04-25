import { atom } from 'recoil';
import { ActivityState } from './state-types';

export const answerState = atom<ActivityState>({
  key: 'answers',
});
