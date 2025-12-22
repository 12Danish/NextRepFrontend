import { useState, useEffect } from 'react';
import Hero from '../../Components/ui/OverviewHero';
import ActivityCards from '../../Components/ui/ActivitySection';
import DailyProgressChart from '../../Components/ui/DailyProgressChart';
import FoodLog from '../../Components/ui/FoodLog';
import RightSidebar from '../../Components/ui/RightSidebar';
import { ThemeTest } from '../../components/ui/ThemeTest';
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
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewType, setViewType] = useState<'week' | 'month'>('week');

  const fetchOverviewData = async (date: string = selectedDate) => {
    if (!isAuthenticated || !user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch all overview data in parallel
      const [statsRes, scheduleRes, mealPlanRes, goalProgressRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/overview/stats?date=${date}`, {
          credentials: 'include',
        }),
        fetch(`${API_BASE_URL}/api/overview/schedule`, {
          credentials: 'include',
        }),
        fetch(`${API_BASE_URL}/api/overview/mealplan?date=${date}`, {
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
    fetchOverviewData(selectedDate);
  }, [isAuthenticated, user]);

  if (error) {
    return (
      <div className="flex w-full min-h-screen py-6">
        <div className="flex-[10] p-4 lg:p-6">
          <div className="space-y-6">
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-6 text-center">
              <div className="text-destructive text-4xl mb-2">⚠️</div>
              <h3 className="text-lg font-semibold text-destructive mb-2">Something went wrong</h3>
              <p className="text-destructive">{error}</p>
              <button 
                onClick={() => fetchOverviewData(selectedDate)} 
                className="mt-4 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
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
          
          {/* Theme Test - Temporary for testing */}
          <ThemeTest />
          
          {/* Date Picker */}
          <div className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-sm border border-border">
            <label htmlFor="date-picker" className="text-sm font-medium text-foreground">
              View data for:
            </label>
            <input
              type="date"
              id="date-picker"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                fetchOverviewData(e.target.value);
              }}
              className="px-3 py-2 cursor-pointer border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
            <button
              onClick={() => {
                const today = new Date().toISOString().split('T')[0];
                setSelectedDate(today);
                fetchOverviewData(today);
              }}
              className="px-4 py-2 cursor-pointer text-sm text-primary hover:text-primary/80 font-medium"
            >
              Today
            </button>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading your overview data...</p>
              </div>
            </div>
          ) : (
            <>
              <ActivityCards data={data.stats} />
              <DailyProgressChart 
                data={data.goalProgress?.progress || null} 
                viewType={viewType}
                onViewTypeChange={setViewType}
              />
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