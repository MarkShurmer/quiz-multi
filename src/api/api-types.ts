/* c8 ignore next 35 */

export type Game = {
    name: string;
    heading: string;
    activities: Array<FlowActivity | RoundsActivity>;
};

export type FlowActivity = {
    order: number;
    activity_name: string;
    questions: Array<Question>;
};

export type RoundsActivity = {
    order: number;
    activity_name: string;
    questions: Array<Round>;
};

export type Activity = FlowActivity | RoundsActivity;

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
