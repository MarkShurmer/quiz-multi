/* c8 ignore next 30 */
import { getApiUrl } from './api-helper';

export async function getGameData() {
  const resp = await fetch(getApiUrl());
  if (resp.ok) {
    return await resp.json();
  }

  throw new Error(resp.statusText);
}
