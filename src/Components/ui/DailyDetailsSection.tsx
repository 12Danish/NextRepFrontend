import React from 'react';
import { Dumbbell, Apple, Plus } from 'lucide-react';
import WorkoutItem from './WorkoutItem';
import MealItem from './MealItem';
import type { Workout, Meal, DayData, TabType } from '../../types/tracker';

interface DailyDetailsSectionProps {
  selectedDate: Date;
  dayData: DayData;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onAddWorkout: () => void;
  onAddMeal: () => void;
}

const DailyDetailsSection: React.FC<DailyDetailsSectionProps> = ({
  selectedDate,
  dayData,
  activeTab,
  onTabChange,
  onAddWorkout,
  onAddMeal
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">
          {selectedDate.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onTabChange('workout')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'workout'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            <Dumbbell size={16} className="inline mr-2" />
            Workouts
          </button>
          <button
            onClick={() => onTabChange('diet')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'diet'
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            <Apple size={16} className="inline mr-2" />
            Diet
          </button>
        </div>
      </div>

      {/* Workout Tab */}
      {activeTab === 'workout' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-700">Workout Sessions</h4>
            <button 
              onClick={onAddWorkout}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Plus size={16} />
              Add Workout
            </button>
          </div>

          {dayData.workouts.length > 0 ? (
            <div className="space-y-3">
              {dayData.workouts.map((workout: Workout, index: number) => (
                <WorkoutItem
                  key={index}
                  type={workout.type}
                  duration={workout.duration}
                  calories={workout.calories}
                  completed={workout.completed}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Dumbbell size={48} className="mx-auto mb-3 text-gray-300" />
              <p>No workouts logged for this day</p>
              <p className="text-sm">Click "Add Workout" to get started</p>
            </div>
          )}
        </div>
      )}

      {/* Diet Tab */}
      {activeTab === 'diet' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-700">Meals & Nutrition</h4>
            <button 
              onClick={onAddMeal}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors"
            >
              <Plus size={16} />
              Add Meal
            </button>
          </div>

          {dayData.meals.length > 0 ? (
            <div className="space-y-3">
              {dayData.meals.map((meal: Meal, index: number) => (
                <MealItem
                  key={index}
                  type={meal.type}
                  food={meal.food}
                  calories={meal.calories}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Apple size={48} className="mx-auto mb-3 text-gray-300" />
              <p>No meals logged for this day</p>
              <p className="text-sm">Click "Add Meal" to track your nutrition</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DailyDetailsSection; 