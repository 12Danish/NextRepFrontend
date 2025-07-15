import React from 'react';
import ScheduleItem from './ScheduleItem';
import type { ScheduleItem as ScheduleItemType } from '../../types/workoutPlan';

interface WorkoutSidebarProps {
  schedule: ScheduleItemType[];
  onViewAll?: () => void;
  className?: string;
}

const WorkoutSidebar: React.FC<WorkoutSidebarProps> = ({
  schedule,
  onViewAll,
  className = ''
}) => {


  return (
    <div className={`space-y-6 ${className}`}>
      {/* My Schedule Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">My Schedule</h3>
          <button 
            onClick={onViewAll}
            className="text-orange-500 text-sm hover:text-orange-600"
          >
            View All →
          </button>
        </div>

        <div className="space-y-4">
          {schedule.map((item, index) => (
            <ScheduleItem
              key={index}
              day={item.day}
              name={item.name}
              time={item.time}
              duration={item.duration}
              type={item.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutSidebar; 