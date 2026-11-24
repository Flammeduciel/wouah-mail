/**
 * Web build: Google sends the sign-in popup back to this page; the root layout
 * hands the result to the main window and the popup closes.
 */

import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default function OAuthRedirect() {
  return (
    <View style={styles.screen}>
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
