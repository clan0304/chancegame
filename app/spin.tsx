import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Animated,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface ProbabilityItem {
  id: number;
  name: string;
  probability: number;
}

export default function SpinScreen() {
  const params = useLocalSearchParams();
  const [isSpinning, setIsSpinning] = useState(true);
  const [result, setResult] = useState<string>('');
  const [spinValue] = useState(new Animated.Value(0));

  // Parse the items from the URL params with useMemo to prevent unnecessary re-renders
  const items: ProbabilityItem[] = useMemo(() => {
    return params.items ? JSON.parse(params.items as string) : [];
  }, [params.items]);

  useEffect(() => {
    // Start spinning animation
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );

    spinAnimation.start();

    // Stop spinning after 3 seconds and show result
    const timer = setTimeout(() => {
      spinAnimation.stop();
      const winner = selectWinner(items);
      setResult(winner);
      setIsSpinning(false);

      // Final spin to winner position
      Animated.timing(spinValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, 3000);

    return () => {
      clearTimeout(timer);
      spinAnimation.stop();
    };
  }, [items, spinValue]);

  const selectWinner = (validItems: ProbabilityItem[]): string => {
    const random = Math.random() * 100;

    let accumulator = 0;
    for (const item of validItems) {
      accumulator += item.probability;
      if (random <= accumulator) {
        return item.name;
      }
    }

    return validItems[validItems.length - 1].name;
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center items-center p-5">
        {/* Back Button */}
        <TouchableOpacity
          className="absolute top-12 left-5 bg-card p-3 rounded-full z-10"
          onPress={() => router.back()}
        >
          <Text className="text-white text-lg">←</Text>
        </TouchableOpacity>

        {/* Spinning Section */}
        {isSpinning && (
          <View className="items-center">
            <Animated.View
              className="w-32 h-32 justify-center items-center mb-8"
              style={{ transform: [{ rotate: spin }] }}
            >
              <Text className="text-8xl">🎯</Text>
            </Animated.View>

            <Text className="text-primary text-2xl font-bold mb-4">
              Rolling the dice...
            </Text>

            <Text className="text-gray-400 text-base text-center">
              Calculating your destiny! ✨
            </Text>

            {/* Loading dots */}
            <View className="flex-row mt-6">
              {[0, 1, 2].map((index) => (
                <Animated.View
                  key={index}
                  className="w-3 h-3 bg-primary rounded-full mx-1"
                  style={{
                    opacity: spinValue.interpolate({
                      inputRange: [0, 0.33, 0.66, 1],
                      outputRange:
                        index === 0
                          ? [1, 0.3, 0.3, 1]
                          : index === 1
                            ? [0.3, 1, 0.3, 0.3]
                            : [0.3, 0.3, 1, 0.3],
                    }),
                  }}
                />
              ))}
            </View>
          </View>
        )}

        {/* Result Section */}
        {result && !isSpinning && (
          <View className="items-center">
            <Text className="text-gray-400 text-xl mb-4">🎉 Winner! 🎉</Text>

            <View className="bg-card rounded-3xl p-8 items-center border-4 border-primary mb-8">
              <Text className="text-white text-4xl font-bold text-center mb-4">
                {result}
              </Text>
              <Text className="text-6xl">🏆</Text>
            </View>

            <Text className="text-gray-400 text-base text-center mb-8">
              Congratulations! The dice have spoken! 🎲
            </Text>

            {/* Action Buttons */}
            <View className="w-full max-w-xs">
              <TouchableOpacity
                className="bg-primary rounded-2xl p-4 items-center mb-4"
                onPress={() => router.back()}
              >
                <Text className="text-white text-lg font-bold">
                  🎲 Roll Again
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-card rounded-2xl p-4 items-center"
                onPress={() => router.push('/history')}
              >
                <Text className="text-primary text-base font-semibold">
                  📊 View History
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Items Preview (Small) */}
        <View className="absolute bottom-8 left-5 right-5">
          <Text className="text-gray-500 text-sm text-center mb-2">
            Your items:
          </Text>
          <View className="flex-row flex-wrap justify-center">
            {items.map((item, index) => (
              <View key={item.id} className="bg-input rounded-lg px-3 py-1 m-1">
                <Text className="text-gray-300 text-xs">
                  {item.name} ({item.probability}%)
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
