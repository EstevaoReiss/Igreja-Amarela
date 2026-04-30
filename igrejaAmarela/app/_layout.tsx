
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
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