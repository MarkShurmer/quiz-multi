import { useRecoilState } from 'recoil';
import { gameActivityAtom, gameAnswersAtom, gameStatusAtom } from '../app-state/atoms';
import { getNextStep } from '../app-state/state-machine';
import './Results.css';
import { getAnswerText } from '../app-state/state-helpers';
import { RoundsActivity } from '../app-state/state-types';

export function RoundsResultsPage() {
    const [gameStatus, setGameStatus] = useRecoilState(gameStatusAtom);
    const [gameAnswers] = useRecoilState(gameAnswersAtom);
    const [gameActivity] = useRecoilState(gameActivityAtom);
    const currentActivity = gameActivity as RoundsActivity;

    const gotoHome = () => {
        setGameStatus(getNextStep(gameStatus));
    };

    const getAnswer = (question: number, round: number) => {
        const entry = gameAnswers.find((ans) => ans.question === question && ans.round === round);
        if (!entry) {
            throw new Error('Cannot find answer entry');
        }
        return getAnswerText(entry?.answer);
    };

    return (
        <section className="page-container page-container-home" role="main">
            <header className="page-header">
                <h1>{gameActivity.name}</h1>
                <h2>Results</h2>
            </header>

            <ul className="list">
                {currentActivity.rounds.map((round) => (
                    <>
                        <li key={`hdr_${round.num}`} className="item">
                            <div className="item-text" role="contentinfo">
                                ROUND {round.num}
                            </div>
                        </li>
                        <li key={`rnd_${round.num}`} className="result-question-item">
                            <ul className="result-question-item">
                                {round.questions.map((question) => (
                                    <li className="item result-item">
                                        <div className="item-text" data-testid="question">
                                            Q{question.num}
                                        </div>
                                        <div
                                            className="item-text item-text-answer"
                                            data-testid="answer"
                                        >
                                            {getAnswer(question.num, round.num)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    </>
                ))}
            </ul>
            {/* <ul className="list">
                {gameAnswers.map((answer, index) => (
                    <li key={index} className="item result-item">
                        <div className="item-text" role="contentinfo">
                            Q{answer.question}
                        </div>
                        <div className="item-text item-text-answer" role="contentinfo">
                            {getAnswerText(answer.answer)}
                        </div>
                    </li>
                ))}
            </ul> */}
            <button aria-label="Home" className="cta" onClick={gotoHome}>
                HOME
            </button>
        </section>
    );
}
