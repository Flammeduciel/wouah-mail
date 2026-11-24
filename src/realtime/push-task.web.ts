/** Web build: no background task and no push (the open tab syncs on its own). */

export const GMAIL_PUSH_TASK = 'wouah-mail.gmail-push';

export function setRunningAppPushHandler(_handler: (() => Promise<void>) | null): void {}

export async function prepareGmailPush(): Promise<string | null> {
  return null;
}
