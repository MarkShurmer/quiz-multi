export type Answer = {
  round: number;
  question: number;
  answer: boolean;
};

export type ActivityState = {
  type: ActivityType;
  answers: Array<Answer>;
  currentRound: number;
  currentQuestion: number;
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

export type ActivityType = 1 | 2;

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
