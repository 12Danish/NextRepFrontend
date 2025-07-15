export interface ProfileData {
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  dateOfBirth: string;
  weight: string;
  height: string;
  fitnessGoal: string;
  activityLevel: string;
  profilePic: string;
}

export interface PersonalData {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  country: string;
  city: string;
}

export interface FitnessData {
  weight: string;
  height: string;
  fitnessGoal: string;
  activityLevel: string;
}

export interface ProgressStats {
  workouts: number;
  goals: string;
  streak: number;
}

export interface ProfileCardData {
  name: string;
  dateOfBirth: string;
  weight: string;
  height: string;
  activityLevel: string;
} 