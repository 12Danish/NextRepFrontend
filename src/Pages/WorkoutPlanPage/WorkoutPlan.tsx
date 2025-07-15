import React from 'react';
import WorkoutPlanHero from '../../Components/ui/WorkoutPlanHero';
import TrainerCard from '../../Components/ui/TrainerCard';
import WorkoutSchedule from '../../Components/ui/WorkoutSchedule';
import AchievementsSection from '../../Components/ui/AchievementsSection';
import WorkoutSidebar from '../../Components/ui/WorkoutSidebar';
import type { WorkoutItem, Achievement, ScheduleItem, TrainerInfo } from '../../types/workoutPlan';

const WorkoutPlan: React.FC = () => {
  const workoutSchedule: WorkoutItem[] = [
    { name: 'Stretch', time: 'At 08:00', duration: '10:00 Sets', type: 'warmup' },
    { name: 'Back Stretch', time: 'At 09:00', duration: '8/16 Round', type: 'strength' },
    { name: 'Yoga', time: 'At 10:00', duration: '04/20 min', type: 'flexibility' },
    { name: 'Yoga', time: 'At 11:00', duration: '20 min', type: 'flexibility' }
  ];

  const achievements: Achievement[] = [
    { icon: '⏰', label: 'Hours', value: '15', color: 'bg-red-500' },
    { icon: '🔥', label: 'Kcal', value: '550', color: 'bg-orange-500' },
    { icon: '💪', label: 'Reps', value: '15', color: 'bg-red-600' },
    { icon: '🏋️', label: 'Sets', value: '5', color: 'bg-red-700' },
    { icon: '📊', label: 'Sets', value: '5', color: 'bg-red-800' }
  ];

  const trainerInfo: TrainerInfo = {
    trainerName: 'Adrianna Lamb',
    trainerRole: 'Fitness Trainer',
    workoutType: 'Legs',
    workoutCategory: 'Lower Body',
    difficulty: 'Beginner'
  };

  const weeklySchedule: ScheduleItem[] = [
    {
      day: 'Monday',
      name: 'Stretch',
      time: 'At 08:00',
      duration: '20 Sets',
      type: 'warmup'
    },
    {
      day: 'Tuesday',
      name: 'Back Stretch',
      time: 'At 09:00',
      duration: '10 Round',
      type: 'strength'
    },
    {
      day: 'Wednesday',
      name: 'Yoga',
      time: 'At 08:00',
      duration: '20 min',
      type: 'flexibility'
    },
    {
      day: 'Thursday',
      name: 'Yoga',
      time: 'At 08:00',
      duration: '20 min',
      type: 'flexibility'
    },
    {
      day: 'Friday',
      name: 'Yoga',
      time: 'At 08:00',
      duration: '20 min',
      type: 'flexibility'
    }
  ];

  const handleStartWorkout = (workout: WorkoutItem) => {
    // TODO: Implement workout start functionality
    console.log('Starting workout:', workout.name);
  };

  const handleViewAllSchedule = () => {
    // TODO: Implement view all schedule functionality
    console.log('View all schedule clicked');
  };

  return (
    <div className="flex w-full min-h-screen py-6">
      {/* Main Content Area */}
      <div className="flex-[10] p-4 lg:p-6">
        <div className="space-y-6">
          <WorkoutPlanHero />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trainer Card */}
            <TrainerCard trainerInfo={trainerInfo} />

            {/* Workout Schedule */}
            <div className="lg:col-span-2">
              <WorkoutSchedule
                workouts={workoutSchedule}
                onStartWorkout={handleStartWorkout}
              />
            </div>
          </div>

          {/* Achievements Section */}
          <AchievementsSection achievements={achievements} />
        </div>
      </div>

      {/* Right Sidebar - Hidden on mobile */}
      <div className="hidden lg:block flex-[3] h-full bg-white border-l border-gray-200 p-6">
        <WorkoutSidebar
          schedule={weeklySchedule}
          onViewAll={handleViewAllSchedule}
        />
      </div>
    </div>
  );
};

export default WorkoutPlan;