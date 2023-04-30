import { useRecoilState } from 'recoil';
import { gameAnswersAtom, gameCurrentsAtom, gameStatusAtom } from '../app-state/atoms';
import { Answer, FlowActivity, GameCurrents, GameStatus } from '../app-state/state-types';
import { generateAnswer, getNextFlowQuestion, getQuestionText } from '../app-state/state-helpers';
import AnswerSection, { OnAnswer } from '../activity/AnswerSection';
import ActivityHeader from '../activity/ActivityHeader';
import MiddleSection from '../activity/MiddleSection';

export function FlowActivityPage() {
  const [gameCurrents, setGameCurrents] = useRecoilState<GameCurrents>(gameCurrentsAtom);
  const [, setGameStatus] = useRecoilState<GameStatus>(gameStatusAtom);
  const [gameAnswers, setGameAnswers] = useRecoilState<Array<Answer>>(gameAnswersAtom);

  const currentActivity: FlowActivity = gameCurrents.currentActivity as FlowActivity;

  if (!currentActivity) {
    throw new Error('Activity has not been set');
  }

  const handleAnswer: OnAnswer = (isCorrect: boolean) => {
    // create answer
    const answer = generateAnswer(gameCurrents, isCorrect);

    // work out if we need to go on
    const nextQuestionNumber = getNextFlowQuestion(
      gameCurrents.currentQuestion,
      gameCurrents.currentActivity as FlowActivity
    );

    // we need to update our game state
    setGameCurrents({ ...gameCurrents, currentQuestion: nextQuestionNumber });
    setGameAnswers([...gameAnswers, answer]); // add our answer to a cloned copy

    if (nextQuestionNumber === 0) {
      setGameStatus(GameStatus.ShowResults);
    }
  };

  const getText = () => {
    return gameCurrents.currentQuestion
      ? getQuestionText(currentActivity, gameCurrents.currentQuestion, gameCurrents.currentRound)
      : '';
  };

  return (
    <section className="page-container">
      <ActivityHeader header={currentActivity.name} subHeader={`Q${gameCurrents.currentQuestion}.`} />
      <MiddleSection text={getText()} />
      <AnswerSection onAnswer={handleAnswer} />
    </section>
  );
}
