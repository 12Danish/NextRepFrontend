import React from 'react';
import { Dumbbell, Clock, Target } from 'lucide-react';

interface WorkoutItemProps {
  type: string;
  duration: string;
  calories: number;
  completed: boolean;
  className?: string;
}

const WorkoutItem: React.FC<WorkoutItemProps> = ({
  type,
  duration,
  calories,
  completed,
  className = ''
}) => {
  return (
    <div className={`p-4 bg-gray-50 rounded-lg ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${completed ? 'bg-green-100' : 'bg-orange-100'}`}>
            <Dumbbell size={16} className={completed ? 'text-green-600' : 'text-orange-600'} />
          </div>
          <div>
            <h5 className="font-medium text-gray-800">{type}</h5>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Target size={14} />
                <span>{calories} cal</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${completed
            ? 'bg-green-100 text-green-600'
            : 'bg-yellow-100 text-yellow-600'
          }`}>
          {completed ? 'Completed' : 'Planned'}
        </div>
      </div>
    </div>
  );
};

export default WorkoutItem; 