import { ProbabilityItem } from '../types';

export const selectWinner = (validItems: ProbabilityItem[]): string => {
  const totalProbability = validItems.reduce(
    (sum, item) => sum + item.probability,
    0
  );
  const random = Math.random() * totalProbability;

  let accumulator = 0;
  for (const item of validItems) {
    accumulator += item.probability;
    if (random <= accumulator) {
      return item.name;
    }
  }

  return validItems[validItems.length - 1].name;
};

export const validateItems = (items: ProbabilityItem[]): ProbabilityItem[] => {
  return items.filter(
    (item) => item.name.trim() !== '' && item.probability > 0
  );
};

export const calculateTotalProbability = (items: ProbabilityItem[]): number => {
  return items.reduce((sum, item) => sum + (item.probability || 0), 0);
};
