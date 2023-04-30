import {
  Activity,
  ActivityType,
  FlowActivity,
  GameCurrents,
  GameStatus,
  Question,
  Round,
  RoundsActivity,
} from './state-types';

// const numberMap: Record<number, string> = {
//   1: 'One',
//   2: 'Two',
//   3: 'Three',
//   4: 'Four',
//   5: 'Five',
// };

export function getActivityTypeGameStatus(activity: Activity) {
  return activity.type === ActivityType.Flow ? GameStatus.InFlowActivity : GameStatus.InRoundsActivity;
}

export function getQuestionText(activity: Activity, questionNumber: number, roundNumber = 0) {
  let question: Question;

  if (activity.type === ActivityType.Flow) {
    question = activity.questions[questionNumber - 1] as Question;
  } else {
    question = (activity.rounds[roundNumber - 1] as Round).questions[questionNumber - 1];
  }

  return applyTextStyling(question.text);
}

// export function getNumberAsText(num: number) {
//   return numberMap[num];
// }

export function getNextFlowQuestion(currentQuestion: number, currentActivity: FlowActivity) {
  // flows through, so just try to get next question
  if (currentQuestion < currentActivity.questions.length) {
    return currentQuestion + 1;
  }

  return 0; // we're done
}

export function getNextRoundsQuestion(
  currentQuestion: number,
  currentActivity: RoundsActivity,
  currentRound: number
): [number, GameStatus] {
  // check for rounds
  if (currentQuestion < (currentActivity.rounds[currentRound - 1] as Round).questions.length) {
    return [currentQuestion + 1, GameStatus.InRoundsActivity];
  }

  // we've reached end of the round
  return [0, GameStatus.ShowEndOfRound];
}

export function generateAnswer(gameCurrents: GameCurrents, isCorrect: boolean) {
  return {
    answer: isCorrect,
    question: gameCurrents.currentQuestion,
    round: gameCurrents.currentRound,
  };
}

export function applyTextStyling(textToChange: string) {
  // we'll keep it simple, as theres only ever one section of text to be boldened

  return textToChange.replace('*', '<b>').replace('*', '</b>');
}
