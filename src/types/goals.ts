export interface Goal {
  _id: string;
  category: GoalCategory;
  startDate: string;
  endDate: string | null;
  targetDate: string;
  status: 'pending' | 'completed' | 'overdue';
  userId: string;
  description: string;
  data: WeightGoalData | DietGoalData | SleepGoalData | WorkoutGoalData;
  createdAt: string;
  updatedAt: string;
}

export type GoalCategory = 'workout' | 'diet' | 'sleep' | 'weight';

export interface WeightGoalData {
  goalType: 'gain' | 'loss' | 'maintenance';
  targetWeight: number;
  currentWeight: number;
  previousWeights: { weight: number; date: string }[];
}

export interface DietGoalData {
  targetCalories: number;
  targetProteins: number;
  targetFats: number;
  targetCarbs: number;
}

export interface SleepGoalData {
  targetHours: number;
}

export interface WorkoutGoalData {
  type: "weight lifting" | "cardio" | "crossfit" | "yoga";
  exerciseName: string;
  targetMinutes?: number;
  targetReps?: number;
  targetSets?: number;
  targetMuscleGroup: Array<
    "chest" | "back" | "legs" | "arms" | "shoulders" | "core"
  >;
}

export interface NewGoalForm {
  category: GoalCategory;
  startDate: string;
  targetDate: string;
  description: string;
  data: WeightGoalData | DietGoalData | SleepGoalData | WorkoutGoalData;
}

export interface GoalProgress {
  progress: number;
  completed: number;
  pending: number;
  overdue: number;
  total: number;
} 