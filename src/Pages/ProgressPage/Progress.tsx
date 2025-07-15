import ProgressHero from '../../Components/ui/ProgressHero';
import ProgressStatsOverview from '../../Components/ui/ProgressStatsOverview';
import ProgressChartsSection from '../../Components/ui/ProgressChartsSection';
import RecentWorkoutsTable from '../../Components/ui/RecentWorkoutsTable';
import ProgressSidebar from '../../Components/ui/ProgressSidebar';
import type { ProgressStat, WeightDataPoint, WorkoutDataPoint, BodyCompositionDataPoint, WorkoutRecord, Achievement } from '../../types/progress';

const Progress: React.FC = () => {
  const weightData: WeightDataPoint[] = [
    { month: 'Jan', weight: 75, target: 70 },
    { month: 'Feb', weight: 74, target: 70 },
    { month: 'Mar', weight: 72, target: 70 },
    { month: 'Apr', weight: 71, target: 70 },
    { month: 'May', weight: 70.5, target: 70 },
    { month: 'Jun', weight: 69.8, target: 70 }
  ];

  const workoutData: WorkoutDataPoint[] = [
    { day: 'Mon', calories: 400, workouts: 2 },
    { day: 'Tue', calories: 300, workouts: 1 },
    { day: 'Wed', calories: 500, workouts: 3 },
    { day: 'Thu', calories: 450, workouts: 2 },
    { day: 'Fri', calories: 350, workouts: 1 },
    { day: 'Sat', calories: 600, workouts: 4 },
    { day: 'Sun', calories: 200, workouts: 1 }
  ];

  const bodyCompositionData: BodyCompositionDataPoint[] = [
    { name: 'Muscle', value: 45, color: '#06B6D4' },
    { name: 'Fat', value: 18, color: '#F97316' },
    { name: 'Water', value: 32, color: '#3B82F6' },
    { name: 'Bone', value: 5, color: '#8B5CF6' }
  ];

  const progressStats: ProgressStat[] = [
    { icon: '⚖️', label: 'Weight Lost', value: '5.2', unit: 'kg', change: '+2.1%', trend: 'up', color: 'bg-cyan-500' },
    { icon: '🔥', label: 'Calories Burned', value: '2,840', unit: 'kcal', change: '+15%', trend: 'up', color: 'bg-orange-500' },
    { icon: '💪', label: 'Muscle Gained', value: '2.8', unit: 'kg', change: '+8%', trend: 'up', color: 'bg-blue-500' },
    { icon: '📊', label: 'Body Fat', value: '18', unit: '%', change: '-3.2%', trend: 'down', color: 'bg-orange-400' }
  ];

  const recentWorkouts: WorkoutRecord[] = [
    { date: '2024-06-19', exercise: 'Full Body Workout', duration: '45 min', calories: 520, intensity: 'High' },
    { date: '2024-06-18', exercise: 'Cardio Session', duration: '30 min', calories: 380, intensity: 'Medium' },
    { date: '2024-06-17', exercise: 'Strength Training', duration: '60 min', calories: 450, intensity: 'High' },
    { date: '2024-06-16', exercise: 'Yoga & Stretching', duration: '40 min', calories: 200, intensity: 'Low' },
    { date: '2024-06-15', exercise: 'HIIT Training', duration: '25 min', calories: 400, intensity: 'High' }
  ];

  const achievements: Achievement[] = [
    { title: '30-Day Streak', description: 'Completed workouts for 30 consecutive days', date: '2024-06-15', icon: '🔥' },
    { title: 'Weight Goal Achieved', description: 'Reached target weight of 70kg', date: '2024-06-10', icon: '🎯' },
    { title: 'Personal Best', description: 'New record: 100 push-ups in one session', date: '2024-06-05', icon: '💪' }
  ];

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
        <ProgressSidebar achievements={achievements} />
      </div>
    </div>
  );
};

export default Progress;