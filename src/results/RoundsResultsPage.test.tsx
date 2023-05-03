import {
    RecoilObserver,
    fireEvent,
    getMockQuestions,
    render,
    screen,
} from '../../setup/test-helpers';
import { gameStatusAtom, gameActivityAtom, gameAnswersAtom } from '../app-state/atoms';
import { test, expect, vi } from 'vitest';
import { MutableSnapshot } from 'recoil';
import { getStep } from '../app-state/state-machine';
import { ActivityType, Answer, GameStep, StepType } from '../app-state/state-types';
import { RoundsResultsPage } from './RoundsResultsPage';

const info = getMockQuestions();
const mockAnswers: Array<Answer> = [
    { question: 1, round: 1, answer: true },
    { question: 2, round: 1, answer: true },
    { question: 1, round: 2, answer: false },
    { question: 2, round: 2, answer: false },
];
const initializeState = ({ set }: MutableSnapshot) => {
    set(gameStatusAtom, getStep(2, 7));
    set(gameActivityAtom, info.activities[1]);
    set(gameAnswersAtom, mockAnswers);
};

test('Round Results page - shows header correctly', () => {
    render(<RoundsResultsPage />, {}, initializeState);

    expect(screen.getByText('Activity Two')).toBeDefined();
});

test('Round Results page - shows question 1 correctly', async () => {
    render(<RoundsResultsPage />, {}, initializeState);
    const questionNodes = await screen.findAllByTestId('question');
    const answerNodes = await screen.findAllByTestId('answer');

    expect(questionNodes[0]).toHaveTextContent('Q1');
    expect(answerNodes[0]).toHaveTextContent('CORRECT');
});

test('Round Results page - shows question 2 round 2 correctly', async () => {
    render(<RoundsResultsPage />, {}, initializeState);
    const questionNodes = await screen.findAllByTestId('question');
    const answerNodes = await screen.findAllByTestId('answer');

    expect(questionNodes.length).toBe(4);
    expect(questionNodes[3]).toHaveTextContent('Q2');
    expect(answerNodes[3]).toHaveTextContent('FALSE');
});

test('Round Results page - pressing Home button goes to home', () => {
    // we need this to track when state changes
    const onChange = vi.fn();

    render(
        <>
            <RecoilObserver node={gameStatusAtom} onChange={onChange} />
            <RoundsResultsPage />
        </>,
        {},
        initializeState
    );
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);

    expect(onChange).toHaveBeenCalledWith({
        stepNumber: 8,
        activityNumber: 2,
        question: 0,
        activityType: ActivityType.Rounds,
        round: 0,
        stepType: StepType.StartWithResults,
    } as GameStep);
});
