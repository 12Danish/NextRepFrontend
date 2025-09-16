import React, { useState, useEffect } from 'react';
import ProgressHero from '../../Components/ui/ProgressHero';
import ProgressStatsOverview from '../../Components/ui/ProgressStatsOverview';
import ProgressChartsSection from '../../Components/ui/ProgressChartsSection';
import RecentWorkoutsTable from '../../Components/ui/RecentWorkoutsTable';
import ProgressSidebar from '../../Components/ui/ProgressSidebar';
import { useUser } from '../../contexts/UserContext';
import type { ProgressStat, WeightDataPoint, WorkoutDataPoint, BodyCompositionDataPoint, WorkoutRecord, Achievement } from '../../types/progress';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Progress: React.FC = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [weightData, setWeightData] = useState<WeightDataPoint[]>([]);
  const [workoutData, setWorkoutData] = useState<WorkoutDataPoint[]>([]);
  const [bodyCompositionData, setBodyCompositionData] = useState<BodyCompositionDataPoint[]>([]);
  const [progressStats, setProgressStats] = useState<ProgressStat[]>([]);
  const [recentWorkouts, setRecentWorkouts] = useState<WorkoutRecord[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [sidebarData, setSidebarData] = useState({
    workoutsCompleted: 0,
    totalWorkouts: 0,
    caloriesBurned: 0,
    weightProgress: 0,
    goalAchievement: 0
  });

  useEffect(() => {

    fetchProgressData();

  }, [user]);

  const fetchProgressData = async () => {
    try {
      setLoading(true);

      // Fetch weight graph data
      const weightResponse = await fetch(`${API_BASE_URL}/api/progress/WeightGraphProgress`, {
        credentials: 'include',
      });
      if (weightResponse.ok) {
        const weightData = await weightResponse.json();
        processWeightData(weightData);
      } else {
        console.error('Weight API failed:', weightResponse.status);
      }

      // Fetch workout graph data
      const workoutResponse = await fetch(`${API_BASE_URL}/api/progress/WorkoutGraphProgress?viewType=week`, {
        credentials: 'include',
      });
      if (workoutResponse.ok) {
        const workoutData = await workoutResponse.json();
        processWorkoutData(workoutData);
      } else {
        console.error('Workout API failed:', workoutResponse.status);
      }

      // Fetch diet graph data
      const dietResponse = await fetch(`${API_BASE_URL}/api/progress/DietGraphProgress?viewType=week`, {
        credentials: 'include',
      });
      if (dietResponse.ok) {
        const dietData = await dietResponse.json();
        processDietData(dietData);
      } else {
        console.error('Diet API failed:', dietResponse.status);
      }

      // Fetch user goals to calculate progress stats
      const goalsResponse = await fetch(`${API_BASE_URL}/api/goal/getGoals`, {
        credentials: 'include',
      });
      if (goalsResponse.ok) {
        const goalsData = await goalsResponse.json();
        await processGoalsData(goalsData.goalsData?.goals || []);
      } else {
        console.error('Goals API failed:', goalsResponse.status);
      }

    } catch (error) {
      console.error('Error fetching progress data:', error);
    } finally {
      setLoading(false);
    }
  };

  const processWeightData = (data: any) => {
    if (data.data && data.data.length > 0) {
      const processedData: WeightDataPoint[] = [];

      // Process weight data from the API response
      data.data.forEach((entry: any) => {
        const date = new Date(entry.date);
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        processedData.push({
          month,
          weight: entry.weight,
          target: entry.targetWeight
        });
      });

      setWeightData(processedData);

      // Calculate weight progress for sidebar
      if (data.data.length > 0) {
        const currentWeight = data.data[0].weight;
        const targetWeight = data.data[0].targetWeight;
        const weightDiff = currentWeight - targetWeight;

        setSidebarData(prev => ({
          ...prev,
          weightProgress: weightDiff
        }));
      }
    } else {
      // Fallback data if no weight data
      setWeightData([
        { month: 'No Data', weight: 0, target: 0 }
      ]);
    }
  };

  const processWorkoutData = (data: any) => {
    if (data.result && data.result.data) {
      const processedData: WorkoutDataPoint[] = data.result.data.map((entry: any) => ({
        day: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }),
        calories: Math.round((entry.actual.totalDuration || 0) * 8), // Rough estimate: 8 calories per minute
        workouts: entry.actual.completedWorkouts || 0
      }));
      setWorkoutData(processedData);

      // Process recent workouts for the table
      const recentWorkoutsData: WorkoutRecord[] = data.result.data
        .filter((entry: any) => entry.actual.completedWorkouts > 0) // Only show completed workouts
        .map((entry: any) => {
          const workoutDetails = entry.workoutSummary?.details || [];
          const completedWorkouts = workoutDetails.filter((detail: any) => detail.isTracked === 1);

          return completedWorkouts.map((workout: any) => ({
            date: entry.date,
            exercise: workout.exerciseName,
            duration: `${workout.actualDuration} min`,
            calories: Math.round((workout.actualDuration || 0) * 8),
            intensity: workout.actualDuration >= 45 ? 'High' : workout.actualDuration >= 25 ? 'Medium' : 'Low'
          }));
        })
        .flat()
        .slice(0, 5); // Show only last 5 workouts

      setRecentWorkouts(recentWorkoutsData);

      // Calculate sidebar data
      let totalWorkouts = 0;
      let completedWorkouts = 0;
      let totalCalories = 0;

      data.result.data.forEach((entry: any) => {
        totalWorkouts += entry.scheduled.workoutCount || 0;
        completedWorkouts += entry.actual.completedWorkouts || 0;
        totalCalories += Math.round((entry.actual.totalDuration || 0) * 8);
      });

      setSidebarData(prev => ({
        ...prev,
        workoutsCompleted: completedWorkouts,
        totalWorkouts: totalWorkouts,
        caloriesBurned: totalCalories
      }));
    } else {
      // Fallback data if no workout data
      setWorkoutData([
        { day: 'No Data', calories: 0, workouts: 0 }
      ]);
      setRecentWorkouts([]);
    }
  };

  const processDietData = (data: any) => {
    const days: any[] = Array.isArray(data?.data) ? data.data : [];

    if (days.length === 0) {
      setBodyCompositionData([
        { name: 'Calories', value: 0, color: '#8B5CF6' },
        { name: 'Proteins', value: 0, color: '#06B6D4' },
        { name: 'Fats', value: 0, color: '#F97316' },
        { name: 'Carbs', value: 0, color: '#3B82F6' }
      ]);
      return;
    }

    let scheduledCalories = 0;
    let scheduledProteins = 0;
    let scheduledFats = 0;
    let scheduledCarbs = 0;

    let actualCalories = 0;
    let actualProteins = 0;
    let actualFats = 0;
    let actualCarbs = 0;

    for (const d of days) {
      const sch = d?.scheduled ?? {};
      const act = d?.actual ?? {};

      scheduledCalories += Number(sch.calories || 0);
      scheduledProteins += Number(sch.proteins || 0);
      scheduledFats += Number(sch.fats || 0);
      scheduledCarbs += Number(sch.carbs || 0);

      actualCalories += Number(act.calories || 0);
      actualProteins += Number(act.proteins || 0);
      actualFats += Number(act.fats || 0);
      actualCarbs += Number(act.carbs || 0);
    }

    const pct = (actual: number, scheduled: number) => {
      if (!scheduled || scheduled <= 0) return 0;
      return Math.round((actual / scheduled) * 100);
    };

    const caloriesPct = pct(actualCalories, scheduledCalories);
    const proteinsPct = pct(actualProteins, scheduledProteins);
    const fatsPct = pct(actualFats, scheduledFats);
    const carbsPct = pct(actualCarbs, scheduledCarbs);

    setBodyCompositionData([
      { name: 'Calories', value: caloriesPct, color: '#8B5CF6' },
      { name: 'Proteins', value: proteinsPct, color: '#06B6D4' },
      { name: 'Fats', value: fatsPct, color: '#F97316' },
      { name: 'Carbs', value: carbsPct, color: '#3B82F6' }
    ]);
  };

  const processGoalsData = async (goals: any[]) => {
    const stats: ProgressStat[] = [];
    const processedCategories = new Set();

    for (const goal of goals) {
      try {
        // Only process one goal per category to avoid duplicates
        if (processedCategories.has(goal.category)) continue;
        processedCategories.add(goal.category);

        if (goal.category === 'weight') {
          try {
            const response = await fetch(`${API_BASE_URL}/api/progress/WeightGoalProgress/${goal._id}`, {
              credentials: 'include',
            });
            if (response.ok) {
              const data = await response.json();
              const currentWeight = goal.data?.currentWeight || 0;
              const targetWeight = goal.data?.targetWeight || 0;
              const weightDiff = Math.abs(currentWeight - targetWeight);

              stats.push({
                icon: '⚖️',
                label: 'Weight Goal',
                value: `${data.progress.toFixed(1)}`,
                unit: '%',
                change: weightDiff > 0 ? `${weightDiff.toFixed(1)}kg to go` : 'Goal Reached!',
                trend: data.progress >= 100 ? 'up' : 'down',
                color: 'bg-cyan-500'
              });
            }
          } catch (error) {
            // If progress API fails, still show the goal
            const currentWeight = goal.data?.currentWeight || 0;
            const targetWeight = goal.data?.targetWeight || 0;
            const weightDiff = Math.abs(currentWeight - targetWeight);

            stats.push({
              icon: '⚖️',
              label: 'Weight Goal',
              value: weightDiff > 0 ? 'In Progress' : 'Set',
              unit: '',
              change: weightDiff > 0 ? `${weightDiff.toFixed(1)}kg to go` : 'Target: ' + targetWeight + 'kg',
              trend: 'down',
              color: 'bg-cyan-500'
            });
          }
        } else if (goal.category === 'diet') {
          try {
            const response = await fetch(`${API_BASE_URL}/api/progress/DietGoalProgress/${goal._id}`, {
              credentials: 'include',
            });
            if (response.ok) {
              const data = await response.json();
              if (data.progress && data.progress.totalCalories) {
                const targetCalories = goal.data?.targetCalories || 0;
                const actualCalories = data.progress.totalCalories || 0;
                const percentage = targetCalories > 0 ? Math.round((actualCalories / targetCalories) * 100) : 0;

                stats.push({
                  icon: '🔥',
                  label: 'Diet Goal',
                  value: `${percentage}`,
                  unit: '%',
                  change: `${actualCalories}/${targetCalories} kcal`,
                  trend: percentage >= 100 ? 'up' : 'down',
                  color: 'bg-orange-500'
                });
              } else {
                // No progress data, show goal as set
                const targetCalories = goal.data?.targetCalories || 0;
                stats.push({
                  icon: '🔥',
                  label: 'Diet Goal',
                  value: 'Set',
                  unit: '',
                  change: `Target: ${targetCalories} kcal`,
                  trend: 'down',
                  color: 'bg-orange-500'
                });
              }
            } else {
              // API failed, show goal as set
              const targetCalories = goal.data?.targetCalories || 0;
              stats.push({
                icon: '🔥',
                label: 'Diet Goal',
                value: 'Set',
                unit: '',
                change: `Target: ${targetCalories} kcal`,
                trend: 'down',
                color: 'bg-orange-500'
              });
            }
          } catch (error) {
            // If progress API fails, still show the goal
            const targetCalories = goal.data?.targetCalories || 0;
            stats.push({
              icon: '🔥',
              label: 'Diet Goal',
              value: 'Set',
              unit: '',
              change: `Target: ${targetCalories} kcal`,
              trend: 'down',
              color: 'bg-orange-500'
            });
          }
        } else if (goal.category === 'workout') {
          try {
            const response = await fetch(`${API_BASE_URL}/api/progress/WorkoutGoalProgress/${goal._id}`, {
              credentials: 'include',
            });
            if (response.ok) {
              const data = await response.json();
              if (data.result && data.result.progress) {
                const progress = data.result.progress.progressPercentage || 0;

                stats.push({
                  icon: '💪',
                  label: 'Workout Goal',
                  value: `${progress.toFixed(1)}`,
                  unit: '%',
                  change: progress >= 100 ? 'Goal Achieved!' : 'In Progress',
                  trend: progress >= 100 ? 'up' : 'down',
                  color: 'bg-blue-500'
                });
              } else {
                // No progress data, show goal as set
                stats.push({
                  icon: '💪',
                  label: 'Workout Goal',
                  value: 'Set',
                  unit: '',
                  change: 'Target: ' + (goal.data?.targetMinutes || 'Custom') + ' min',
                  trend: 'down',
                  color: 'bg-blue-500'
                });
              }
            } else {
              // API failed, show goal as set
              stats.push({
                icon: '💪',
                label: 'Workout Goal',
                value: 'Set',
                unit: '',
                change: 'Target: ' + (goal.data?.targetMinutes || 'Custom') + ' min',
                trend: 'down',
                color: 'bg-blue-500'
              });
            }
          } catch (error) {
            // If progress API fails, still show the goal
            stats.push({
              icon: '💪',
              label: 'Workout Goal',
              value: 'Set',
              unit: '',
              change: 'Target: ' + (goal.data?.targetMinutes || 'Custom') + ' min',
              trend: 'down',
              color: 'bg-blue-500'
            });
          }
        } else if (goal.category === 'sleep') {
          // For sleep goals, show the most recent one
          const targetHours = goal.data?.targetHours || 0;
          const isCompleted = goal.status === 'completed';

          stats.push({
            icon: '😴',
            label: 'Sleep Goal',
            value: isCompleted ? '✓' : targetHours.toString(),
            unit: isCompleted ? '' : 'hours',
            change: isCompleted ? 'Goal achieved!' : 'Target set',
            trend: isCompleted ? 'up' : 'down',
            color: isCompleted ? 'bg-green-500' : 'bg-purple-500'
          });
        }
      } catch (error) {
        console.error(`Error processing goal ${goal._id}:`, error);

        // Even if there's an error, try to show the goal with basic info
        if (goal.category === 'diet') {
          stats.push({
            icon: '🔥',
            label: 'Diet Goal',
            value: 'Set',
            unit: '',
            change: 'Target set',
            trend: 'down',
            color: 'bg-orange-500'
          });
        } else if (goal.category === 'workout') {
          stats.push({
            icon: '💪',
            label: 'Workout Goal',
            value: 'Set',
            unit: '',
            change: 'Target set',
            trend: 'down',
            color: 'bg-blue-500'
          });
        }
      }
    }

    // Add default stats if none were processed
    if (stats.length === 0) {
      stats.push(
        { icon: '⚖️', label: 'Weight Goal', value: '0', unit: '%', change: 'No goals set', trend: 'down', color: 'bg-cyan-500' },
        { icon: '🔥', label: 'Diet Goal', value: '0', unit: '%', change: 'No goals set', trend: 'down', color: 'bg-orange-500' },
        { icon: '💪', label: 'Workout Goal', value: '0', unit: '%', change: 'No goals set', trend: 'down', color: 'bg-blue-500' },
        { icon: '😴', label: 'Sleep Goal', value: '0', unit: 'hours', change: 'No goals set', trend: 'down', color: 'bg-purple-500' }
      );
    }

    // Calculate overall goal achievement percentage
    const totalGoals = stats.length;
    const completedGoals = stats.filter(stat =>
      stat.trend === 'up' ||
      stat.value === 'Goal Reached!' ||
      stat.value === 'Goal Achieved!' ||
      stat.value === '✓'
    ).length;

    const achievementPercentage = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

    setSidebarData(prev => ({
      ...prev,
      goalAchievement: achievementPercentage
    }));

    setProgressStats(stats);
  };

  if (loading) {
    return (
      <div className="flex w-full min-h-screen py-6">
        <div className="flex-[10] p-4 lg:p-6">
          <div className="space-y-6">
            <div className="animate-pulse">
              <div className="h-32 bg-gray-200 rounded-lg mb-6"></div>
              <div className="h-24 bg-gray-200 rounded-lg mb-6"></div>
              <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
              <div className="h-48 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-screen py-6">
      {/* Main Content Area */}
      <div className="flex-[10] p-4 lg:p-6">
        <div className="space-y-6">
          <ProgressHero />

          {/* Progress Stats */}
          <ProgressStatsOverview stats={progressStats} />

          {/* Charts Section */}
          <ProgressChartsSection
            weightData={weightData}
            workoutData={workoutData}
            bodyCompositionData={bodyCompositionData}
          />

          {/* Recent Workouts Table */}
          <RecentWorkoutsTable workouts={recentWorkouts} />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block flex-[3] bg-white border-l border-gray-200 p-6 h-full">
        <ProgressSidebar achievements={achievements} sidebarData={sidebarData} />
      </div>
    </div>
  );
};

export default Progress;