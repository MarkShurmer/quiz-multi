import { atom } from 'recoil';
import { Activity, ActivityType, Answer, GameStep, StepType } from './state-types';

// export const gameInfoSelector = selector<GameInfo>({
//   key: 'game-info',
//   get: async () => {
//     return convertToGameInfo(await getGameData());
//   },
// });

export const gameStatusAtom = atom<GameStep>({
    key: 'game-status',
    default: {
        stepNumber: 0,
        stepType: StepType.Start,
        activityNumber: 0,
        activityType: ActivityType.Flow,
        round: 0,
        question: 0,
    },
});

export const gameActivityAtom = atom<Activity>({
    key: 'game-activity',
    default: { activityNumber: 0, name: '', type: ActivityType.Flow, questions: [] },
});

export const gameAnswersAtom = atom<Array<Answer>>({
    key: 'game-answers',
    default: [],
});
