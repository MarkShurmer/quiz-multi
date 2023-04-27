import { useRecoilState } from 'recoil';
import { gameAtom } from '../app-state/atoms';
import { GameState } from '../app-state/state-types';
import { getNumberAsText, getQuestionText } from '../app-state/state-helpers';
import Answer from '../answer/Answer';

export function FlowActivity() {
  const [gameState, setGameState] = useRecoilState<GameState>(gameAtom);

  return (
    <section className="page-container">
      <header className="page-header">
        <h1>activity {getNumberAsText(gameState.currentActivity.order)}</h1>
        <h2>Q{gameState.currentQuestion}.</h2>
      </header>
      <div className="page-question">
        <span className="page-question-text">
          {getQuestionText(
            gameState.currentActivity,
            gameState.currentQuestion
          )}
        </span>
      </div>
      <Answer />
    </section>
  );
}
