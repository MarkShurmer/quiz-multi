import './App.css';
import { useRecoilValue } from 'recoil';
import { gameStatusAtom } from './app-state/atoms';
import { HomePage } from './home/HomePage';
import { GameStatus } from './app-state/state-types';
import { EndOfRoundPage } from './round-activity/EndOfRoundPage';
import { Score } from './score/Score';
import { FlowActivityPage } from './flow-activity/FlowActivityPage';
import { RoundsActivityPage } from './round-activity/RoundsActivityPage';

function App() {
  const gameStatus = useRecoilValue(gameStatusAtom);

  const renderPage = () => {
    switch (gameStatus) {
      case GameStatus.NotStarted:
      case GameStatus.ShowHome:
        return <HomePage />;
      case GameStatus.InFlowActivity:
        return <FlowActivityPage />;
      case GameStatus.InRoundsActivity:
        return <RoundsActivityPage />;
      case GameStatus.ShowEndOfRound:
        return <EndOfRoundPage />;
      default:
        return <Score />;
    }
  };

  return <>{renderPage()}</>;
}

export default App;
