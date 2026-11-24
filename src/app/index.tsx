import { Redirect } from 'expo-router';
import { Platform } from 'react-native';

import { useApp } from '@/state/app-context';

/**
 * Entry route.
 *
 * Expo Router matches the app's initial URL (`/`) here. There is no dedicated
 * home screen: the conversation list owns the "nothing yet" state, offering an
 * "add account" action until a first account exists, so handing over to it
 * keeps first-run onboarding in one place.
 */
export default function Index() {
  const { service } = useApp();
  // First launch: ask for notifications and battery before the inbox (not on
  // the web test build, which has neither).
  if (Platform.OS !== 'web' && !service.getSettings().permissionsIntroDone) {
    return <Redirect href="/welcome" />;
  }
  return <Redirect href="/discussions" />;
}
