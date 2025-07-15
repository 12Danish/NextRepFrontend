export interface Workout {
  type: string;
  duration: string;
  calories: number;
  completed: boolean;
}

export interface Meal {
  type: string;
  food: string;
  calories: number;
}

export interface DayData {
  workouts: Workout[];
  meals: Meal[];
}

export interface LoggedData {
  [key: string]: DayData;
}

export type TabType = 'workout' | 'diet';

export interface SummaryItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgColor: string;
  textColor: string;
}

export interface QuickAction {
  icon: string;
  title: string;
  description: string;
  onClick?: () => void;
}

export interface WeeklyGoal {
  label: string;
  value: string;
} 