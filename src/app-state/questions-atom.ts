import { atom } from 'recoil';
import { Game } from './state-types';

export const questionsState = atom<Game>({
  key: 'questions',
});
