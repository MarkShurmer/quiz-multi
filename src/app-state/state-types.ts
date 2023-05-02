export type Answer = {
    round: number;
    question: number;
    answer: boolean;
};

export enum ActivityType {
    Flow,
    Rounds,
}

export enum StepType {
    Start,
    Question,
    EndOfRound,
    Results,
    StartWithResults,
}

export type ActivityBase = {
    activityNumber: number;
    type: ActivityType;
};

export type FlowActivity = ActivityBase & {
    type: ActivityType.Flow;
    name: string;
    questions: Array<Question>;
};

export type RoundsActivity = ActivityBase & {
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

export type GameStep = {
    stepType: StepType;
    stepNumber: number;
    activityNumber: number;
    activityType: ActivityType;
    round: number;
    question: number;
};

// export type GameStatus = {
//     stepNumber: number;
//     step: GameStep;
// };
