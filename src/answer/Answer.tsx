import { useRecoilState } from 'recoil';
import { gameAtom } from '../app-state/atoms';
import { GameState, GameStatus } from '../app-state/state-types';
import './Answer.css';
import {
  generateActivityAnswer,
  getNextQuestion,
  getNextRound,
} from '../app-state/state-helpers';

export default function Answer() {
  const [gameState, setGameState] = useRecoilState<GameState>(gameAtom);

  const onAnswer = (isCorrect: boolean) => {
    const nextQuestionNumber = getNextQuestion(
      gameState.currentQuestion,
      gameState.currentActivity,
      gameState.currentRound
    );

    let gameStatus = gameState.status;
    let currentRound = gameState.currentRound;

    if (nextQuestionNumber === 0) {
      // no more questions, so go to next round
      currentRound = getNextRound(gameState.currentActivity);
      if (currentRound === 0) {
        // we've run out of questions , go to finish
        gameStatus = GameStatus.ShowResults;
      }
    }

    // create answer
    const activityAnswer = generateActivityAnswer(gameState, isCorrect);

    // we need to update our game state
    setGameState({
      ...gameState,
      currentQuestion: nextQuestionNumber,
      status: gameStatus,
      currentRound,
      answers: [...gameState.answers, activityAnswer],
    });
  };

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
