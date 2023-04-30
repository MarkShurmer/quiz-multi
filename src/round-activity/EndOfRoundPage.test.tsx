import { RecoilObserver, fireEvent, getMockQuestions, render, screen } from '../../setup/test-helpers';
import { gameCurrentsAtom, gameStatusAtom } from '../app-state/atoms';
import { GameStatus } from '../app-state/state-types';
import { EndOfRoundPage } from './EndOfRoundPage';
import { test, expect, vi } from 'vitest';
import { MutableSnapshot } from 'recoil';

test('End of Round page - expect exception when activity not set', () => {
  expect(() => render(<EndOfRoundPage />)).toThrowError('Activity has not been set');
});

const info = getMockQuestions();

test('End of Round page - shows header correctly', () => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(gameStatusAtom, GameStatus.InRoundsActivity);
    set(gameCurrentsAtom, { currentQuestion: 1, currentActivity: info.activities[1], currentRound: 1 });
  };

  render(<EndOfRoundPage />, {}, initializeState);

  expect(screen.getByText('ROUND 1')).toBeDefined();
});

test('End of Round page - shows text correctly for first round', () => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(gameStatusAtom, GameStatus.InRoundsActivity);
    set(gameCurrentsAtom, { currentQuestion: 1, currentActivity: info.activities[1], currentRound: 1 });
  };

  render(<EndOfRoundPage />, {}, initializeState);

  expect(screen.getByText('The round is finished, press Next to go to next round of questions')).toBeDefined();
});

test('End of Round page - shows text correctly for last round', async () => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(gameStatusAtom, GameStatus.InRoundsActivity);
    set(gameCurrentsAtom, { currentQuestion: 2, currentActivity: info.activities[1], currentRound: 2 });
  };

  render(<EndOfRoundPage />, {}, initializeState);

  expect(await screen.findByText("That's all the questions done, press Next to see results")).toBeDefined();
});

test('End of Round page - shows next button', () => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(gameStatusAtom, GameStatus.InRoundsActivity);
    set(gameCurrentsAtom, { currentQuestion: 1, currentActivity: info.activities[1], currentRound: 1 });
  };

  render(<EndOfRoundPage />, {}, initializeState);
  const buttons = screen.getAllByRole('button');

  expect(buttons.length).toBe(1);
  expect(buttons[0].textContent).toBe('next');
});

test('End of Round page - pressing next button advances to next round', () => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(gameStatusAtom, GameStatus.InRoundsActivity);
    set(gameCurrentsAtom, { currentQuestion: 1, currentActivity: info.activities[1], currentRound: 1 });
  };

  // we need this to track when state changes
  const onChange = vi.fn();

  render(
    <>
      <RecoilObserver node={gameCurrentsAtom} onChange={onChange} />
      <EndOfRoundPage />
    </>,
    {},
    initializeState
  );
  const buttons = screen.getAllByRole('button');

  fireEvent.click(buttons[0]);
  expect(onChange).toHaveBeenCalledWith({ currentQuestion: 1, currentRound: 2, currentActivity: info.activities[1] });
});

test('End of Round page - pressing next button on last round advances to results', () => {
  const initializeState = ({ set }: MutableSnapshot) => {
    set(gameStatusAtom, GameStatus.InRoundsActivity);
    set(gameCurrentsAtom, { currentQuestion: 2, currentActivity: info.activities[1], currentRound: 2 });
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
  const buttons = screen.getAllByRole('button');

  fireEvent.click(buttons[0]);
  expect(onChange).toHaveBeenCalledWith(GameStatus.ShowResults);
});
