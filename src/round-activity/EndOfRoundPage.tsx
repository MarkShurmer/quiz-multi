import { useRecoilState } from 'recoil';
import ActivityHeader from '../activity/ActivityHeader';
import { gameCurrentsAtom, gameStatusAtom } from '../app-state/atoms';
import { GameCurrents, GameStatus, RoundsActivity } from '../app-state/state-types';
import MiddleSection from '../activity/MiddleSection';

export function EndOfRoundPage() {
  const [gameCurrents, setGameCurrents] = useRecoilState<GameCurrents>(gameCurrentsAtom);
  const [, setGameStatus] = useRecoilState<GameStatus>(gameStatusAtom);
  const currentActivity: RoundsActivity = gameCurrents.currentActivity as RoundsActivity;

  if (!currentActivity) {
    throw new Error('Activity has not been set');
  }

  const handleNext = () => {
    if (gameCurrents.currentRound >= currentActivity.rounds.length) {
      // weve finished all the rounds
      setGameStatus(GameStatus.ShowResults);
    } else {
      // go to next round
      setGameStatus(GameStatus.InRoundsActivity);
      setGameCurrents({ ...gameCurrents, currentRound: gameCurrents.currentRound + 1, currentQuestion: 1 });
    }
  };

  const getInfoText = () => {
    console.log('::: ', gameCurrents.currentRound, currentActivity.rounds.length);
    return gameCurrents.currentRound >= currentActivity.rounds.length
      ? "That's all the questions done, press Next to see results"
      : 'The round is finished, press Next to go to next round of questions';
  };

  return (
    <section className="page-container">
      <ActivityHeader header={currentActivity.name} subHeader={`ROUND ${gameCurrents.currentRound}`} />
      <MiddleSection text={getInfoText()} />
      <div className="answer-block">
        <button className="answer-btn" onClick={handleNext}>
          next
        </button>
      </div>
    </section>
  );
}
