import './Home.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { gameAnswersAtom, gameCurrentsAtom, gameInfoSelector, gameStatusAtom } from '../app-state/atoms';
import { Activity, Answer, GameCurrents, GameStatus } from '../app-state/state-types';
import { getActivityTypeGameStatus } from '../app-state/state-helpers';

export function HomePage() {
  const gameInfo = useRecoilValue(gameInfoSelector);
  const [gameStatus, setGameStatus] = useRecoilState<GameStatus>(gameStatusAtom);
  const [, setGameCurrents] = useRecoilState<GameCurrents>(gameCurrentsAtom);
  const [, setGameAnswers] = useRecoilState<Array<Answer>>(gameAnswersAtom);

  const startActivity = (act: Activity) => {
    setGameStatus(getActivityTypeGameStatus(act));
    setGameCurrents({
      currentActivity: act,
      currentQuestion: 1,
      currentRound: 1,
    });
    setGameAnswers([]);
  };

  return (
    <section className="page-container page-container-home">
      <header className="page-header">
        <h1>CAE</h1>
        <h2>{gameInfo.name}</h2>
      </header>

      <ul className="list">
        {gameInfo.activities.map((act) => (
          <li key={act.name} className="item">
            <div className="item-text" onClick={() => startActivity(act)} role="link">
              {act.name}
            </div>
          </li>
        ))}

        {['three', 'four', 'five'].map((inactive) => (
          <li key={inactive} className="item">
            <div className="inactive-item-text" role="link">
              Activity {inactive}
            </div>
          </li>
        ))}
      </ul>
      <button aria-label="Results" className="results" disabled={gameStatus === GameStatus.NotStarted}>
        RESULTS
      </button>
    </section>
  );
}
