import { RecoilObserver, fireEvent, render, screen, waitFor } from '../../setup/test-helpers';
import { gameStatusAtom } from '../app-state/atoms';
import { test, expect, vi } from 'vitest';
import { HomePage } from './HomePage';
import { getStep } from '../app-state/state-machine';
import { getGameInfo } from '../app-state/game-info';

test('Home page - shows all activities', async () => {
    render(<HomePage />);

    // need to wait for async fetch of dummy data
    await waitFor(() => getGameInfo);
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

    await waitFor(() => getGameInfo);
    // get the activities
    const activities = await screen.findAllByRole('link');
    // we need to choose one
    fireEvent.click(activities[0]);

    expect(onChangeStatus).toHaveBeenCalledWith(getStep(1, 1));
});
