import React from 'react';
import { ChevronLeft, ChevronRight, Dumbbell, Apple } from 'lucide-react';
import type { DayData, LoggedData } from '../../types/tracker';

interface TrackerCalendarProps {
  currentDate: Date;
  selectedDate: Date;
  loggedData: LoggedData;
  onNavigateMonth: (direction: number) => void;
  onSelectDate: (date: Date) => void;
}

const TrackerCalendar: React.FC<TrackerCalendarProps> = ({
  currentDate,
  selectedDate,
  loggedData,
  onNavigateMonth,
  onSelectDate
}) => {
  // Calendar helper functions
  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const renderCalendar = (): React.ReactElement[] => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days: React.ReactElement[] = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 lg:h-32"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateStr = formatDate(date);
      const isSelected = formatDate(selectedDate) === dateStr;
      const isToday = formatDate(new Date()) === dateStr;
      const hasData = loggedData[dateStr];

      days.push(
        <div
          key={day}
          onClick={() => onSelectDate(date)}
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
    }

    return days;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <button
            onClick={() => onNavigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day: string) => (
          <div key={day} className="p-3 text-center font-medium text-gray-500 border-b border-gray-200">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
        {renderCalendar()}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-cyan-300 ring-2 ring-cyan-300 rounded"></div>
          <span className="text-gray-600">Today</span>
        </div>
        <div className="flex items-center gap-2">
          <Dumbbell size={16} className="text-orange-500" />
          <span className="text-gray-600">Workouts</span>
        </div>
        <div className="flex items-center gap-2">
          <Apple size={16} className="text-cyan-500" />
          <span className="text-gray-600">Meals</span>
        </div>
      </div>
    </div>
  );
};

export default TrackerCalendar; 