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

interface GoalsProps {
  goalData: GoalProgress | null;
}

export default function Goals({ goalData }: GoalsProps) {
  if (!goalData) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Goal Progress</h3>
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

  const { goals, progress } = goalData;

  const calculateWorkoutProgress = (goal: any) => {
    if (!progress.workout || progress.workout.length === 0) return 0;
    
    // Get the most recent workout data
    const latestWorkout = progress.workout[progress.workout.length - 1];
    if (!latestWorkout) return 0;

    // Calculate progress based on actual vs scheduled duration
    const actualDuration = latestWorkout.actual?.totalDuration || 0;
    const scheduledDuration = latestWorkout.scheduled?.totalDuration || 0;
    
    if (scheduledDuration === 0) return 0;
    
    // Calculate percentage (capped at 100%)
    const progressPercent = Math.min((actualDuration / scheduledDuration) * 100, 100);
    return Math.round(progressPercent);
  };

  const calculateDietProgress = (goal: any) => {
    if (!progress.diet || progress.diet.length === 0) return 0;
    
    // Get the most recent diet data
    const latestDiet = progress.diet[progress.diet.length - 1];
    if (!latestDiet) return 0;

    // Calculate progress based on actual vs scheduled calories
    const actualCalories = latestDiet.actual?.calories || 0;
    const scheduledCalories = latestDiet.scheduled?.calories || 0;
    
    if (scheduledCalories === 0) return 0;
    
    // Calculate percentage (capped at 100%)
    const progressPercent = Math.min((actualCalories / scheduledCalories) * 100, 100);
    return Math.round(progressPercent);
  };

  const calculateSleepProgress = (goal: any) => {
    if (!progress.sleep || progress.sleep.length === 0) return 0;
    
    // Get the most recent sleep data
    const latestSleep = progress.sleep[progress.sleep.length - 1];
    if (!latestSleep) return 0;

    // Get target hours from goal
    const targetHours = goal.data?.targetHours || 8;
    const actualHours = latestSleep.duration || 0;
    
    if (targetHours === 0) return 0;
    
    // Calculate percentage (capped at 100%)
    const progressPercent = Math.min((actualHours / targetHours) * 100, 100);
    return Math.round(progressPercent);
  };

  const getGoalProgress = (goal: any) => {
    switch (goal.category) {
      case 'workout':
        return calculateWorkoutProgress(goal);
      case 'diet':
        return calculateDietProgress(goal);
      case 'sleep':
        return calculateSleepProgress(goal);
      default:
        return 0;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return 'TBD';
    }
  };

  const getGoalIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      workout: '💪',
      diet: '🍽️',
      sleep: '😴'
    };
    return icons[category] || '🎯';
  };

  const getGoalColor = (category: string) => {
    const colors: { [key: string]: string } = {
      workout: 'bg-blue-100 text-blue-600',
      diet: 'bg-green-100 text-green-600',
      sleep: 'bg-purple-100 text-purple-600'
    };
    return colors[category] || 'bg-gray-100 text-gray-600';
  };

  const allGoals = [
    ...(goals.workout || []).map(g => ({ ...g, category: 'workout' })),
    ...(goals.diet || []).map(g => ({ ...g, category: 'diet' })),
    ...(goals.sleep || []).map(g => ({ ...g, category: 'sleep' }))
  ].slice(0, 3); // Show only first 3 goals

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Goal Progress</h3>
        <button className="text-orange-500 text-sm hover:text-orange-600">View All →</button>
      </div>
      
      <div className="space-y-4">
        {allGoals.map((goal: any, index: number) => {
          const progress = getGoalProgress(goal);
          
          return (
            <div key={`${goal.category}-${index}`} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getGoalColor(goal.category)}`}>
                  <span className="text-lg">{getGoalIcon(goal.category)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {goal.description || `${goal.category} Goal`}
                  </div>
                  <div className="text-sm text-gray-500">
                    Due: {formatDate(goal.targetDate)}
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-600 capitalize">
                  {goal.status}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-2">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(progress)}`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Goal Details */}
              <div className="text-xs text-gray-500">
                {goal.category === 'workout' && goal.data?.exerciseName && (
                  <span>Exercise: {goal.data.exerciseName}</span>
                )}
                {goal.category === 'diet' && goal.data?.targetCalories && (
                  <span>Target: {goal.data.targetCalories} cal/day</span>
                )}
                {goal.category === 'sleep' && goal.data?.targetHours && (
                  <span>Target: {goal.data.targetHours} hours/day</span>
                )}
              </div>
            </div>
          );
        })}

        {allGoals.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <div className="text-3xl mb-2">🎯</div>
            <p>No goals set yet</p>
            <p className="text-sm">Create some goals to track your progress</p>
          </div>
        )}
      </div>
    </div>
  );
}