export interface ProfileData {
  _id: string;
  username?: string;
  email: string;
  phone_num?: string;
  country?: string;
  dob?: Date;
  height?: number;
  weight?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PersonalData {
  username?: string;
  email: string;
  phone_num?: string;
  dob?: Date;
  country?: string;
}

export interface FitnessData {
  height?: number;
  weight?: number;
}

export interface ProgressStats {
  totalGoals: number;
  completedGoals: number;
  workoutsThisMonth: number;
  streak: number;
  bmi: number;
  age: number;
}

export interface ProfileCardData {
  username?: string;
  dob?: Date;
  weight?: number;
  height?: number;
}

export interface UserComprehensiveInfo {
  user: ProfileData;
  fitnessStats: ProgressStats;
} 