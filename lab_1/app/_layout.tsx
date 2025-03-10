import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ThemedView style={styles.container}>
        <Stack
          screenOptions={{
            headerTitle: () => (
              <Image
                style={styles.image}
                source={require('@/assets/images/logo.png')}
              />
            ),
            headerRight: () => <Text style={styles.title}>FirstMobileApp</Text>,
          }}
        >
          <Stack.Screen name='(tabs)' />
          <Stack.Screen name='+not-found' />
        </Stack>
        <SafeAreaView style={styles.footer}>
          <ThemedText style={styles.footerText}>
            Маньківський Владислав Вячеславович, ВТ-21-1
          </ThemedText>
          {/* Add more footer content here */}
        </SafeAreaView>
      </ThemedView>
      <StatusBar style='auto' />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 2,
    borderTopColor: '#e0e0e0',
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 12,
    fontStyle: 'italic',
  },
  image: {
    resizeMode: 'contain',
    width: 100,
    height: 50,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 16,
  },
});
