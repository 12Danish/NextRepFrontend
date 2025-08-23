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

interface MyScheduleProps {
  goalData: GoalProgress | null;
}

export default function MySchedule({ goalData }: MyScheduleProps) {
  if (!goalData) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Overview</h3>
        <div className="space-y-3">
          {[1, 2, 3].map((index) => (
            <div key={index} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const { goals } = goalData;

  const getActiveGoalsCount = () => {
    return (
      (goals.workout?.length || 0) +
      (goals.diet?.length || 0) +
      (goals.sleep?.length || 0)
    );
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'TBD';
    }
  };

  const getGoalProgress = (goal: any, category: 'workout' | 'diet' | 'sleep') => {
    if (!goalData.progress || !goalData.progress[category]) return 0;
    
    const progressData = goalData.progress[category];
    if (progressData.length === 0) return 0;
    
    const latestProgress = progressData[progressData.length - 1];
    
    switch (category) {
      case 'workout':
        const actualDuration = latestProgress.actual?.totalDuration || 0;
        const scheduledDuration = latestProgress.scheduled?.totalDuration || 0;
        return scheduledDuration > 0 ? Math.min((actualDuration / scheduledDuration) * 100, 100) : 0;
      
      case 'diet':
        const actualCalories = latestProgress.actual?.calories || 0;
        const scheduledCalories = latestProgress.scheduled?.calories || 0;
        return scheduledCalories > 0 ? Math.min((actualCalories / scheduledCalories) * 100, 100) : 0;
      
      case 'sleep':
        const actualHours = latestProgress.duration || 0;
        const targetHours = goal.data?.targetHours || 8;
        return targetHours > 0 ? Math.min((actualHours / targetHours) * 100, 100) : 0;
      
      default:
        return 0;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Weekly Overview</h3>
        <div className="text-sm text-gray-500">
          {getActiveGoalsCount()} active goals
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Goal Summary Cards */}
        {goals.workout?.slice(0, 2).map((goal: any, index: number) => {
          const progress = getGoalProgress(goal, 'workout');
          return (
            <div key={`workout-${index}`} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-100 text-blue-600">
                <span className="text-lg">💪</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  {goal.description || 'Workout Goal'}
                </div>
                <div className="text-sm text-gray-500">
                  Due: {formatDate(goal.targetDate)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium text-blue-600">
                  {goal.status}
                </div>
                <div className="text-xs text-gray-500">
                  {Math.round(progress)}%
                </div>
              </div>
            </div>
          );
        })}

        {goals.diet?.slice(0, 2).map((goal: any, index: number) => {
          const progress = getGoalProgress(goal, 'diet');
          return (
            <div key={`diet-${index}`} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-100 text-green-600">
                <span className="text-lg">🍽️</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  {goal.description || 'Diet Goal'}
                </div>
                <div className="text-sm text-gray-500">
                  Due: {formatDate(goal.targetDate)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium text-green-600">
                  {goal.status}
                </div>
                <div className="text-xs text-gray-500">
                  {Math.round(progress)}%
                </div>
              </div>
            </div>
          );
        })}

        {goals.sleep?.slice(0, 1).map((goal: any, index: number) => {
          const progress = getGoalProgress(goal, 'sleep');
          return (
            <div key={`sleep-${index}`} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-100 text-purple-600">
                <span className="text-lg">😴</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  {goal.description || 'Sleep Goal'}
                </div>
                <div className="text-sm text-gray-500">
                  Target: {(goal.data as any)?.targetHours || 8} hours
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium text-purple-600">
                  {goal.status}
                </div>
                <div className="text-xs text-gray-500">
                  {Math.round(progress)}%
                </div>
              </div>
            </div>
          );
        })}

        {getActiveGoalsCount() === 0 && (
          <div className="text-center py-6 text-gray-500">
            <div className="text-3xl mb-2">🎯</div>
            <p>No active goals</p>
            <p className="text-sm">Set some goals to see them here</p>
          </div>
        )}
      </div>
    </div>
  );
}