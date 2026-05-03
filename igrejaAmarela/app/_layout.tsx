import { Stack, router } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { auth } from '../src/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';

export default function RootLayout() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Se NÃO estiver logado e tentar acessar o drawer, redireciona para login
      if (!user) {
        // Verifica se a rota atual não é a de login
        // Isso evita redirecionamento infinito
        router.replace('/');
      }
    });
    return unsubscribe;
  }, []);

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