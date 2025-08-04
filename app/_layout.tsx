import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import '../global.css';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a1a2e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          contentStyle: {
            backgroundColor: '#1a1a2e',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: '🎲 Probability Game',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="spin"
          options={{
            title: 'Rolling Dice...',
            headerShown: false,
            presentation: 'fullScreenModal',
            gestureEnabled: false, // Prevent swipe to go back during spinning
          }}
        />
        <Stack.Screen
          name="history"
          options={{
            title: 'Game History',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: 'Settings',
            presentation: 'modal',
          }}
        />
      </Stack>
    </>
  );
}
