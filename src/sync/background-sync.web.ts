/** Web build: no background sync (the open tab syncs on its own). */

export const BACKGROUND_SYNC_TASK = 'mailyo.background-sync';

export async function registerBackgroundSync(_minimumIntervalMinutes = 15): Promise<boolean> {
  return false;
}

export async function isBackgroundSyncRegistered(): Promise<boolean> {
  return false;
}

export async function unregisterBackgroundSync(): Promise<void> {}
