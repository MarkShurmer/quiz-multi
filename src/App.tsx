import { useRecoilValue } from 'recoil';
import { gameStatusAtom } from './app-state/atoms';
import { HomePage } from './home/HomePage';
import { StepType } from './app-state/state-types';
import { EndOfRoundPage } from './activity/EndOfRoundPage';
import { Score } from './score/Score';
import { ActivityPage } from './activity/ActivityPage';
import { createMachines } from './app-state/state-machine';
import { useEffect } from 'react';
import './App.css';

function App() {
    const gameStatus = useRecoilValue(gameStatusAtom);

    useEffect(() => {
        // set up the machines
        createMachines();
    }, []);

    const renderPage = () => {
        switch (gameStatus.step.type) {
            case StepType.Start:
            case StepType.StartWithResults:
                return <HomePage />;
            case StepType.Question:
                return <ActivityPage />;
            case StepType.EndOfRound:
                return <EndOfRoundPage />;
            default:
                return <Score />;
        }
    };

    return <>{renderPage()}</>;
}

export default App;
