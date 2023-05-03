import {
    ActivityBase,
    ActivityType,
    FlowActivity,
    Question,
    RoundsActivity,
    GameStep,
} from './state-types';

// const numberMap: Record<number, string> = {
//   1: 'One',
//   2: 'Two',
//   3: 'Three',
//   4: 'Four',
//   5: 'Five',
// };

// export function getActivityTypeGameStatus(activity: Activity) {
//     return activity.type === ActivityType.Flow
//         ? StepType.InFlowActivity
//         : StepType.InRoundsActivity;
// }

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

// export function getNumberAsText(num: number) {
//   return numberMap[num];
// }

// export function getNextFlowQuestion(currentQuestion: number, currentActivity: FlowActivity) {
//     // flows through, so just try to get next question
//     if (currentQuestion < currentActivity.questions.length) {
//         return currentQuestion + 1;
//     }

//     return 0; // we're done
// }

// export function getNextRoundsQuestion(
//     currentQuestion: number,
//     currentActivity: RoundsActivity,
//     currentRound: number
// ): [number, StepType] {
//     // check for rounds
//     if (currentQuestion < (currentActivity.rounds[currentRound - 1] as Round).questions.length) {
//         return [currentQuestion + 1, StepType.InRoundsActivity];
//     }

//     // we've reached end of the round
//     return [0, StepType.EndOfRound];
// }

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
