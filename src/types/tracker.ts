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

// New interfaces for backend integration
export interface ITracker {
  _id: string;
  userId: string;
  type: "sleep" | "diet" | "workout";
  referenceId: string;
  date: string;
  completedReps?: number;
  completedTime?: number;
  weightConsumed?: number;
  sleepHours?: number;
  createdAt: string;
  updatedAt: string;
}

export interface IDiet {
  _id: string;
  foodName: string;
  userId: string;
  meal: "breakfast" | "lunch" | "dinner" | "snack";
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  mealWeight: number;
  mealDateAndTime: string;
  goalId?: string;
}

export interface IWorkout {
  _id: string;
  type: "weight lifting" | "cardio" | "crossfit" | "yoga";
  exerciseName: string;
  duration: number;
  reps: number;
  sets: number;
  userId: string;
  targetMuscleGroup: Array<"chest" | "back" | "legs" | "arms" | "shoulders" | "core">;
  goalId?: string;
  workoutDateAndTime: string;
}

export interface ISleep {
  _id: string;
  userId: string;
  goalId?: string;
  duration: number;
  date: string;
}

export interface TrackerEntry {
  type: "sleep" | "diet" | "workout";
  data: IDiet | IWorkout | ISleep;
  tracker?: ITracker;
}

export interface DayTrackerData {
  [date: string]: TrackerEntry[];
} 