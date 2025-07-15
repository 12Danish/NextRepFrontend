export interface WorkoutItem {
  name: string;
  time: string;
  duration: string;
  type: 'warmup' | 'strength' | 'flexibility';
}

export interface Achievement {
  icon: string;
  label: string;
  value: string;
  color: string;
}

export interface ScheduleItem {
  day: string;
  name: string;
  time: string;
  duration: string;
  type: 'warmup' | 'strength' | 'flexibility';
}

export interface TrainerInfo {
  trainerName: string;
  trainerRole: string;
  workoutType: string;
  workoutCategory: string;
  difficulty: string;
} 