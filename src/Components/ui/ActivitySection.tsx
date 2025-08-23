import ActivityCard from './ActivityCard';

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

interface ActivitySectionProps {
  data: OverviewStats | null;
}

const ActivityCards = ({ data }: ActivitySectionProps) => {
  if (!data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        {[1, 2, 3].map((index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  const activityData = [
    {
      title: 'Workout',
      value: data.workout.hours || 0,
      subtitle: `${data.workout.minutes || 0} min`,
      icon: '💪',
      gradientFrom: 'cyan-400',
      gradientTo: 'cyan-500',
      unit: 'hrs'
    },
    {
      title: 'Calories',
      value: data.calories || 0,
      subtitle: 'Cal',
      icon: '🔥',
      gradientFrom: 'orange-400',
      gradientTo: 'orange-500',
      unit: ''
    },
    {
      title: 'Sleep',
      value: data.sleep.hours || 0,
      subtitle: `${data.sleep.minutes || 0} min`,
      icon: '😴',
      gradientFrom: 'purple-400',
      gradientTo: 'purple-500',
      unit: 'hrs'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      {activityData.map((activity, index) => (
        <ActivityCard
          key={index}
          title={activity.title}
          value={activity.value}
          subtitle={activity.subtitle}
          icon={activity.icon}
          gradientFrom={activity.gradientFrom}
          gradientTo={activity.gradientTo}
          unit={activity.unit}
        />
      ))}
    </div>
  );
};

export default ActivityCards; 