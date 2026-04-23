import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

// Importar suas telas
import LoginScreen from './src/screens/LoginScreen';
import TabsLayout from './src/navigation/TabsLayout'; // Vamos criar esse arquivo

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Tela de Login será a primeira */}
          <Stack.Screen name="Login" component={LoginScreen} />
          
          {/* Depois do login, mostra as tabs */}
          <Stack.Screen name="MainTabs" component={TabsLayout} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}