export interface ProgressStat {
  icon: string;
  label: string;
  value: string;
  unit: string;
  change: string;
  trend: 'up' | 'down';
  color: string;
}

export interface WeightDataPoint {
  month: string;
  weight: number;
  target: number;
}

export interface WorkoutDataPoint {
  day: string;
  calories: number;
  workouts: number;
}

export interface BodyCompositionDataPoint {
  name: string;
  value: number;
  color: string;
}

export interface WorkoutRecord {
  date: string;
  exercise: string;
  duration: string;
  calories: number;
  intensity: 'High' | 'Medium' | 'Low';
}

export interface Achievement {
  title: string;
  description: string;
  date: string;
  icon: string;
} 