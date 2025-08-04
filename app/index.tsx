import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface ProbabilityItem {
  id: number;
  name: string;
  probability: number;
}

export default function HomeScreen() {
  const [items, setItems] = useState<ProbabilityItem[]>([
    { id: 1, name: '', probability: 0 },
    { id: 2, name: '', probability: 0 },
  ]);

  const addItem = () => {
    if (items.length < 100) {
      const newId = Math.max(...items.map((item) => item.id)) + 1;
      setItems([...items, { id: newId, name: '', probability: 0 }]);
    }
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (
    id: number,
    field: 'name' | 'probability',
    value: string
  ) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: field === 'probability' ? parseFloat(value) || 0 : value,
            }
          : item
      )
    );
  };

  const validateAndSubmit = () => {
    const validItems = items.filter(
      (item) => item.name.trim() !== '' && item.probability > 0
    );

    if (validItems.length === 0) {
      Alert.alert(
        'Error',
        'Please add at least one item with a name and probability greater than 0.'
      );
      return;
    }

    const totalProbability = validItems.reduce(
      (sum, item) => sum + item.probability,
      0
    );

    // Check if total probability is exactly 100%
    if (Math.abs(totalProbability - 100) > 0.01) {
      if (totalProbability < 100) {
        Alert.alert(
          'Invalid Probability Total',
          `The total probability is ${totalProbability.toFixed(1)}%. Please adjust your probabilities to equal exactly 100%.`
        );
      } else {
        Alert.alert(
          'Invalid Probability Total',
          `The total probability is ${totalProbability.toFixed(1)}%. Please reduce your probabilities to equal exactly 100%.`
        );
      }
      return;
    }

    // Navigate to spin page with the valid items
    router.push({
      pathname: '/spin',
      params: {
        items: JSON.stringify(validItems),
      },
    });
  };

  const getTotalProbability = () => {
    return items.reduce((sum, item) => sum + (item.probability || 0), 0);
  };

  const getTotalProbabilityColor = () => {
    const total = getTotalProbability();
    if (Math.abs(total - 100) < 0.01) {
      return 'text-green-500'; // Green when exactly 100%
    } else if (total > 100) {
      return 'text-red-500'; // Red when over 100%
    } else {
      return 'text-yellow-500'; // Yellow when under 100%
    }
  };

  const canSpin = () => {
    const validItems = items.filter(
      (item) => item.name.trim() !== '' && item.probability > 0
    );
    const totalProbability = validItems.reduce(
      (sum, item) => sum + item.probability,
      0
    );
    return validItems.length > 0 && Math.abs(totalProbability - 100) < 0.01;
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1">
        {/* Scrollable Content */}
        <ScrollView
          className="flex-1 p-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {/* Header */}
          <View className="items-center mb-8">
            <Text className="text-4xl font-bold text-white mb-2">
              🎲 Probability Game
            </Text>
            <Text className="text-base text-gray-400 text-center mb-5">
              Set custom probabilities and let fate decide!
            </Text>

            <View className="flex-row gap-3">
              <TouchableOpacity
                className="bg-card px-4 py-2 rounded-2xl"
                onPress={() => router.push('/history')}
              >
                <Text className="text-primary text-sm font-medium">
                  📊 History
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-card px-4 py-2 rounded-2xl"
                onPress={() => router.push('/settings')}
              >
                <Text className="text-primary text-sm font-medium">
                  ⚙️ Settings
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Items Section */}
          <View className="mb-8">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-semibold text-white">
                Items & Probabilities
              </Text>
              <Text
                className={`text-base font-medium ${getTotalProbabilityColor()}`}
              >
                Total: {getTotalProbability().toFixed(1)}%
              </Text>
            </View>

            {items.map((item, index) => (
              <View
                key={item.id}
                className="flex-row items-center mb-3 bg-card rounded-xl p-3"
              >
                <View className="w-8 h-8 rounded-full bg-primary justify-center items-center mr-3">
                  <Text className="text-white font-bold text-sm">
                    {index + 1}
                  </Text>
                </View>

                <TextInput
                  className="flex-1 h-10 bg-input rounded-lg px-3 text-white text-base mr-3"
                  placeholder="Item name"
                  placeholderTextColor="#999"
                  value={item.name}
                  onChangeText={(text) => updateItem(item.id, 'name', text)}
                />

                <TextInput
                  className="w-20 h-10 bg-input rounded-lg px-3 text-white text-base text-center mr-2"
                  placeholder="0.0%"
                  placeholderTextColor="#999"
                  value={item.probability > 0 ? `${item.probability}%` : ''}
                  onChangeText={(text) => {
                    // Remove % symbol and parse the number
                    const numericValue = text.replace('%', '');
                    updateItem(item.id, 'probability', numericValue);
                  }}
                  keyboardType="numeric"
                />

                {items.length > 1 && (
                  <TouchableOpacity
                    className="w-8 h-8 rounded-full bg-danger justify-center items-center"
                    onPress={() => removeItem(item.id)}
                  >
                    <Text className="text-white text-xl font-bold">×</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}

            {items.length < 100 && (
              <TouchableOpacity
                className="bg-primary rounded-xl p-4 items-center mt-3"
                onPress={addItem}
              >
                <Text className="text-white text-base font-semibold">
                  + Add Item ({items.length}/100)
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>

        {/* Fixed Bottom Section */}
        <View className="bg-background border-t border-card px-5 py-4">
          {/* Submit Button */}
          <TouchableOpacity
            className={`${!canSpin() ? 'bg-disabled' : 'bg-primary'} rounded-2xl p-5 items-center mb-4`}
            onPress={validateAndSubmit}
            disabled={!canSpin()}
          >
            <Text className="text-white text-lg font-bold">
              🎲 Roll the Dice!
            </Text>
          </TouchableOpacity>

          {/* Footer */}
          <View className="items-center">
            <Text className="text-gray-400 text-sm text-center italic">
              💡 Tip: Total probability must equal exactly 100% to roll the dice
            </Text>
            <Text className="text-gray-400 text-xs text-center mt-1">
              🎯 Higher percentages = higher chance of being selected
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
