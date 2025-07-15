export interface Goal {
  id: string;
  title: string;
  category: GoalCategory;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  completed: boolean;
  createdAt: string;
}

export type GoalCategory = 'workout' | 'diet' | 'sleep' | 'weight' | 'other';

export interface NewGoalForm {
  title: string;
  category: GoalCategory;
  description: string;
  targetValue: string;
  currentValue: string;
  unit: string;
  deadline: string;
} 