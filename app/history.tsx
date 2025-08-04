import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function HistoryScreen() {
  const mockHistory = [
    {
      id: 1,
      winner: 'Pizza',
      date: '2024-01-15',
      items: ['Pizza', 'Burger', 'Sushi'],
    },
    {
      id: 2,
      winner: 'Movie Night',
      date: '2024-01-14',
      items: ['Movie Night', 'Gaming', 'Reading'],
    },
    {
      id: 3,
      winner: 'Coffee',
      date: '2024-01-13',
      items: ['Coffee', 'Tea', 'Juice'],
    },
  ];

  return (
    <ScrollView className="flex-1 bg-background p-5">
      <View className="items-center mb-8 mt-5">
        <Text className="text-3xl font-bold text-white mb-2">Game History</Text>
        <Text className="text-base text-gray-400 text-center">
          Your previous game results
        </Text>
      </View>

      <View className="mb-8">
        {mockHistory.map((game) => (
          <View key={game.id} className="bg-card rounded-xl p-4 mb-3">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-lg font-bold text-primary">
                🏆 {game.winner}
              </Text>
              <Text className="text-sm text-gray-400">{game.date}</Text>
            </View>
            <Text className="text-sm text-white">
              Options: {game.items.join(', ')}
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        className="bg-danger rounded-xl p-4 items-center mb-4"
        onPress={() => alert('History cleared!')}
      >
        <Text className="text-white text-base font-semibold">
          Clear History
        </Text>
      </TouchableOpacity>

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
