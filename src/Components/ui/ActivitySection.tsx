import ActivityCard from './ActivityCard';

const ActivityCards = () => {
  const activityData = [
    {
      title: 'Workout',
      value: '00',
      subtitle: '4 hrs',
      icon: '💪',
      gradientFrom: 'cyan-400',
      gradientTo: 'cyan-500'
    },
    {
      title: 'Calories',
      value: '🔥',
      subtitle: '1,200 Cal',
      icon: '🔥',
      gradientFrom: 'orange-400',
      gradientTo: 'orange-500'
    },
    {
      title: 'Steps',
      value: '👥',
      subtitle: '20,000 Steps',
      icon: '👥',
      gradientFrom: 'purple-400',
      gradientTo: 'purple-500'
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
        />
      ))}
    </div>
  );
};

export default ActivityCards; 