export type Answer = {
  round: number;
  question: number;
  answer: boolean;
};

export enum ActivityType {
  Flow,
  Rounds,
}

export enum GameStatus {
  NotStarted,
  InFlowActivity,
  InRoundsActivity,
  ShowEndOfRound,
  ShowResults,
  ShowHome,
}

export type GameCurrents = {
  currentRound: number;
  currentQuestion: number;
  currentActivity: Activity | null;
};

export type FlowActivity = {
  type: ActivityType.Flow;
  name: string;
  questions: Array<Question>;
};

export type RoundsActivity = {
  type: ActivityType.Rounds;
  name: string;
  rounds: Array<Round>;
};

export type Activity = FlowActivity | RoundsActivity;

export type Question = {
  text: string;
  num: number;
};

export type Round = {
  name: string;
  num: number;
  questions: Array<Question>;
};

export type GameInfo = {
  name: string;
  activities: Array<FlowActivity | RoundsActivity>;
};
