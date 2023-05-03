import { atom, selector } from 'recoil';
import { Activity, ActivityType, Answer, GameInfo, GameStep, StepType } from './state-types';
import { getGameInfo } from './game-info';

export const gameInfoSelector = selector<GameInfo>({
    key: 'game-info',
    get: async () => {
        return getGameInfo();
    },
});

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
