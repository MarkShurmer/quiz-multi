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
import { FlowResultsPage } from './FlowResultsPage';

const info = getMockQuestions();
const mockAnswers: Array<Answer> = [
    { question: 1, round: 0, answer: true },
    { question: 2, round: 0, answer: true },
    { question: 3, round: 0, answer: false },
    { question: 4, round: 0, answer: false },
    { question: 5, round: 0, answer: true },
];
const initializeState = ({ set }: MutableSnapshot) => {
    set(gameStatusAtom, getStep(1, 6));
    set(gameActivityAtom, info.activities[0]);
    set(gameAnswersAtom, mockAnswers);
};

test('Flow Results page - shows header correctly', () => {
    render(<FlowResultsPage />, {}, initializeState);

    expect(screen.getByText('Activity One')).toBeDefined();
});

test('Flow Results page - shows question 1 correctly', async () => {
    render(<FlowResultsPage />, {}, initializeState);
    const questionNodes = await screen.findAllByTestId('question');
    const answerNodes = await screen.findAllByTestId('answer');

    expect(questionNodes[0]).toHaveTextContent('Q1');
    expect(answerNodes[0]).toHaveTextContent('CORRECT');
});

test('Flow Results page - shows question 5 correctly', async () => {
    render(<FlowResultsPage />, {}, initializeState);
    const questionNodes = await screen.findAllByTestId('question');
    const answerNodes = await screen.findAllByTestId('answer');

    expect(questionNodes.length).toBe(5);
    expect(questionNodes[4]).toHaveTextContent('Q5');
    expect(answerNodes[4]).toHaveTextContent('CORRECT');
});

test('Flow Results page - pressing Home button goes to home', () => {
    // we need this to track when state changes
    const onChange = vi.fn();

    render(
        <>
            <RecoilObserver node={gameStatusAtom} onChange={onChange} />
            <FlowResultsPage />
        </>,
        {},
        initializeState
    );
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);

    expect(onChange).toHaveBeenCalledWith({
        stepNumber: 7,
        activityNumber: 1,
        question: 0,
        activityType: ActivityType.Flow,
        round: 0,
        stepType: StepType.StartWithResults,
    } as GameStep);
});
