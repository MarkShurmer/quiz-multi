import './App.css';
import { useRecoilValue } from 'recoil';
import { gameStatusAtom } from './app-state/atoms';
import { HomePage } from './home/HomePage';
import { GameStatus } from './app-state/state-types';
import { Round } from './round/Round';
import { Score } from './score/Score';
import { FlowActivityPage } from './flow-activity/FlowActivityPage';

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
        return <Round />;
      default:
        return <Score />;
    }
  };

  return <>{renderPage()}</>;
}

export default App;
