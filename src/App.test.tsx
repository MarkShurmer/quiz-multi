import { MutableSnapshot } from 'recoil';
import { getMockQuestions, render, screen, waitFor } from '../setup/test-helpers';
import { gameStatusAtom, gameActivityAtom } from './app-state/atoms';
import { getStep } from './app-state/state-machine';
import App from './App';
import { test, expect } from 'vitest';
import { getGameInfo } from './app-state/game-info';

const info = getMockQuestions();
const initializeState = ({ set }: MutableSnapshot) => {
    set(gameStatusAtom, getStep(1, 7));
    set(gameActivityAtom, info.activities[0]);
};
test('App - shows home page when step type is Start', async () => {
    render(<App />);

    await waitFor(() => {
        expect(screen.getByRole('main')).toBeDefined();
    });
});

test('App - shows home page when step type is Start with results', () => {
    render(<App />, {}, initializeState);

    expect(screen.getByRole('main')).toBeDefined();
});

test('App - shows home page with results enabled when step type is Start with results', () => {
    render(<App />, {}, initializeState);
    const resultsButton = screen.getByRole('button') as HTMLButtonElement;

    expect(screen.getByRole('main')).toBeDefined();
    expect(resultsButton.disabled).toBeFalsy();
});

test('App - shows activity page when step is a question step', () => {
    const initializeState = ({ set }: MutableSnapshot) => {
        set(gameStatusAtom, getStep(1, 2));
        set(gameActivityAtom, info.activities[0]);
    };
    render(<App />, {}, initializeState);

    expect(screen.getByRole('article')).toBeDefined();
});
