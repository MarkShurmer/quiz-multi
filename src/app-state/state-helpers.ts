import {
  Activity,
  ActivityAnswers,
  ActivityType,
  Game,
  GameState,
  GameStatus,
  Question,
  Round,
} from './state-types';

const numberMap: Record<number, string> = {
  1: 'One',
  2: 'Two',
  3: 'Three',
  4: 'Four',
  5: 'Five',
};

export function getActivityType(activity: Activity) {
  return activity.order === 1 ? ActivityType.Flow : ActivityType.Wait;
}

export function getActivityTypeByNumber(activityNumber: number) {
  return activityNumber === 1 ? ActivityType.Flow : ActivityType.Wait;
}

export function getActivityTypeGameStatus(activity: Activity) {
  return getActivityType(activity) === ActivityType.Flow
    ? GameStatus.InFlowActivity
    : GameStatus.InWaitActivity;
}

export function getQuestionText(
  activity: Activity,
  questionNumber: number,
  roundNumber = 0
) {
  let question: Question;

  if (getActivityTypeByNumber(activity.order) === ActivityType.Flow) {
    question = activity.questions[questionNumber - 1] as Question;
  } else {
    question = (activity.questions[roundNumber - 1] as Round).questions[
      questionNumber - 1
    ];
  }

  return question.stimulus;
}

export function getNumberAsText(num: number) {
  return numberMap[num];
}

export function getNextQuestion(
  currentQuestion: number,
  currentActivity: Activity,
  currentRound: number
) {
  if (getActivityTypeByNumber(currentActivity.order) === ActivityType.Flow) {
    // flows through, so just try to get next question
    if (currentQuestion < currentActivity.questions.length) {
      return currentQuestion + 1;
    } else {
      return 0; // we're done
    }
  }

  // check for rounds
  if (
    currentQuestion <
    (currentActivity.questions[currentRound] as Round).questions.length
  ) {
    return currentQuestion + 1;
  }

  // we've reached end of the round
  return 0;
}

export function generateActivityAnswer(
  gameState: GameState,
  isCorrect: boolean
) {
  // get existing answer list for activity
  let activityAnswer: ActivityAnswers | undefined = undefined;
  const existingActivityAnswer: ActivityAnswers | undefined =
    gameState.answers.find(
      (aa) => aa.activity === gameState.currentActivity.order
    );

  activityAnswer = {
    activity: gameState.currentActivity.order,
    answers: existingActivityAnswer ? [...existingActivityAnswer.answers] : [],
  };

  // add the answer
  activityAnswer.answers.push({
    answer: isCorrect,
    question: gameState.currentQuestion,
    round: gameState.currentRound,
  });

  return activityAnswer;
}

export function getNextRound(currentActivity: Activity) {}
