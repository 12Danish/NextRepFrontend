import React from 'react';
import { Dumbbell, Apple } from 'lucide-react';
import type { DayData } from '../../types/tracker';

interface CalendarDayProps {
  day: number;
  date: Date;
  isSelected: boolean;
  isToday: boolean;
  hasData: DayData | undefined;
  onClick: (date: Date) => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  day,
  date,
  isSelected,
  isToday,
  hasData,
  onClick
}) => {
  return (
    <div
      onClick={() => onClick(date)}
      className={`h-24 lg:h-32 p-2 border border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${isSelected ? 'bg-orange-50 border-orange-300' : ''
        } ${isToday ? 'ring-2 ring-cyan-300' : ''}`}
    >
      <div className={`text-sm font-medium mb-1 ${isToday ? 'text-cyan-600' : 'text-gray-700'}`}>
        {day}
      </div>
      {hasData && (
        <div className="space-y-1">
          {hasData.workouts.length > 0 && (
            <div className="flex items-center gap-1">
              <Dumbbell size={12} className="text-orange-500" />
              <span className="text-xs text-orange-600">{hasData.workouts.length}</span>
            </div>
          )}
          {hasData.meals.length > 0 && (
            <div className="flex items-center gap-1">
              <Apple size={12} className="text-cyan-500" />
              <span className="text-xs text-cyan-600">{hasData.meals.length}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarDay; 