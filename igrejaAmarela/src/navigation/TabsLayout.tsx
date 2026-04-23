import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Importar suas telas
import HomeScreen from '../screens/HomeScreen';


const Tab = createBottomTabNavigator();

export default function TabsLayout() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Início') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Eventos') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Pedidos') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#F2CC39',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#F2CC39',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} />

    </Tab.Navigator>
  );
}