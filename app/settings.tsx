import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);

  return (
    <ScrollView className="flex-1 bg-background p-5">
      <View className="items-center mb-8 mt-5">
        <Text className="text-3xl font-bold text-white mb-2">Settings</Text>
        <Text className="text-base text-gray-400 text-center">
          Customize your game experience
        </Text>
      </View>

      <View className="mb-8">
        <Text className="text-xl font-semibold text-white mb-4">
          Preferences
        </Text>

        <View className="flex-row justify-between items-center bg-card rounded-xl p-4 mb-3">
          <Text className="text-base text-white">Sound Effects</Text>
          <Switch
            value={soundEnabled}
            onValueChange={setSoundEnabled}
            trackColor={{ false: '#767577', true: '#4ecdc4' }}
            thumbColor={soundEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View className="flex-row justify-between items-center bg-card rounded-xl p-4 mb-3">
          <Text className="text-base text-white">Animations</Text>
          <Switch
            value={animationsEnabled}
            onValueChange={setAnimationsEnabled}
            trackColor={{ false: '#767577', true: '#4ecdc4' }}
            thumbColor={animationsEnabled ? '#fff' : '#f4f3f4'}
          />
        </View>

        <View className="flex-row justify-between items-center bg-card rounded-xl p-4 mb-3">
          <Text className="text-base text-white">Haptic Feedback</Text>
          <Switch
            value={hapticFeedback}
            onValueChange={setHapticFeedback}
            trackColor={{ false: '#767577', true: '#4ecdc4' }}
            thumbColor={hapticFeedback ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>

      <View className="mb-8">
        <Text className="text-xl font-semibold text-white mb-4">About</Text>

        <View className="flex-row justify-between items-center bg-card rounded-xl p-4 mb-3">
          <Text className="text-base text-white">Version</Text>
          <Text className="text-base text-primary">1.0.0</Text>
        </View>

        <View className="flex-row justify-between items-center bg-card rounded-xl p-4 mb-3">
          <Text className="text-base text-white">Build</Text>
          <Text className="text-base text-primary">2024.01.15</Text>
        </View>
      </View>

      <TouchableOpacity
        className="bg-primary rounded-xl p-4 items-center"
        onPress={() => router.back()}
      >
        <Text className="text-white text-base font-semibold">
          ← Back to Game
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
