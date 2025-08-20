import React from 'react';
import { Play } from 'lucide-react';

interface WorkoutScheduleItemProps {
  name: string;
  time: string;
  duration: string;
  type: 'warmup' | 'strength' | 'flexibility' | 'cardio';
  reps: number;
  sets: number;
  targetMuscleGroup: string[];
  onStartWorkout?: () => void;
  className?: string;
}

const WorkoutScheduleItem: React.FC<WorkoutScheduleItemProps> = ({
  name,
  time,
  duration,
  type,
  reps,
  sets,
  targetMuscleGroup,
  onStartWorkout,
  className = ''
}) => {
  const getWorkoutTypeStyles = (type: string) => {
    switch (type) {
      case 'warmup':
        return {
          bgColor: 'bg-orange-100',
          textColor: 'text-orange-600',
          badgeBg: 'bg-orange-100',
          badgeText: 'text-orange-600',
          buttonBg: 'bg-orange-500 hover:bg-orange-600',
          icon: '🤸'
        };
      case 'strength':
        return {
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-600',
          badgeBg: 'bg-blue-100',
          badgeText: 'text-blue-600',
          buttonBg: 'bg-blue-500 hover:bg-blue-600',
          icon: '💪'
        };
      case 'flexibility':
        return {
          bgColor: 'bg-purple-100',
          textColor: 'text-purple-600',
          badgeBg: 'bg-purple-100',
          badgeText: 'text-purple-600',
          buttonBg: 'bg-purple-500 hover:bg-purple-600',
          icon: '🧘'
        };
      case 'cardio':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-600',
          badgeBg: 'bg-green-100',
          badgeText: 'text-green-600',
          buttonBg: 'bg-green-500 hover:bg-green-600',
          icon: '🏃'
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-600',
          badgeBg: 'bg-gray-100',
          badgeText: 'text-gray-600',
          buttonBg: 'bg-gray-500 hover:bg-gray-600',
          icon: '🏃'
        };
    }
  };

  const styles = getWorkoutTypeStyles(type);

  return (
    <div className={`flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors ${className}`}>
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${styles.bgColor}`}>
          <span className={`text-lg ${styles.textColor}`}>
            {styles.icon}
          </span>
        </div>
        <div>
          <h4 className="font-semibold text-gray-800">{name}</h4>
          <p className="text-gray-500 text-sm">{time}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-600">
              {reps} reps × {sets} sets
            </span>
            {targetMuscleGroup.length > 0 && (
              <div className="flex gap-1">
                {targetMuscleGroup.map((muscle, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full capitalize"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles.badgeBg} ${styles.badgeText}`}>
          {duration}
        </span>
        <button 
          className={`w-8 h-8 rounded-full flex items-center justify-center ${styles.buttonBg} text-white transition-colors`}
          onClick={onStartWorkout}
        >
          <Play size={14} fill="currentColor" />
        </button>
      </div>
    </div>
  );
};

export default WorkoutScheduleItem; 