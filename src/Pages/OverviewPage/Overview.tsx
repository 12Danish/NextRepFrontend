import { useState, useEffect } from 'react';
import Hero from '../../Components/ui/OverviewHero';
import ActivityCards from '../../Components/ui/ActivitySection';
import GoalProgress from '../../Components/ui/GoalProgress';
import FoodLog from '../../Components/ui/FoodLog';
import RightSidebar from '../../Components/ui/RightSidebar';
import { useUser } from '../../contexts/UserContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface OverviewStats {
  workout: {
    minutes: number;
    hours: number;
  };
  calories: number;
  sleep: {
    hours: number;
    minutes: number;
  };
}

interface ScheduleItem {
  id: string;
  name: string;
  time: string;
  duration?: number;
  meal?: string;
  calories?: number;
  targetHours?: number;
  type: 'workout' | 'meal' | 'sleep';
}

interface TodaySchedule {
  workouts: ScheduleItem[];
  meals: ScheduleItem[];
  sleep: ScheduleItem | null;
}

interface MealPlan {
  meals: {
    breakfast: any[];
    lunch: any[];
    dinner: any[];
    snack: any[];
  };
  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface GoalProgress {
  goals: {
    workout: any[];
    diet: any[];
    sleep: any[];
  };
  progress: {
    workout: any[];
    diet: any[];
    sleep: any[];
  };
}

interface OverviewData {
  stats: OverviewStats | null;
  schedule: TodaySchedule | null;
  mealPlan: MealPlan | null;
  goalProgress: GoalProgress | null;
}

const Overview = () => {
  const { user, isAuthenticated } = useUser();
  const [data, setData] = useState<OverviewData>({
    stats: null,
    schedule: null,
    mealPlan: null,
    goalProgress: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOverviewData = async () => {
    if (!isAuthenticated || !user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch all overview data in parallel
      const [statsRes, scheduleRes, mealPlanRes, goalProgressRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/overview/stats`, {
          credentials: 'include',
        }),
        fetch(`${API_BASE_URL}/api/overview/schedule`, {
          credentials: 'include',
        }),
        fetch(`${API_BASE_URL}/api/overview/mealplan`, {
          credentials: 'include',
        }),
        fetch(`${API_BASE_URL}/api/overview/goalprogress`, {
          credentials: 'include',
        }),
      ]);

      const stats = statsRes.ok ? await statsRes.json() : null;
      const schedule = scheduleRes.ok ? await scheduleRes.json() : null;
      const mealPlan = mealPlanRes.ok ? await mealPlanRes.json() : null;
      const goalProgress = goalProgressRes.ok ? await goalProgressRes.json() : null;

      setData({
        stats: stats?.data || null,
        schedule: schedule?.data || null,
        mealPlan: mealPlan?.data || null,
        goalProgress: goalProgress?.data || null,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch overview data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverviewData();
  }, [isAuthenticated, user]);

  if (error) {
    return (
      <div className="flex w-full min-h-screen py-6">
        <div className="flex-[10] p-4 lg:p-6">
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <div className="text-red-600 text-4xl mb-2">⚠️</div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h3>
              <p className="text-red-600">{error}</p>
              <button 
                onClick={() => fetchOverviewData()} 
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-screen py-6">
      <div className="flex-[10] p-4 lg:p-6">
        <div className="space-y-6">
          <Hero />
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading your overview data...</p>
              </div>
            </div>
          ) : (
            <>
              <ActivityCards data={data.stats} />
              <GoalProgress data={data.goalProgress} />
              <FoodLog data={data.mealPlan} />
            </>
          )}
        </div>
      </div>
      <RightSidebar data={data.schedule} goalData={data.goalProgress} />
    </div>
  );
};

export default Overview;