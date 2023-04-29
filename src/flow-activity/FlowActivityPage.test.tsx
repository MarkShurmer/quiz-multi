import { RecoilObserver, fireEvent, getMockQuestions, render, screen } from '../../setup/test-helpers';
import { gameCurrentsAtom, gameStatusAtom } from '../app-state/atoms';
import { GameStatus } from '../app-state/state-types';
import { FlowActivityPage } from './FlowActivityPage';
import { test, expect, vi } from 'vitest';
import { MutableSnapshot } from 'recoil';

test('Flow activity page - expect exception when activity not set', () => {
  expect(() => render(<FlowActivityPage />)).toThrowError('Activity has not been set');
});

const info = getMockQuestions();

test('Flow activity page - shows header correctly', () => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(gameStatusAtom, GameStatus.InFlowActivity);
    set(gameCurrentsAtom, { currentQuestion: 1, currentActivity: info.activities[0], currentRound: 0 });
  };

  render(<FlowActivityPage />, {}, initializeState);

  expect(screen.getByText('Activity One')).toBeDefined();
});

test('Flow activity page - shows question correctly', () => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(gameStatusAtom, GameStatus.InFlowActivity);
    set(gameCurrentsAtom, { currentQuestion: 1, currentActivity: info.activities[0], currentRound: 0 });
  };

  render(<FlowActivityPage />, {}, initializeState);

  expect(screen.getByText('I really enjoy *to play football* with friends.')).toBeDefined();
});

test('Flow activity page - shows correct button', () => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(gameStatusAtom, GameStatus.InFlowActivity);
    set(gameCurrentsAtom, { currentQuestion: 1, currentActivity: info.activities[0], currentRound: 0 });
  };

  render(<FlowActivityPage />, {}, initializeState);
  const buttons = screen.getAllByRole('button');

  expect(buttons.length).toBe(2);
  expect(buttons[0].textContent).toBe('correct');
});

test('Flow activity page - shows inorrect button', () => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(gameStatusAtom, GameStatus.InFlowActivity);
    set(gameCurrentsAtom, { currentQuestion: 1, currentActivity: info.activities[0], currentRound: 0 });
  };

  render(<FlowActivityPage />, {}, initializeState);
  const buttons = screen.getAllByRole('button');

  expect(buttons.length).toBe(2);
  expect(buttons[1].textContent).toBe('incorrect');
});

test('Flow activity page - pressing correct button advances to next question', () => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(gameStatusAtom, GameStatus.InFlowActivity);
    set(gameCurrentsAtom, { currentQuestion: 1, currentActivity: info.activities[0], currentRound: 0 });
  };

  // we need this to track when state changes
  const onChange = vi.fn();

  render(
    <>
      <RecoilObserver node={gameCurrentsAtom} onChange={onChange} />
      <FlowActivityPage />
    </>,
    {},
    initializeState
  );
  const buttons = screen.getAllByRole('button');

  fireEvent.click(buttons[0]);
  expect(onChange).toHaveBeenCalledWith({ currentQuestion: 2, currentRound: 0, currentActivity: info.activities[0] });
});

test('Flow activity page - pressing incorrect button advances to results when on last question', () => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(gameStatusAtom, GameStatus.InFlowActivity);
    set(gameCurrentsAtom, { currentQuestion: 5, currentActivity: info.activities[0], currentRound: 0 });
  };

  // we need this to track when state changes
  const onChangeCurrents = vi.fn();
  const onChangeStatus = vi.fn();

  render(
    <>
      <RecoilObserver node={gameCurrentsAtom} onChange={onChangeCurrents} />
      <RecoilObserver node={gameStatusAtom} onChange={onChangeStatus} />
      <FlowActivityPage />
    </>,
    {},
    initializeState
  );
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[1]);

  expect(onChangeCurrents).toHaveBeenCalledWith({
    currentQuestion: 0,
    currentRound: 0,
    currentActivity: info.activities[0],
  });
  expect(onChangeStatus).toHaveBeenCalledWith(GameStatus.ShowResults);
});
