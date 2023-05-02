import './Home.css';
import { useRecoilState } from 'recoil';
import { gameActivityAtom, gameAnswersAtom, gameStatusAtom } from '../app-state/atoms';
import { FlowActivity, GameInfo, RoundsActivity, StepType } from '../app-state/state-types';
import { getGameInfo } from '../app-state/game-info';
import { getFirstStep } from '../app-state/state-machine';
import { useEffect, useState } from 'react';

export function HomePage() {
    const [gameStatus, setGameStatus] = useRecoilState(gameStatusAtom);
    const [, setGameAnswers] = useRecoilState(gameAnswersAtom);
    const [, setGameActivity] = useRecoilState(gameActivityAtom);
    const [gameInfo, setGameInfo] = useState<GameInfo>({ name: '', activities: [] });

    const startActivity = (act: FlowActivity | RoundsActivity) => {
        setGameStatus(getFirstStep(act.activityNumber));
        setGameAnswers([]);
        setGameActivity(act);
    };

    useEffect(() => {
        (async () => setGameInfo(await getGameInfo()))();
    }, []);

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
            <button
                aria-label="Results"
                className="results"
                disabled={gameStatus.stepType !== StepType.StartWithResults}
            >
                RESULTS
            </button>
        </section>
    );
}
