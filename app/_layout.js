import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require('../assets/fonts/Inter_24pt-Regular.ttf'),
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
      <Stack screenOptions={{ headerShown: false }}> 
          <Stack.Screen name="(authroutes)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="chat/detail" options={{ headerShown: false }} />
          <Stack.Screen name="chat/reportUserPage" options={{ headerShown: false }} />
          <Stack.Screen name="chat/userProfilePage" options={{ headerShown: false }} />
          <Stack.Screen name="sidebarPage/myProfile" options={{ headerShown: false }} />
          <Stack.Screen name="sidebarPage/settings" options={{ headerShown: false }} />
          <Stack.Screen name="sidebarPage/verifyMe" options={{ headerShown: false }} />
          <Stack.Screen name="sidebarPage/changeAppIcon" options={{ headerShown: false }} />
        <Stack.Screen name="sidebarPage/submitTicket" options={{ headerShown: false }} />
          <Stack.Screen name="sidebarPage/blockedUserPage" options={{ headerShown: false }} />
          <Stack.Screen name="sidebarPage/myAccountPage" options={{ headerShown: false }} />
          <Stack.Screen name="sidebarPage/safetyResourcesPage" options={{ headerShown: false }} />
          <Stack.Screen name="sidebarPage/userPoliciesPage" options={{ headerShown: false }} />

          <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
