/**
 * Web build token storage. Browsers have no Keystore: the access token lives in
 * this browser's localStorage. The web build signs in without a refresh token
 * (short-lived access token only), so a leaked value expires within the hour.
 */

import type { OAuthTokens, TokenStore } from '@/providers/types';

const KEY_PREFIX = 'mailyo.tokens.';

const storage = (): Storage | null => (typeof localStorage === 'undefined' ? null : localStorage);

export class SecureTokenStore implements TokenStore {
  async save(accountId: string, tokens: OAuthTokens): Promise<void> {
    storage()?.setItem(`${KEY_PREFIX}${accountId}`, JSON.stringify(tokens));
  }

  async load(accountId: string): Promise<OAuthTokens | null> {
    const raw = storage()?.getItem(`${KEY_PREFIX}${accountId}`) ?? null;
    return raw === null ? null : (JSON.parse(raw) as OAuthTokens);
  }

  async remove(accountId: string): Promise<void> {
    storage()?.removeItem(`${KEY_PREFIX}${accountId}`);
  }
}
