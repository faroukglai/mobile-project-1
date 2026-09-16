import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: { backgroundColor: '#0D0D12' },
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="home" />
      <Stack.Screen name="invoice" />
      <Stack.Screen name="time-off" />
      <Stack.Screen name="tracking" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="more" options={{ animation: 'slide_from_right' }} />
    </Stack>
  );
}
