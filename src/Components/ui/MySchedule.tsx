import ScheduleItem from './ScheduleItem';

export default function MySchedule() {
  const scheduleData = [
    {
      icon: '🏃',
      title: 'Stretch',
      time: '08:00',
      duration: '20 Reco...',
      iconBgColor: 'bg-orange-100',
      iconTextColor: 'text-orange-600',
      durationColor: 'text-orange-500'
    },
    {
      icon: '🏃',
      title: 'Back Stretch',
      time: '09:00',
      duration: '10 Round',
      iconBgColor: 'bg-blue-100',
      iconTextColor: 'text-blue-600',
      durationColor: 'text-blue-500'
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">My Schedule</h3>
        <button className="text-orange-500 text-sm hover:text-orange-600">View All →</button>
      </div>
      
      <div className="space-y-4">
        {scheduleData.map((item, index) => (
          <ScheduleItem
            key={index}
            icon={item.icon}
            title={item.title}
            time={item.time}
            duration={item.duration}
            iconBgColor={item.iconBgColor}
            iconTextColor={item.iconTextColor}
            durationColor={item.durationColor}
          />
        ))}
      </div>
    </div>
  );
}