import React from 'react';

interface MealPlanCalendarProps {
  currentDate: Date;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onNavigateMonth: (direction: number) => void;
  existingMeals: { [key: string]: any[] };
}

const MealPlanCalendar: React.FC<MealPlanCalendarProps> = ({
  currentDate,
  selectedDate,
  onSelectDate,
  onNavigateMonth,
  existingMeals
}) => {
  // Utility function to create consistent dates at midnight local time
  const createLocalDate = (year: number, month: number, day: number): Date => {
    return new Date(year, month, day, 0, 0, 0, 0);
  };

  // Utility function to get today's date at midnight local time
  const getTodayLocal = (): Date => {
    const now = new Date();
    // Add a small buffer to handle edge cases around midnight
    const bufferMinutes = 1;
    const adjustedTime = new Date(now.getTime() + (bufferMinutes * 60 * 1000));
    return createLocalDate(adjustedTime.getFullYear(), adjustedTime.getMonth(), adjustedTime.getDate());
  };

  // Check if a date is today - using the same logic as WorkoutCreationModal
  const checkIfToday = (date: Date): boolean => {
    const todayLocal = getTodayLocal();
    const dateLocal = createLocalDate(date.getFullYear(), date.getMonth(), date.getDate());
    
    return dateLocal.getTime() === todayLocal.getTime();
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const formatDate = (date: Date): string => {
    // Use local date formatting to avoid timezone issues
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const hasMealsOnDate = (date: Date): boolean => {
    const dateKey = formatDate(date);
    return existingMeals[dateKey] && existingMeals[dateKey].length > 0;
  };

  const renderCalendarDays = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      // Create date at midnight in local timezone to ensure consistency
      const date = createLocalDate(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isSelected = formatDate(date) === formatDate(selectedDate);
      const hasMeals = hasMealsOnDate(date);
      const isToday = checkIfToday(date);

      days.push(
        <button
          key={day}
          onClick={() => onSelectDate(date)}
          className={`
            h-12 w-full rounded-lg border-2 transition-all duration-200 hover:bg-orange-100
            ${isSelected 
              ? 'border-orange-500 bg-orange-100 text-orange-700' 
              : 'border-gray-200 hover:border-orange-300'
            }
            ${isToday ? 'ring-2 ring-orange-300' : ''}
            ${hasMeals ? 'bg-green-50 border-green-300' : ''}
          `}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <span className={`text-sm font-medium ${isSelected ? 'text-orange-700' : 'text-gray-700'}`}>
              {day}
            </span>
            {hasMeals && (
              <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
            )}
          </div>
        </button>
      );
    }

    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Select Dates</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNavigateMonth(-1)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-lg font-medium text-gray-700 min-w-[120px] text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button
            onClick={() => onNavigateMonth(1)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="h-8 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-500 uppercase">{day}</span>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-100 border-2 border-orange-300 rounded"></div>
          <span className="text-xs text-gray-600">Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-50 border-2 border-green-300 rounded"></div>
          <span className="text-xs text-gray-600">Has Meals</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
          <span className="text-xs text-gray-600">Today</span>
        </div>
      </div>
    </div>
  );
};

export default MealPlanCalendar;
