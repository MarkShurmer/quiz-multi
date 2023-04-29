import { ActivityType } from '../app-state/state-types';
import { convertToGameInfo } from './api-helper';
import { test, expect, vi } from 'vitest';

test('should convert empty correctly', () => {
  const result = convertToGameInfo({
    heading: '',
    name: 'abc',
    activities: [],
  });

  expect(result).toEqual({ name: 'abc', activities: [] });
});

test('should convert flow activity correctly', () => {
  const result = convertToGameInfo({
    heading: '',
    name: 'game2',
    activities: [
      {
        order: 1,
        activity_name: 'act1',
        questions: [
          {
            feedback: 'abc',
            is_correct: false,
            order: 1,
            stimulus: 'dont play abamayang',
          },
          {
            feedback: 'abcd',
            is_correct: false,
            order: 2,
            stimulus: 'dont play cuccerella',
          },
        ],
      },
    ],
  });

  expect(result).toEqual({
    name: 'game2',
    activities: [
      {
        name: 'act1',
        type: ActivityType.Flow,
        questions: [
          { text: 'dont play abamayang', num: 1 },
          { text: 'dont play cuccerella', num: 2 },
        ],
      },
    ],
  });
});

test('should convert rounds activity correctly', () => {
  const result = convertToGameInfo({
    heading: '',
    name: 'game2',
    activities: [
      {
        order: 2,
        activity_name: 'act2',
        questions: [
          {
            round_title: 'round 1',
            order: 1,
            questions: [
              {
                feedback: 'abc',
                is_correct: false,
                order: 1,
                stimulus: 'play lauren bell',
              },
              {
                feedback: 'abcd',
                is_correct: false,
                order: 2,
                stimulus: 'play izzy wong',
              },
            ],
          },
        ],
      },
    ],
  });

  expect(result).toEqual({
    name: 'game2',
    activities: [
      {
        name: 'act2',
        type: ActivityType.Rounds,
        rounds: [
          {
            name: 'round 1',
            num: 1,
            questions: [
              { text: 'play lauren bell', num: 1 },
              { text: 'play izzy wong', num: 2 },
            ],
          },
        ],
      },
    ],
  });
});

test('getUrl should get s3 bucket for prod', async () => {
  vi.resetModules();
  process.env.NODE_ENV = 'production';
  const getUrlFunc = (await import('./api-helper.ts')).getApiUrl;

  expect(getUrlFunc()).toContain('s3.eu-west');
  process.env.NODE_ENV = 'test';
});

test('getUrl should get localhost for dev', async () => {
  vi.resetModules();
  process.env.NODE_ENV = 'development';
  const getUrlFunc = (await import('./api-helper.ts')).getApiUrl;

  expect(getUrlFunc()).toContain('localhost');
  process.env.NODE_ENV = 'test';
});

test('getUrl should get localhost for nothing', async () => {
  vi.resetModules();
  delete process.env.NODE_ENV;
  const getUrlFunc = (await import('./api-helper.ts')).getApiUrl;

  expect(getUrlFunc()).toContain('localhost');
  process.env.NODE_ENV = 'test';
});
