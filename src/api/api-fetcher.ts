import { Game } from '../app-state/state-types';
import { API_URL_DEV, API_URL } from './api-constants';

const urlMap: Record<string, string> = {
  development: API_URL_DEV,
  production: API_URL,
};

export function getApiUrl() {
  return urlMap[process.env.NODE_ENV ?? 'development'];
}

export function fetcher(url: string): Promise<Game> {
  return fetch(url).then((resp) => {
    if (resp.ok) {
      return resp.json();
    }
    // bad response, so throw
    throw new Error(resp.statusText);
  });
}
