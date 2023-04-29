import './Answer.css';

export type OnAnswer = (isCorrect: boolean) => void;
export type AnswerProps = {
  onAnswer: OnAnswer;
};

export default function AnswerSection(props: AnswerProps) {
  const { onAnswer } = props;

  // const handleAnswer = (isCorrect: boolean) => {
  //   const nextQuestionNumber = getNextQuestion(
  //     gameState.currentQuestion,
  //     gameState.currentActivity,
  //     gameState.currentRound
  //   );

  //   let gameStatus = gameState.status;
  //   let currentRound = gameState.currentRound;

  //   if (nextQuestionNumber === 0) {
  //     // no more questions, so go to next round
  //     currentRound = getNextRound(gameState.currentActivity);
  //     if (currentRound === 0) {
  //       // we've run out of questions , go to finish
  //       gameStatus = GameStatus.ShowResults;
  //     }
  //   }

  //   // create answer
  //   const activityAnswer = generateActivityAnswer(gameState, isCorrect);

  //   // we need to update our game state
  //   setGameState({
  //     ...gameState,
  //     currentQuestion: nextQuestionNumber,
  //     status: gameStatus,
  //     currentRound,
  //     answers: [...gameState.answers, activityAnswer],
  //   });
  // };

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
