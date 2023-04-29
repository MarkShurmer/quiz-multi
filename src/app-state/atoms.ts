import { atom, selector } from 'recoil';
import { Answer, GameCurrents, GameInfo, GameStatus } from './state-types';
import { getGameData } from '../api/api-fetch';
import { convertToGameInfo } from '../api/api-helper';

export const gameInfoSelector = selector<GameInfo>({
  key: 'game-info',
  get: async () => {
    return convertToGameInfo(await getGameData());
  },
});

export const gameStatusAtom = atom<GameStatus>({
  key: 'game-status',
  default: GameStatus.NotStarted,
});

export const gameAnswersAtom = atom<Array<Answer>>({
  key: 'game-answers',
  default: [],
});

export const gameCurrentsAtom = atom<GameCurrents>({
  key: 'game-currents',
  default: { currentQuestion: 0, currentRound: 0, currentActivity: null },
});

// export const gameAtom = atom<GameState>({
//   key: 'game',
//   default: {
//     answers: [],
//     status: GameStatus.NotStarted,
//     currentRound: 0,
//     currentQuestion: 0,
//     currentActivity: null,
//   },
// });
