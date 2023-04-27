import './App.css';
import { useRecoilValue } from 'recoil';
import { gameAtom } from './app-state/atoms';
import { Home } from './home/Home';
import { GameStatus } from './app-state/state-types';
import { Round } from './round/Round';
import { Score } from './score/Score';
import { FlowActivity } from './flow-activity/FlowActivity';

function App() {
  const game = useRecoilValue(gameAtom);

  const renderPage = () => {
    switch (game.status) {
      case GameStatus.NotStarted:
      case GameStatus.ShowHome:
        return <Home />;
      case GameStatus.InFlowActivity:
        return <FlowActivity />;
      case GameStatus.InWaitActivity:
        return <Round />;
      default:
        return <Score />;
    }
  };

  return <>{renderPage()}</>;
}

export default App;
