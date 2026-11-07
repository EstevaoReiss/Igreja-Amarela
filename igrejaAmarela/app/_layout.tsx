import { Stack, router, useSegments } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { auth } from '../src/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';

export default function RootLayout() {
  const segments: string[] = useSegments();
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setAuthReady(true);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!authReady) return;

    const currentRoute = segments[0];
    const isDrawerRoute = currentRoute === '(drawer)';
    const isLoginRoute = segments.length === 0;
    const isVerificationRoute = currentRoute === 'verificar-email';

    if (!user) {
      if (isDrawerRoute || isVerificationRoute) router.replace('/');
      return;
    }

    if (!user.emailVerified) {
      if (isDrawerRoute || isLoginRoute) router.replace('/verificar-email');
      return;
    }

    if (isLoginRoute || isVerificationRoute) {
      router.replace('/(drawer)/(tabs)');
    }
  }, [authReady, segments, user]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        {/* Tela de Login - SEM header */}
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false 
          }} 
        />
        
        {/* Drawer - COM todas as telas principais */}
        <Stack.Screen 
          name="(drawer)" 
          options={{ 
            headerShown: false 
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}