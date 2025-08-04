export interface ProbabilityItem {
  id: number;
  name: string;
  probability: number;
}

export interface GameState {
  items: ProbabilityItem[];
  result: string;
  isSpinning: boolean;
}

export interface GameHistory {
  id: number;
  winner: string;
  date: string;
  items: string[];
}
