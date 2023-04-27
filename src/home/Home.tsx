import './Home.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { gameAtom, questionsSelector } from '../app-state/atoms';
import { Activity, GameState, GameStatus } from '../app-state/state-types';
import { getActivityTypeGameStatus } from '../app-state/state-helpers';

// export async function loader() {
//   const resp = await fetch(getApiUrl());
//   if (resp.ok) {
//     return await resp.json();
//   }
//   throw new Error('Unable to load game data');
// }

export function Home() {
  const questions = useRecoilValue(questionsSelector);
  const [gameState, setGameState] = useRecoilState<GameState>(gameAtom);

  const startActivity = (act: Activity) => {
    setGameState({
      ...gameState,
      status: getActivityTypeGameStatus(act),
      currentActivity: act,
      currentQuestion: 1,
      currentRound: 1,
    });
  };

  return (
    <section className="page-container page-container-home">
      <header className="page-header">
        <h1>CAE</h1>
        <h2>{questions.name}</h2>
      </header>

      <ul className="list">
        {questions.activities.map((act) => (
          <li key={act.activity_name}>
            <div className="item" onClick={() => startActivity(act)}>
              {act.activity_name}
            </div>
          </li>
        ))}

        {['three', 'four', 'five'].map((inactive) => (
          <li key={inactive}>
            <div className="item inactive-item">activity {inactive}</div>
          </li>
        ))}
      </ul>
      <button
        aria-label="Results"
        className="results"
        disabled={gameState.status === GameStatus.NotStarted}
      >
        RESULTS
      </button>
    </section>
  );
}
