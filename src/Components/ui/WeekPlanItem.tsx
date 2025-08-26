import React, { useState } from 'react';

interface WeekPlanItemProps {
  day: string;
  meal: string;
  time: string;
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack' | null;
  hasMultipleMeals?: boolean;
  allMeals?: any[];
  dateKey?: string;
}

const WeekPlanItem = ({ day, meal, time, mealType, hasMultipleMeals, allMeals, dateKey }: WeekPlanItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getMealTypeColor = (type: string | null | undefined) => {
    switch (type) {
      case 'breakfast': return 'bg-yellow-100 text-yellow-800';
      case 'lunch': return 'bg-green-100 text-green-800';
      case 'dinner': return 'bg-blue-100 text-blue-800';
      case 'snack': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getMealTypeIcon = (type: string | null | undefined) => {
    switch (type) {
      case 'breakfast': return '🌅';
      case 'lunch': return '🌞';
      case 'dinner': return '🌙';
      case 'snack': return '🍎';
      default: return '🍽️';
    }
  };

  return (
    <div>
      <h4 className="text-sm font-medium text-gray-600 mb-2">{day}</h4>
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm">{getMealTypeIcon(mealType)}</span>
            <div className="font-medium text-sm text-gray-800">{meal}</div>
            {hasMultipleMeals && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full hover:bg-orange-200 cursor-pointer transition-colors"
              >
                {isExpanded ? '-less' : '+more'}
              </button>
            )}
          </div>
          {mealType && (
            <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getMealTypeColor(mealType)}`}>
              {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
            </div>
          )}
        </div>
        <div className="text-xs text-orange-500 font-medium">{time}</div>
      </div>
      
      {/* Expanded meals section */}
      {isExpanded && hasMultipleMeals && allMeals && allMeals.length > 1 && (
        <div className="mt-3 space-y-3">
          {allMeals.slice(1).map((meal, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">{getMealTypeIcon(meal.meal)}</span>
                  <div className="font-medium text-sm text-gray-800">{meal.foodName}</div>
                </div>
                {meal.meal && (
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getMealTypeColor(meal.meal)}`}>
                    {meal.meal.charAt(0).toUpperCase() + meal.meal.slice(1)}
                  </div>
                )}
              </div>
              <div className="text-xs text-orange-500 font-medium">
                {new Date(meal.mealDateAndTime).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeekPlanItem; 