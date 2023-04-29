/* eslint-disable @typescript-eslint/no-empty-function */
import { expect, afterEach, vi, beforeAll, Mock } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import data from '../public/data.json';
import { getGameData } from '../src/api/api-fetch';

vi.mock('../src/api/api-fetch');

beforeAll(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  (getGameData as Mock).mockResolvedValue(data);
});

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
