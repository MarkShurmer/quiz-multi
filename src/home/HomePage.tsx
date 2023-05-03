import { useRecoilState, useRecoilValue } from 'recoil';
import {
    gameActivityAtom,
    gameAnswersAtom,
    gameInfoSelector,
    gameStatusAtom,
} from '../app-state/atoms';
import { FlowActivity, RoundsActivity, StepType } from '../app-state/state-types';
import { getFirstStep, getResultStep } from '../app-state/state-machine';

export function HomePage() {
    const [gameStatus, setGameStatus] = useRecoilState(gameStatusAtom);
    const [, setGameAnswers] = useRecoilState(gameAnswersAtom);
    const [gameActivity, setGameActivity] = useRecoilState(gameActivityAtom);
    const gameInfo = useRecoilValue(gameInfoSelector);

    const startActivity = (act: FlowActivity | RoundsActivity) => {
        setGameStatus(getFirstStep(act.activityNumber));
        setGameAnswers([]);
        setGameActivity(act);
    };

    const gotoResults = () => {
        setGameStatus(getResultStep(gameActivity.activityNumber));
    };

    return (
        <section className="page-container page-container-home" role="main">
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
            <button
                aria-label="Results"
                className="cta"
                disabled={gameStatus.stepType !== StepType.StartWithResults}
                onClick={gotoResults}
            >
                RESULTS
            </button>
        </section>
    );
}
