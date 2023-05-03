import {
    ActivityBase,
    ActivityType,
    FlowActivity,
    Question,
    RoundsActivity,
    GameStep,
} from './state-types';

export function getQuestionText(activity: ActivityBase, gameStep: GameStep) {
    let question: Question;

    if (activity.type === ActivityType.Flow) {
        question = (activity as FlowActivity).questions[gameStep.question - 1] as Question;
    } else {
        question = (activity as RoundsActivity).rounds[gameStep.round - 1].questions[
            gameStep.question - 1
        ];
    }

    return applyTextStyling(question.text);
}

export function getAnswerText(answer: boolean) {
    return answer ? 'CORRECT' : 'FALSE';
}

export function generateAnswer(gameCurrents: GameStep, isCorrect: boolean) {
    return {
        answer: isCorrect,
        question: gameCurrents.question,
        round: gameCurrents.round,
    };
}

export function applyTextStyling(textToChange: string) {
    // we'll keep it simple, as theres only ever one section of text to be boldened

    return textToChange.replace('*', '<b>').replace('*', '</b>');
}
