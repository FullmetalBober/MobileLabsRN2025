import '../global.css';

import { Stack } from 'expo-router';
import { useEffect } from 'react';
import Constants from 'expo-constants';
import { OneSignal, LogLevel } from 'react-native-onesignal';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

export default function RootLayout() {
  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(Constants.expoConfig?.extra?.oneSignalAppId);

    OneSignal.Notifications.requestPermission(true);

    OneSignal.login('vt211_mvv');
    OneSignal.User.pushSubscription.optIn();

    OneSignal.Notifications.addEventListener('foregroundWillDisplay', (event) => {
      event.preventDefault();
      event.notification.display();
    });
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
