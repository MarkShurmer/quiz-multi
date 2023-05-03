import { useRecoilValue } from 'recoil';
import { gameStatusAtom } from './app-state/atoms';
import { HomePage } from './home/HomePage';
import { StepType } from './app-state/state-types';
import { EndOfRoundPage } from './activity/EndOfRoundPage';
import { FlowResultsPage } from './results/FlowResultsPage';
import { ActivityPage } from './activity/ActivityPage';
import { createMachines } from './app-state/state-machine';
import { useEffect } from 'react';
import './App.css';
import { RoundsResultsPage } from './results/RoundsResultsPage';

function App() {
    const gameStatus = useRecoilValue(gameStatusAtom);

    useEffect(() => {
        // set up the machines
        createMachines();
    }, []);

    const renderPage = () => {
        switch (gameStatus.stepType) {
            case StepType.Start:
            case StepType.StartWithResults:
                return <HomePage />;
            case StepType.Question:
                return <ActivityPage />;
            case StepType.EndOfRound:
                return <EndOfRoundPage />;
            case StepType.ResultsFlow:
                return <FlowResultsPage />;

            default:
                return <RoundsResultsPage />;
        }
    };

    return <>{renderPage()}</>;
}

export default App;
