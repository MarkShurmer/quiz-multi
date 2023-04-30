import './Answer.css';

export type OnAnswer = (isCorrect: boolean) => void;
export type AnswerProps = {
  onAnswer: OnAnswer;
};

export default function AnswerSection(props: AnswerProps) {
  const { onAnswer } = props;

  return (
    <div className="answer-block">
      <button className="answer-btn" onClick={() => onAnswer(true)}>
        correct
      </button>
      <button className="answer-btn" onClick={() => onAnswer(false)}>
        incorrect
      </button>
    </div>
  );
}
