import React from 'react';

interface ScheduleItemProps {
  day: string;
  name: string;
  time: string;
  duration: string;
  type: 'warmup' | 'strength' | 'flexibility' | 'cardio' | 'rest' | 'mixed';
  className?: string;
  onClick?: () => void;
  isExpanded?: boolean;
}

const ScheduleItem: React.FC<ScheduleItemProps> = ({
  day,
  name,
  time,
  duration,
  type,
  className = '',
  onClick,
  isExpanded = false
}) => {
  const getWorkoutTypeIcon = (type: string) => {
    switch (type) {
      case 'warmup':
        return { icon: '🤸', color: 'bg-orange-100', textColor: 'text-orange-600' };
      case 'strength':
        return { icon: '💪', color: 'bg-blue-100', textColor: 'text-blue-600' };
      case 'flexibility':
        return { icon: '🧘', color: 'bg-purple-100', textColor: 'text-purple-600' };
      case 'cardio':
        return { icon: '🏃', color: 'bg-green-100', textColor: 'text-green-600' };
      case 'rest':
        return { icon: '😴', color: 'bg-gray-100', textColor: 'text-gray-600' };
      case 'mixed':
        return { icon: '🔄', color: 'bg-indigo-100', textColor: 'text-indigo-600' };
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
      case 'cardio':
        return 'text-green-500';
      case 'rest':
        return 'text-gray-500';
      case 'mixed':
        return 'text-indigo-500';
      default:
        return 'text-gray-500';
    }
  };

  const typeInfo = getWorkoutTypeIcon(type);
  const durationColor = getWorkoutTypeColor(type);

  return (
    <div className={className}>
      <h4 className="text-sm font-medium text-gray-600 mb-2">{day}</h4>
      <div 
        className={`flex items-center gap-3 p-3 bg-gray-50 rounded-lg ${onClick ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''}`}
        onClick={onClick}
      >
        <div className={`w-8 h-8 ${typeInfo.color} rounded-full flex items-center justify-center`}>
          <span className={`${typeInfo.textColor} text-xs`}>{typeInfo.icon}</span>
        </div>
        <div className="flex-1">
          <div className="font-medium text-sm">{name}</div>
          <div className="text-xs text-gray-500">{time}</div>
        </div>
        <div className={`text-xs ${durationColor} font-medium`}>{duration}</div>
        {onClick && (
          <div className="ml-2">
            <svg 
              className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleItem; 