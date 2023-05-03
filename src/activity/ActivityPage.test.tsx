import {
    RecoilObserver,
    fireEvent,
    getMockQuestions,
    render,
    screen,
} from '../../setup/test-helpers';
import { gameStatusAtom, gameActivityAtom } from '../app-state/atoms';
import { ActivityPage } from './ActivityPage';
import { test, expect, vi } from 'vitest';
import { MutableSnapshot } from 'recoil';
import { getStep } from '../app-state/state-machine';
import { ActivityType, GameStep, StepType } from '../app-state/state-types';

const info = getMockQuestions();
const initializeState = ({ set }: MutableSnapshot) => {
    set(gameStatusAtom, getStep(1, 1));
    set(gameActivityAtom, info.activities[0]);
};

test('Activity page - shows header correctly', () => {
    render(<ActivityPage />, {}, initializeState);

    expect(screen.getByText('Activity One')).toBeDefined();
});

test('Activity page - shows header correctly for rounds', () => {
    const initializeState = ({ set }: MutableSnapshot) => {
        set(gameStatusAtom, getStep(2, 1));
        set(gameActivityAtom, info.activities[1]);
    };
    render(<ActivityPage />, {}, initializeState);

    expect(screen.getByTestId('sub-header-1')).toHaveTextContent('Activity Two');
    expect(screen.getByTestId('sub-header-2')).toHaveTextContent('ROUND 1');
});

test('Activity page - shows question correctly', async () => {
    render(<ActivityPage />, {}, initializeState);
    const questionNode = await screen.findByRole('contentinfo');

    expect(questionNode).toBeDefined();
    expect(questionNode.innerHTML).toBe('I really enjoy <b>to play football</b> with friends.');
});

test('Activity page - shows correct button', () => {
    render(<ActivityPage />, {}, initializeState);
    const buttons = screen.getAllByRole('button');

    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toBe('correct');
});

test('Activity page - shows inorrect button', () => {
    render(<ActivityPage />, {}, initializeState);
    const buttons = screen.getAllByRole('button');

    expect(buttons.length).toBe(2);
    expect(buttons[1].textContent).toBe('incorrect');
});

test('Activity page - pressing correct button advances to next question', () => {
    // we need this to track when state changes
    const onChange = vi.fn();

    render(
        <>
            <RecoilObserver node={gameStatusAtom} onChange={onChange} />
            <ActivityPage />
        </>,
        {},
        initializeState
    );
    const buttons = screen.getAllByRole('button');

    fireEvent.click(buttons[0]);
    expect(onChange).toHaveBeenCalledWith({
        stepNumber: 2,
        activityNumber: 1,
        question: 2,
        activityType: ActivityType.Flow,
        round: 0,
        stepType: StepType.Question,
    } as GameStep);
});

test('Activity page - pressing incorrect button advances to results when on last question', () => {
    const initializeState = ({ set }: MutableSnapshot) => {
        set(gameStatusAtom, getStep(1, 5));
        set(gameActivityAtom, info.activities[0]);
    };

    // we need this to track when state changes
    const onChangeStatus = vi.fn();

    render(
        <>
            <RecoilObserver node={gameStatusAtom} onChange={onChangeStatus} />
            <ActivityPage />
        </>,
        {},
        initializeState
    );

    // click the incorrect button
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);

    expect(onChangeStatus).toHaveBeenCalledWith({
        stepNumber: 6,
        activityNumber: 1,
        question: 0,
        activityType: ActivityType.Flow,
        round: 0,
        stepType: StepType.ResultsFlow,
    } as GameStep);
});
