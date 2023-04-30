import { RecoilObserver, fireEvent, getMockQuestions, render, screen } from '../../setup/test-helpers';
import { gameCurrentsAtom, gameStatusAtom } from '../app-state/atoms';
import { GameStatus } from '../app-state/state-types';
import { RoundsActivityPage } from './RoundsActivityPage';
import { test, expect, vi } from 'vitest';
import { MutableSnapshot } from 'recoil';

test('Rounds activity page - expect exception when activity not set', () => {
  expect(() => render(<RoundsActivityPage />)).toThrowError('Activity has not been set');
});

const info = getMockQuestions();

test('Rounds activity page - shows header correctly', () => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(gameStatusAtom, GameStatus.InRoundsActivity);
    set(gameCurrentsAtom, { currentQuestion: 1, currentActivity: info.activities[1], currentRound: 1 });
  };

  render(<RoundsActivityPage />, {}, initializeState);

  expect(screen.getByText('Activity One')).toBeDefined();
});

test('Rounds activity page - shows question correctly', () => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(gameStatusAtom, GameStatus.InRoundsActivity);
    set(gameCurrentsAtom, { currentQuestion: 1, currentActivity: info.activities[1], currentRound: 1 });
  };

  render(<RoundsActivityPage />, {}, initializeState);

  expect(screen.getByText('Watching films at home is <b>more cheaper</b> than at the cinema.')).toBeDefined();
});

test('Rounds activity page - shows correct button', () => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(gameStatusAtom, GameStatus.InRoundsActivity);
    set(gameCurrentsAtom, { currentQuestion: 1, currentActivity: info.activities[1], currentRound: 1 });
  };

  render(<RoundsActivityPage />, {}, initializeState);
  const buttons = screen.getAllByRole('button');

  expect(buttons.length).toBe(2);
  expect(buttons[0].textContent).toBe('correct');
});

test('Rounds activity page - shows inorrect button', () => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(gameStatusAtom, GameStatus.InRoundsActivity);
    set(gameCurrentsAtom, { currentQuestion: 1, currentActivity: info.activities[1], currentRound: 1 });
  };

  render(<RoundsActivityPage />, {}, initializeState);
  const buttons = screen.getAllByRole('button');

  expect(buttons.length).toBe(2);
  expect(buttons[1].textContent).toBe('incorrect');
});

test('Rounds activity page - pressing correct button advances to next question', () => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(gameStatusAtom, GameStatus.InRoundsActivity);
    set(gameCurrentsAtom, { currentQuestion: 1, currentActivity: info.activities[1], currentRound: 1 });
  };

  // we need this to track when state changes
  const onChange = vi.fn();

  render(
    <>
      <RecoilObserver node={gameCurrentsAtom} onChange={onChange} />
      <RoundsActivityPage />
    </>,
    {},
    initializeState
  );
  const buttons = screen.getAllByRole('button');

  fireEvent.click(buttons[0]);
  expect(onChange).toHaveBeenCalledWith({ currentQuestion: 2, currentRound: 1, currentActivity: info.activities[1] });
});

test('Rounds activity page - pressing incorrect button advances to end of round when on last question', () => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(gameStatusAtom, GameStatus.InRoundsActivity);
    set(gameCurrentsAtom, { currentQuestion: 5, currentActivity: info.activities[1], currentRound: 1 });
  };

  // we need this to track when state changes
  const onChangeCurrents = vi.fn();
  const onChangeStatus = vi.fn();

  render(
    <>
      <RecoilObserver node={gameCurrentsAtom} onChange={onChangeCurrents} />
      <RecoilObserver node={gameStatusAtom} onChange={onChangeStatus} />
      <RoundsActivityPage />
    </>,
    {},
    initializeState
  );
  const buttons = screen.getAllByRole('button');
  fireEvent.click(buttons[1]);

  expect(onChangeCurrents).toHaveBeenCalledWith({
    currentQuestion: 0,
    currentRound: 1,
    currentActivity: info.activities[1],
  });
  expect(onChangeStatus).toHaveBeenCalledWith(GameStatus.ShowResults);
});
