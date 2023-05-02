import { useRecoilState, useRecoilValue } from 'recoil';
import { gameActivityAtom, gameAnswersAtom, gameStatusAtom } from '../app-state/atoms';
import { generateAnswer, getQuestionText } from '../app-state/state-helpers';
import AnswerSection, { OnAnswer } from './AnswerSection';
import ActivityHeader from './ActivityHeader';
import MiddleSection from './MiddleSection';
import { getNextStep } from '../app-state/state-machine';

export function ActivityPage() {
    const [gameStatus, setGameStatus] = useRecoilState(gameStatusAtom);
    const [gameAnswers, setGameAnswers] = useRecoilState(gameAnswersAtom);
    const currentActivity = useRecoilValue(gameActivityAtom);

    const handleAnswer: OnAnswer = (isCorrect: boolean) => {
        // create answer
        const answer = generateAnswer(gameStatus, isCorrect);

        // we need to update our game state to next step
        setGameStatus(getNextStep(gameStatus));
        // add our answer to a cloned copy
        setGameAnswers([...gameAnswers, answer]);
    };

    const getText = () => {
        return gameStatus.question ? getQuestionText(currentActivity, gameStatus) : '';
    };

    return (
        <section className="page-container">
            <ActivityHeader activity={currentActivity} currentStep={gameStatus} />
            <MiddleSection text={getText()} />
            <AnswerSection onAnswer={handleAnswer} />
        </section>
    );
}
