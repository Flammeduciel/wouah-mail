/**
 * Short confirmation message (« Signalé comme spam »...). Android shows its
 * native toast; the web build shows the same kind of bubble at the bottom of
 * the page (ToastAndroid does not exist there).
 */

import { Platform, ToastAndroid } from 'react-native';

const LONG_MS = 3500;
const SHORT_MS = 2000;

function showWebToast(message: string, durationMs: number): void {
  if (typeof document === 'undefined') return;
  const bubble = document.createElement('div');
  bubble.textContent = message;
  bubble.setAttribute('role', 'status');
  Object.assign(bubble.style, {
    position: 'fixed',
    left: '50%',
    bottom: '96px',
    transform: 'translateX(-50%)',
    background: 'rgba(32, 33, 36, 0.92)',
    color: '#fff',
    padding: '10px 16px',
    borderRadius: '20px',
    font: '14px system-ui, sans-serif',
    zIndex: '9999',
    maxWidth: '80vw',
    textAlign: 'center',
  });
  document.body.appendChild(bubble);
  setTimeout(() => bubble.remove(), durationMs);
}

export function showToast(message: string, long = false): void {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, long ? ToastAndroid.LONG : ToastAndroid.SHORT);
  } else if (Platform.OS === 'web') {
    showWebToast(message, long ? LONG_MS : SHORT_MS);
  }
}
