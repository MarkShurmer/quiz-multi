import { useRecoilState, useRecoilValue } from 'recoil';
import { gameActivityAtom, gameStatusAtom } from '../app-state/atoms';
import MiddleSection from '../activity/MiddleSection';
import { getNextStep } from '../app-state/state-machine';
import { RoundsActivity } from '../app-state/state-types';

export function EndOfRoundPage() {
    const [gameStatus, setGameStatus] = useRecoilState(gameStatusAtom);
    const currentActivity = useRecoilValue(gameActivityAtom) as RoundsActivity;

    const handleNext = () => {
        setGameStatus(getNextStep(gameStatus));
    };

    const getInfoText = () => {
        return gameStatus.round >= currentActivity.rounds.length
            ? "That's all the questions done, press Next to see results"
            : 'The round is finished, press Next to go to next round of questions';
    };

    return (
        <section className="page-container">
            <header className="page-header">
                <h1>{currentActivity.name}</h1>
                <h2>{`ROUND ${gameStatus.round}`}</h2>
            </header>
            <MiddleSection text={getInfoText()} />
            <div className="end-of-round-block">
                <button className="answer-btn" onClick={handleNext}>
                    next
                </button>
            </div>
        </section>
    );
}
