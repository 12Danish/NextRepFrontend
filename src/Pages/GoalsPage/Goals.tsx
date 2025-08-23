import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import GoalsHero from '../../Components/ui/GoalsHero';
import GoalsStatsOverview from '../../Components/ui/GoalsStatsOverview';
import GoalsMainSection from '../../Components/ui/GoalsMainSection';
import GoalsSidebar from '../../Components/ui/GoalsSidebar';
import type { Goal, GoalCategory, GoalProgress } from '../../types/goals';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Interface for progress data from backend
interface GoalProgressData {
  [goalId: string]: {
    current: number;
    target: number;
    percentage: number;
    unit: string;
  };
}

const Goals: React.FC = () => {
  const { user, isAuthenticated } = useUser();
  const [activeTab, setActiveTab] = useState<'all' | GoalCategory>('all');
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<GoalProgress>({
    progress: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
    total: 0
  });
  const [goalProgressData, setGoalProgressData] = useState<GoalProgressData>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  // Fetch goals from backend
  const fetchGoals = async (page: number = 1, category?: string, status?: string) => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10'
      });
      
      if (category && category !== 'all') params.append('category', category);
      if (status) params.append('status', status);

      const response = await fetch(`${API_BASE_URL}/api/goal/getGoals?${params}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setGoals(data.goalsData.goals);
        setHasNext(data.goalsData.next);
        setHasPrev(data.goalsData.prev);
      }
    } catch (error) {
      console.error('Failed to fetch goals:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch progress from backend
  const fetchProgress = async () => {
    if (!isAuthenticated) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/goal/getOverallProgress`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProgress(data.progress);
      }
    } catch (error) {
      console.error('Failed to fetch progress:', error);
    }
  };

  // Fetch detailed progress data for each goal from backend routes
  const fetchGoalProgressData = async () => {
    if (!isAuthenticated || goals.length === 0) return;
    
    try {
      const progressData: GoalProgressData = {};
      
      // Fetch progress for each goal based on its category
      for (const goal of goals) {
        try {
          let progressResponse;
          
          switch (goal.category) {
            case 'diet':
              progressResponse = await fetch(`${API_BASE_URL}/api/progress/DietGoalProgress/${goal._id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              break;
              
            case 'workout':
              progressResponse = await fetch(`${API_BASE_URL}/api/progress/WorkoutGoalProgress/${goal._id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              break;
              
            case 'weight':
              progressResponse = await fetch(`${API_BASE_URL}/api/progress/WeightGoalProgress/${goal._id}`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              break;
              
            default:
              continue;
          }
          
          if (progressResponse?.ok) {
            const progressDataResponse = await progressResponse.json();
            
            // Extract progress data based on the response structure from each service
            if (goal.category === 'diet' && progressDataResponse.progress?.overall) {
              // Diet goals return overall progress percentage
              progressData[goal._id] = {
                current: progressDataResponse.progress.overall.averageProgress || 0,
                target: 100,
                percentage: progressDataResponse.progress.overall.averageProgress || 0,
                unit: '%'
              };
            } else if (goal.category === 'workout' && progressDataResponse.progress) {
              // Workout goals return completion percentage
              const workoutProgress = progressDataResponse.progress;
              progressData[goal._id] = {
                current: workoutProgress.completionRate || 0,
                target: 100,
                percentage: workoutProgress.completionRate || 0,
                unit: '%'
              };
            } else if (goal.category === 'weight' && progressDataResponse.progress !== undefined) {
              // Weight goals return progress percentage
              progressData[goal._id] = {
                current: progressDataResponse.progress,
                target: 100,
                percentage: progressDataResponse.progress,
                unit: '%'
              };
            }
          }
        } catch (error) {
          console.error(`Failed to fetch progress for goal ${goal._id}:`, error);
          // Set default progress data if fetch fails
          progressData[goal._id] = {
            current: 0,
            target: 100,
            percentage: 0,
            unit: '%'
          };
        }
      }
      
      setGoalProgressData(progressData);
    } catch (error) {
      console.error('Failed to fetch goal progress data:', error);
    }
  };

  // Fetch goals count
  const fetchGoalsCount = async () => {
    if (!isAuthenticated) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/goal/getGoalsCounter`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
      }
    } catch (error) {
      console.error('Failed to fetch goals count:', error);
    }
  };

  // Add new goal
  const handleAddGoal = async (goalData: any) => {
    if (!isAuthenticated) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/goal/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: goalData.category,
          startDate: new Date().toISOString(),
          targetDate: goalData.deadline,
          description: goalData.description,
          status: 'pending',
          data: goalData.data || {}
        }),
      });

      if (response.ok) {
        // Refresh goals and progress
        fetchGoals(currentPage, activeTab === 'all' ? undefined : activeTab);
        fetchProgress();
      }
    } catch (error) {
      console.error('Failed to add goal:', error);
    }
  };

  // Delete goal
  const deleteGoal = async (goalId: string) => {
    if (!isAuthenticated) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/goal/delete/${goalId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Refresh goals and progress
        fetchGoals(currentPage, activeTab === 'all' ? undefined : activeTab);
        fetchProgress();
      }
    } catch (error) {
      console.error('Failed to delete goal:', error);
    }
  };

  // Toggle goal completion
  const toggleGoalCompletion = async (goalId: string) => {
    if (!isAuthenticated) return;
    
    try {
      const goal = goals.find(g => g._id === goalId);
      if (!goal) return;

      const currentStatus = goal.status;
      const response = await fetch(`${API_BASE_URL}/api/goal/changeCompletionStatus/${goalId}?currentStatus=${currentStatus}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Refresh goals and progress
        fetchGoals(currentPage, activeTab === 'all' ? undefined : activeTab);
        fetchProgress();
      }
    } catch (error) {
      console.error('Failed to toggle goal completion:', error);
    }
  };

  // Update goal progress (for weight goals)
  const updateGoalProgress = async (goalId: string, newValue: number) => {
    if (!isAuthenticated) return;
    
    try {
      const goal = goals.find(g => g._id === goalId);
      if (!goal || goal.category !== 'weight') return;

      const response = await fetch(`${API_BASE_URL}/api/goal/updateWeight/${goalId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newWeight: newValue }),
      });

      if (response.ok) {
        // Refresh goals and progress
        fetchGoals(currentPage, activeTab === 'all' ? undefined : activeTab);
        fetchProgress();
        // Refresh goal progress data
        fetchGoalProgressData();
      }
    } catch (error) {
      console.error('Failed to update goal progress:', error);
    }
  };

  // Handle tab change
  const handleTabChange = (tab: 'all' | GoalCategory) => {
    setActiveTab(tab);
    setCurrentPage(1);
    fetchGoals(1, tab === 'all' ? undefined : tab);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchGoals(page, activeTab === 'all' ? undefined : activeTab);
  };

  // Load data on component mount and when user changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchGoals(1);
      fetchProgress();
      fetchGoalsCount();
    }
  }, [isAuthenticated]);

  // Fetch goal progress data when goals change
  useEffect(() => {
    if (goals.length > 0) {
      fetchGoalProgressData();
    }
  }, [goals]);

  return (
    <div className="flex w-full min-h-screen py-6">
      {/* Main Content Area */}
      <div className="flex-[10] p-4 lg:p-6">
        <div className="space-y-6">
          <GoalsHero />
          
          {/* Stats Overview */}
          <GoalsStatsOverview
            totalGoals={progress.total}
            completedGoals={progress.completed}
            overallProgress={progress.progress}
            inProgressGoals={progress.pending}
          />

          {/* Goals Main Section */}
          <GoalsMainSection
            goals={goals}
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onAddGoal={handleAddGoal}
            onToggleCompletion={toggleGoalCompletion}
            onUpdateProgress={updateGoalProgress}
            onDeleteGoal={deleteGoal}
            loading={loading}
            currentPage={currentPage}
            hasNext={hasNext}
            hasPrev={hasPrev}
            onPageChange={handlePageChange}
            goalProgressData={goalProgressData}
          />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block flex-[3] bg-white border-l border-gray-200 p-6 h-full">
        <GoalsSidebar
          goals={goals}
          completedGoals={progress.completed}
          overallProgress={progress.progress}
        />
      </div>
    </div>
  );
};

export default Goals; 