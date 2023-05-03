import { useRecoilState } from 'recoil';
import { gameActivityAtom, gameAnswersAtom, gameStatusAtom } from '../app-state/atoms';
import { getNextStep } from '../app-state/state-machine';
import './Results.css';
import { getAnswerText } from '../app-state/state-helpers';

export function FlowResultsPage() {
    const [gameStatus, setGameStatus] = useRecoilState(gameStatusAtom);
    const [gameAnswers] = useRecoilState(gameAnswersAtom);
    const [gameActivity] = useRecoilState(gameActivityAtom);

    const gotoHome = () => {
        setGameStatus(getNextStep(gameStatus));
    };

    return (
        <section className="page-container page-container-home" role="main">
            <header className="page-header">
                <h1>{gameActivity.name}</h1>
                <h2>Results</h2>
            </header>

            <ul className="list">
                {gameAnswers.map((entry, index) => (
                    <li key={index} className="item result-item">
                        <div className="item-text" data-testid="question">
                            Q{entry.question}
                        </div>
                        <div className="item-text item-text-answer" data-testid="answer">
                            {getAnswerText(entry.answer)}
                        </div>
                    </li>
                ))}
            </ul>
            <button aria-label="Home" className="cta" onClick={gotoHome}>
                HOME
            </button>
        </section>
    );
}
