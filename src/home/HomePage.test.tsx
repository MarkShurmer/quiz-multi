import { RecoilObserver, fireEvent, render, screen } from '../../setup/test-helpers';
import { gameStatusAtom } from '../app-state/atoms';
import { GameStatus } from '../app-state/state-types';
import { test, expect, vi } from 'vitest';
import { HomePage } from './HomePage';

test('Home page - shows all activities', async () => {
  render(<HomePage />);

  const activities = await screen.findAllByRole('link');

  expect(activities.length).toBe(5);
});

test('Home page - choosing activity one sets in in motion', async () => {
  const onChangeStatus = vi.fn();

  render(
    <>
      <RecoilObserver node={gameStatusAtom} onChange={onChangeStatus} />
      <HomePage />
    </>
  );

  // get the activities
  const activities = await screen.findAllByRole('link');
  // we need to choose one
  fireEvent.click(activities[0]);

  expect(onChangeStatus).toHaveBeenCalledWith(GameStatus.InFlowActivity);
});
