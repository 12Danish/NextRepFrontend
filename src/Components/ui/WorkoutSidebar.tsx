import React, { useState } from 'react';
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
  const [expandedDays, setExpandedDays] = useState<Set<string>>(new Set());

  const toggleDay = (day: string) => {
    const newExpanded = new Set(expandedDays);
    if (newExpanded.has(day)) {
      newExpanded.delete(day);
    } else {
      newExpanded.add(day);
    }
    setExpandedDays(newExpanded);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* My Schedule Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">My Schedule</h3>
        </div>

        <div className="space-y-4">
          {schedule.map((item, index) => (
            <div key={index} className="border p-1 border-gray-200 rounded-lg overflow-hidden">
              <ScheduleItem
                day={item.day}
                name={item.name}
                time={item.time}
                duration={item.duration}
                type={item.type}
                onClick={() => toggleDay(item.day)}
                isExpanded={expandedDays.has(item.day)}
              />
              
              {/* Expanded workout details */}
              {expandedDays.has(item.day) && item.workouts && item.workouts.length > 0 && (
                <div className="bg-gray-50 p-3 border-t border-gray-200">
                  <div className="space-y-2">
                    {item.workouts.map((workout: any, workoutIndex: number) => (
                      <div key={workoutIndex} className="flex items-center justify-between text-sm">
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">{workout.exerciseName}</div>
                          <div className="text-gray-600">
                            {new Date(workout.workoutDateAndTime).toLocaleTimeString('en-US', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })} • {workout.duration || 0} min
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {workout.type}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutSidebar; 