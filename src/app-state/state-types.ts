export type Answer = {
  round: number;
  question: number;
  answer: boolean;
};

export enum ActivityType {
  Flow,
  Wait,
}

export type ActivityAnswers = {
  activity: number;
  answers: Array<Answer>;
};

export enum GameStatus {
  NotStarted,
  InFlowActivity,
  InWaitActivity,
  ShowResults,
  ShowHome,
}

export type GameState = {
  status: GameStatus;
  answers: Array<ActivityAnswers>;
  currentRound: number;
  currentQuestion: number;
  currentActivity: Activity;
};

export type Question = {
  is_correct: boolean;
  stimulus: string;
  order: number;
  feedback: string;
};

export type Round = {
  round_title: string;
  order: number;
  questions: Array<Question>;
};

export type Activity =
  | {
      order: 1;
      activity_name: string;
      questions: Array<Question>;
    }
  | {
      order: 2;
      activity_name: string;
      questions: Array<Round>;
    };

export type Game = {
  name: string;
  heading: string;
  activities: Array<Activity>;
};
