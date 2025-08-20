import React, { useState, useEffect } from 'react';
import WorkoutPlanHero from '../../Components/ui/WorkoutPlanHero';
import TrainerCard from '../../Components/ui/TrainerCard';
import WorkoutSchedule from '../../Components/ui/WorkoutSchedule';
import AchievementsSection from '../../Components/ui/AchievementsSection';
import WorkoutSidebar from '../../Components/ui/WorkoutSidebar';
import WorkoutCreationModal from '../../Components/ui/WorkoutCreationModal';
import { useUser } from '../../contexts/UserContext';
import type { WorkoutItem, Achievement, ScheduleItem, TrainerInfo } from '../../types/workoutPlan';

const WorkoutPlan: React.FC = () => {
  const { user, isAuthenticated } = useUser();
  const [workoutSchedule, setWorkoutSchedule] = useState<WorkoutItem[]>([]);
  const [weeklySchedule, setWeeklySchedule] = useState<ScheduleItem[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      loadUserWorkoutData();
    }
  }, [isAuthenticated, user]);

  const loadUserWorkoutData = async () => {
    try {
      setIsLoading(true);
      
      const todayResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/workout/getSchedule?viewType=day&offset=0`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const weekResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/workout/getSchedule?viewType=week&offset=0`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (todayResponse.ok && weekResponse.ok) {
        const todayData = await todayResponse.json();
        const weekData = await weekResponse.json();

        const todayWorkouts: WorkoutItem[] = (todayData.workouts || []).map((workout: any) => ({
          name: workout.exerciseName,
          time: `At ${new Date(workout.workoutDateAndTime).toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}`,
          duration: workout.duration ? `${workout.duration} min` : '',
          type: workout.type === 'weight lifting' ? 'strength' : 
                workout.type === 'cardio' ? 'cardio' : 
                workout.type === 'crossfit' ? 'strength' :
                workout.type === 'yoga' ? 'flexibility' : 'strength',
          reps: workout.reps || 0,
          sets: workout.sets || 1,
          targetMuscleGroup: workout.targetMuscleGroup || []
        }));

        // Transform weekly schedule - group workouts by day
        const weeklyWorkoutsMap = new Map<string, any[]>();
        
        const today = new Date();
        const todayDayIndex = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const daysOfWeek = [];
        
        for (let i = 0; i < 7; i++) {
          const dayIndex = (todayDayIndex + i) % 7;
          const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayIndex];
          daysOfWeek.push(dayName);
          weeklyWorkoutsMap.set(dayName, []);
        }
        
        // Group workouts by day
        (weekData.workouts || []).forEach((workout: any) => {
          const dayName = new Date(workout.workoutDateAndTime).toLocaleDateString('en-US', { weekday: 'long' });
          if (weeklyWorkoutsMap.has(dayName)) {
            weeklyWorkoutsMap.get(dayName)!.push(workout);
          }
        });
        
        // Create schedule items for all 7 days starting from today
        const weeklyWorkouts: ScheduleItem[] = daysOfWeek.map(dayName => {
          const dayWorkouts = weeklyWorkoutsMap.get(dayName) || [];
          
          if (dayWorkouts.length === 0) {
            // No workouts for this day
            return {
              day: dayName,
              name: 'No workouts',
              time: '',
              duration: '',
              type: 'rest' as any,
              workouts: []
            };
          } else if (dayWorkouts.length === 1) {
            // Single workout for this day
            const workout = dayWorkouts[0];
            return {
              day: dayName,
              name: workout.exerciseName,
              time: `At ${new Date(workout.workoutDateAndTime).toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}`,
              duration: workout.duration ? `${workout.duration} min` : '',
              type: workout.type === 'weight lifting' ? 'strength' : 
                    workout.type === 'cardio' ? 'cardio' : 
                    workout.type === 'crossfit' ? 'strength' :
                    workout.type === 'yoga' ? 'flexibility' : 'strength',
              workouts: [workout]
            };
          } else {
            // Multiple workouts for this day - show count
            return {
              day: dayName,
              name: `${dayWorkouts.length} workouts`,
              time: `Multiple times`,
              duration: `${dayWorkouts.reduce((acc, w) => acc + (w.duration || 0), 0)} min total`,
              type: 'mixed' as any,
              workouts: dayWorkouts
            };
          }
        });

        setWorkoutSchedule(todayWorkouts);
        setWeeklySchedule(weeklyWorkouts);

        // Calculate achievements based on actual workout data
        const totalWorkouts = (weekData.workouts || []).length;
        const totalDuration = (weekData.workouts || []).reduce((acc: number, workout: any) => acc + (workout.duration || 0), 0);
        const totalReps = (weekData.workouts || []).reduce((acc: number, workout: any) => acc + (workout.reps || 0), 0);
        const totalSets = (weekData.workouts || []).reduce((acc: number, workout: any) => acc + (workout.sets || 1), 0);
        const caloriesBurned = Math.round(totalDuration * 5); // Rough estimate: 5 calories per minute

        const calculatedAchievements: Achievement[] = [
          { icon: '⏰', label: 'Hours', value: Math.round(totalDuration / 60).toString(), color: 'bg-red-500' },
          { icon: '🔥', label: 'Kcal', value: caloriesBurned.toString(), color: 'bg-orange-500' },
          { icon: '💪', label: 'Reps', value: totalReps.toString(), color: 'bg-red-600' },
          { icon: '🏋️', label: 'Sets', value: totalSets.toString(), color: 'bg-red-700' },
          { icon: '📊', label: 'Workouts', value: totalWorkouts.toString(), color: 'bg-red-800' }
        ];

        setAchievements(calculatedAchievements);
      }
    } catch (error) {
      console.error('Error loading workout data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartWorkout = (workout: WorkoutItem) => {
    // TODO: Implement workout start functionality
    console.log('Starting workout:', workout.name);
  };

  const handleViewAllSchedule = () => {
    // TODO: Implement view all schedule functionality
    console.log('View all schedule clicked');
  };

  const handleAddWorkout = () => {
    setIsModalOpen(true);
  };

  const handleSaveWorkout = async (workoutData: any) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/workout/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workoutData)
      });

      if (!response.ok) {
        throw new Error('Failed to create workout');
      }

      await loadUserWorkoutData();
      setIsModalOpen(false);

    } catch (error) {
      console.error('Error creating workout:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-full min-h-screen py-6">
        <div className="flex-[10] p-4 lg:p-6">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          </div>
        </div>
      </div>
    );
  }

  const trainerInfo: TrainerInfo = {
    trainerName: user?.username || user?.email?.split('@')[0] || 'User',
    trainerRole: 'Fitness Enthusiast',
    workoutType: weeklySchedule.length > 0 ? weeklySchedule[0].name : 'No workouts planned',
    workoutCategory: weeklySchedule.length > 0 ? weeklySchedule[0].type : 'Get started',
    difficulty: 'Beginner'
  };

  return (
    <div className="flex w-full min-h-screen py-6">
      {/* Main Content Area */}
      <div className="flex-[10] p-4 lg:p-6">
        <div className="space-y-6">
          <WorkoutPlanHero />

          {/* Add Workout Button */}
          <div className="flex justify-center">
            <button
              onClick={handleAddWorkout}
              className="bg-orange-500 cursor-pointer text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
            >
              + Add Workout Plan
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trainer Card */}
            <TrainerCard trainerInfo={trainerInfo} />

            {/* Workout Schedule */}
            <div className="lg:col-span-2">
              {workoutSchedule.length === 0 ? (
                <div className="bg-white rounded-2xl p-6 shadow-sm text-center">
                  <div className="text-gray-500 text-lg mb-4">No workouts scheduled for today</div>
                  <div className="text-gray-400">Click "Add Workout" to get started!</div>
                </div>
              ) : (
                <WorkoutSchedule
                  workouts={workoutSchedule}
                  onStartWorkout={handleStartWorkout}
                />
              )}
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

      {/* Workout Creation Modal */}
      <WorkoutCreationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveWorkout}
      />
    </div>
  );
};

export default WorkoutPlan;