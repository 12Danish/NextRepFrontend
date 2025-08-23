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

interface TodayScheduleProps {
  data: TodaySchedule | null;
}

export default function TodaySchedule({ data }: TodayScheduleProps) {
  if (!data) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Schedule</h3>
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

  const { workouts, meals, sleep } = data;

  const formatTime = (timeString: string) => {
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return 'TBD';
    }
  };

  const getActivityIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      workout: '💪',
      meal: '🍽️',
      sleep: '😴'
    };
    return icons[type] || '📅';
  };

  const getActivityColor = (type: string) => {
    const colors: { [key: string]: string } = {
      workout: 'bg-blue-100 text-blue-600',
      meal: 'bg-green-100 text-green-600',
      sleep: 'bg-purple-100 text-purple-600'
    };
    return colors[type] || 'bg-gray-100 text-gray-600';
  };

  const allActivities = [
    ...workouts.map(w => ({ ...w, time: w.time || new Date().toISOString() })),
    ...meals.map(m => ({ ...m, time: m.time || new Date().toISOString() })),
    ...(sleep ? [{ ...sleep, time: new Date().toISOString() }] : [])
  ].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Today's Schedule</h3>
      
      {allActivities.length > 0 ? (
        <div className="space-y-3">
          {allActivities.map((activity, index) => (
            <div key={`${activity.type}-${index}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getActivityColor(activity.type)}`}>
                <span className="text-lg">{getActivityIcon(activity.type)}</span>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  {activity.name}
                </div>
                <div className="text-sm text-gray-500 capitalize">
                  {activity.type}
                  {activity.duration && ` • ${activity.duration} min`}
                  {activity.calories && ` • ${activity.calories} cal`}
                  {activity.targetHours && ` • ${activity.targetHours} hrs`}
                </div>
              </div>
              
              <div className="text-sm font-medium text-gray-600">
                {formatTime(activity.time)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <div className="text-3xl mb-2">📅</div>
          <p>No activities scheduled for today</p>
          <p className="text-sm">Plan your day to see your schedule here</p>
        </div>
      )}
    </div>
  );
}
