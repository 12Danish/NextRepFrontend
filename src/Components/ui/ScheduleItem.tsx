import React from 'react';

interface ScheduleItemProps {
  day: string;
  name: string;
  time: string;
  duration: string;
  type: 'warmup' | 'strength' | 'flexibility';
  className?: string;
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({
  day,
  name,
  time,
  duration,
  type,
  className = ''
}) => {
  const getWorkoutTypeIcon = (type: string) => {
    switch (type) {
      case 'warmup':
        return { icon: '🤸', color: 'bg-orange-100', textColor: 'text-orange-600' };
      case 'strength':
        return { icon: '💪', color: 'bg-blue-100', textColor: 'text-blue-600' };
      case 'flexibility':
        return { icon: '🧘', color: 'bg-purple-100', textColor: 'text-purple-600' };
      default:
        return { icon: '🏃', color: 'bg-gray-100', textColor: 'text-gray-600' };
    }
  };

  const getWorkoutTypeColor = (type: string) => {
    switch (type) {
      case 'warmup':
        return 'text-orange-500';
      case 'strength':
        return 'text-blue-500';
      case 'flexibility':
        return 'text-purple-500';
      default:
        return 'text-gray-500';
    }
  };

  const typeInfo = getWorkoutTypeIcon(type);
  const durationColor = getWorkoutTypeColor(type);

  return (
    <div className={className}>
      <h4 className="text-sm font-medium text-gray-600 mb-2">{day}</h4>
      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <div className={`w-8 h-8 ${typeInfo.color} rounded-full flex items-center justify-center`}>
          <span className={`${typeInfo.textColor} text-xs`}>{typeInfo.icon}</span>
        </div>
        <div className="flex-1">
          <div className="font-medium text-sm">{name}</div>
          <div className="text-xs text-gray-500">{time}</div>
        </div>
        <div className={`text-xs ${durationColor} font-medium`}>{duration}</div>
      </div>
    </div>
  );
};

export default ScheduleItem; 