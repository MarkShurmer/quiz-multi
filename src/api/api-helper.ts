import { ActivityType, FlowActivity, GameInfo, Question, Round, RoundsActivity } from '../app-state/state-types';
import { API_URL_DEV, API_URL } from './api-constants';
import * as apiContracts from './api-types';

const urlMap: Record<string, string> = {
  development: API_URL_DEV,
  production: API_URL,
  test: API_URL_DEV,
};

export function getApiUrl() {
  return urlMap[process.env.NODE_ENV ?? 'development'];
}

export function getActivityType(activity: apiContracts.Activity) {
  // work out from structure
  const firstQuestion = activity.questions[0];
  if (Object.getOwnPropertyDescriptor(firstQuestion, 'round_title')) {
    // if it contains rounds, it must be a rounds type
    return ActivityType.Rounds;
  }

  return ActivityType.Flow;
}

function getQuestions(apiQuestions: Array<apiContracts.Question>): Array<Question> {
  return apiQuestions.map((question) => ({
    num: question.order,
    text: question.stimulus,
  }));
}

function getRounds(apiRounds: Array<apiContracts.Round>): Array<Round> {
  return apiRounds.map((round) => ({
    num: round.order,
    name: round.round_title,
    questions: getQuestions(round.questions),
  }));
}

export function convertToGameInfo(gameInfo: apiContracts.Game): GameInfo {
  const result: GameInfo = { name: gameInfo.name, activities: [] };

  result.activities = gameInfo.activities.map((act) => {
    const activityType = getActivityType(act);

    // get the hierarchy correct for each type
    const res =
      activityType === ActivityType.Flow
        ? ({
            type: ActivityType.Flow,
            questions: getQuestions(act.questions as Array<apiContracts.Question>),
          } as FlowActivity)
        : ({
            type: ActivityType.Rounds,
            rounds: getRounds(act.questions as Array<apiContracts.Round>),
          } as RoundsActivity);

    res.name = act.activity_name;
    res.activityNumber = act.order;

    return res;
  });

  // make sure they are sorted correctly
  result.activities.sort((lhs, rhs) => lhs.activityNumber - rhs.activityNumber);
  return result;
}
