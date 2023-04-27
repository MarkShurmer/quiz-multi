import { atom, selector } from 'recoil';
import { Game, GameState, GameStatus } from './state-types';
import { getApiUrl } from '../api/api-fetcher';

export const questionsSelector = selector<Game>({
  key: 'questions',
  get: async () => {
    const resp = await fetch(getApiUrl());
    if (resp.ok) {
      return await resp.json();
    }

    return null;
  },
});

export const gameAtom = atom<GameState>({
  key: 'game',
  default: {
    answers: [],
    status: GameStatus.NotStarted,
    currentRound: 0,
    currentQuestion: 0,
    currentActivity: 0,
  },
});
