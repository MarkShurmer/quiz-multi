import {
    RecoilObserver,
    fireEvent,
    getMockQuestions,
    render,
    screen,
} from '../../setup/test-helpers';
import { gameActivityAtom, gameStatusAtom } from '../app-state/atoms';

import { EndOfRoundPage } from './EndOfRoundPage';
import { test, expect, vi } from 'vitest';
import { MutableSnapshot } from 'recoil';
import { getStep } from '../app-state/state-machine';
import { ActivityType, GameStep, StepType } from '../app-state/state-types';

const info = getMockQuestions();
const initializeState = ({ set }: MutableSnapshot) => {
    set(gameStatusAtom, getStep(2, 3));
    set(gameActivityAtom, info.activities[1]);
};

test('End of Round page - shows header correctly', () => {
    render(<EndOfRoundPage />, {}, initializeState);

    expect(screen.getByText('ROUND 1.')).toBeDefined();
});

test('End of Round page - shows text correctly for first round', () => {
    render(<EndOfRoundPage />, {}, initializeState);

    expect(
        screen.getByText('The round is finished, press Next to go to next round of questions')
    ).toBeDefined();
});

test('End of Round page - shows text correctly for last round', async () => {
    const initializeState = ({ set }: MutableSnapshot) => {
        set(gameStatusAtom, getStep(2, 6));
        set(gameActivityAtom, info.activities[1]);
    };

    render(<EndOfRoundPage />, {}, initializeState);

    expect(
        await screen.findByText("That's all the questions done, press Next to see results")
    ).toBeDefined();
});

test('End of Round page - shows next button', () => {
    render(<EndOfRoundPage />, {}, initializeState);
    const buttons = screen.getAllByRole('button');

    expect(buttons.length).toBe(1);
    expect(buttons[0].textContent).toBe('next');
});

test('End of Round page - pressing next button advances to next round', () => {
    // we need this to track when state changes
    const onChange = vi.fn();

    render(
        <>
            <RecoilObserver node={gameStatusAtom} onChange={onChange} />
            <EndOfRoundPage />
        </>,
        {},
        initializeState
    );
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);

    expect(onChange).toHaveBeenCalledWith({
        stepNumber: 4,
        activityNumber: 2,
        activityType: ActivityType.Rounds,
        question: 1,
        round: 2,
        stepType: StepType.Question,
    } as GameStep);
});

test('End of Round page - pressing next button on last round advances to results', async () => {
    const initializeState = ({ set }: MutableSnapshot) => {
        set(gameStatusAtom, getStep(2, 6));
        set(gameActivityAtom, info.activities[1]);
    };

    // we need this to track when state changes
    const onChange = vi.fn();

    render(
        <>
            <RecoilObserver node={gameStatusAtom} onChange={onChange} />
            <EndOfRoundPage />
        </>,
        {},
        initializeState
    );

    const buttons = await screen.findAllByRole('button');
    fireEvent.click(buttons[0]);

    expect(onChange).toHaveBeenCalledWith({
        stepNumber: 7,
        activityNumber: 2,
        activityType: ActivityType.Rounds,
        question: 0,
        round: 0,
        stepType: StepType.ResultsFlow,
    } as GameStep);
});
