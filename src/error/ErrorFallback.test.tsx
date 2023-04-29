import { ErrorFallback } from './ErrorFallback';
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

test('ErrorFallback - displays error', () => {
  render(<ErrorFallback error={new Error('Server related')} />);

  expect(screen.getByRole('status')).toHaveTextContent('Server related');
});
