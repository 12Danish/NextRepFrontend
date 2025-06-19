import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Dumbbell, Apple, Clock, Target, Calendar as CalendarIcon } from 'lucide-react';

// Type definitions
interface Workout {
  type: string;
  duration: string;
  calories: number;
  completed: boolean;
}

interface Meal {
  type: string;
  food: string;
  calories: number;
}

interface DayData {
  workouts: Workout[];
  meals: Meal[];
}

interface LoggedData {
  [key: string]: DayData;
}

type TabType = 'workout' | 'diet';

const Tracker: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<TabType>('workout');

  // Sample data for logged activities
  const loggedData: LoggedData = {
    '2024-06-15': {
      workouts: [
        { type: 'Cardio', duration: '30 min', calories: 250, completed: true },
        { type: 'Strength', duration: '45 min', calories: 180, completed: true }
      ],
      meals: [
        { type: 'Breakfast', food: 'Oatmeal & Fruits', calories: 320 },
        { type: 'Lunch', food: 'Grilled Chicken Salad', calories: 450 }
      ]
    },
    '2024-06-17': {
      workouts: [
        { type: 'Yoga', duration: '60 min', calories: 200, completed: true }
      ],
      meals: [
        { type: 'Breakfast', food: 'Protein Smoothie', calories: 280 }
      ]
    },
    '2024-06-19': {
      workouts: [
        { type: 'HIIT', duration: '25 min', calories: 300, completed: false }
      ],
      meals: []
    }
  };

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

  const navigateMonth = (direction: number): void => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
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
          onClick={() => setSelectedDate(date)}
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

  const selectedDateData: DayData = loggedData[formatDate(selectedDate)] || { workouts: [], meals: [] };

  return (
    <div className="flex w-full min-h-screen py-6 bg-orange-50">
      {/* Main Content Area */}
      <div className="flex-[10] p-4 lg:p-6">
        <div className="space-y-6">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <div className="flex-1 mb-4 lg:mb-0"> 
                <h1 className="text-2xl lg:text-4xl font-bold mb-3">Activity Tracker</h1>
                <p className="text-orange-100 max-w-md text-sm lg:text-base">
                  Log your daily workouts and meals. Track your progress day by day and build healthy habits.
                </p>
              </div>
              <div className="w-full lg:w-48 h-32 lg:h-40 bg-orange-600 bg-opacity-30 rounded-xl flex items-center justify-center">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📅</span>
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 w-48 h-full bg-orange-600 opacity-30 rounded-l-full transform translate-x-24"></div>
          </div>

          {/* Calendar Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChevronLeft size={20} className="text-gray-600" />
                </button>
                <button
                  onClick={() => navigateMonth(1)}
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

          {/* Daily Details Section */}
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
                  onClick={() => setActiveTab('workout')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === 'workout'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  <Dumbbell size={16} className="inline mr-2" />
                  Workouts
                </button>
                <button
                  onClick={() => setActiveTab('diet')}
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
                  <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                    <Plus size={16} />
                    Add Workout
                  </button>
                </div>

                {selectedDateData.workouts.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDateData.workouts.map((workout: Workout, index: number) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${workout.completed ? 'bg-green-100' : 'bg-orange-100'
                              }`}>
                              <Dumbbell size={16} className={workout.completed ? 'text-green-600' : 'text-orange-600'} />
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">{workout.type}</h5>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Clock size={14} />
                                  <span>{workout.duration}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Target size={14} />
                                  <span>{workout.calories} cal</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${workout.completed
                              ? 'bg-green-100 text-green-600'
                              : 'bg-yellow-100 text-yellow-600'
                            }`}>
                            {workout.completed ? 'Completed' : 'Planned'}
                          </div>
                        </div>
                      </div>
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
                  <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
                    <Plus size={16} />
                    Add Meal
                  </button>
                </div>

                {selectedDateData.meals.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDateData.meals.map((meal: Meal, index: number) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                              <Apple size={16} className="text-cyan-600" />
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-800">{meal.type}</h5>
                              <p className="text-sm text-gray-600">{meal.food}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-gray-800">{meal.calories}</div>
                            <div className="text-sm text-gray-500">calories</div>
                          </div>
                        </div>
                      </div>
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
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block flex-[3] bg-white border-l border-gray-200 p-6 h-full">
        <div className="space-y-6">
          {/* Quick Stats */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Today's Summary</h3>
            <div className="space-y-3">
              <div className="p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Dumbbell size={16} className="text-orange-500" />
                    <span className="text-sm font-medium">Workouts</span>
                  </div>
                  <span className="text-orange-600 font-bold">2/3</span>
                </div>
              </div>
              <div className="p-3 bg-cyan-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Apple size={16} className="text-cyan-500" />
                    <span className="text-sm font-medium">Meals</span>
                  </div>
                  <span className="text-cyan-600 font-bold">3/5</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="font-medium text-sm">🏃 Log Cardio Workout</div>
                <div className="text-xs text-gray-500">Running, cycling, swimming</div>
              </button>
              <button className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="font-medium text-sm">💪 Log Strength Training</div>
                <div className="text-xs text-gray-500">Weight lifting, resistance</div>
              </button>
              <button className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <div className="font-medium text-sm">🥗 Quick Meal Entry</div>
                <div className="text-xs text-gray-500">Add breakfast, lunch, dinner</div>
              </button>
            </div>
          </div>

          {/* Weekly Goals */}
          <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-4 text-white">
            <div className="mb-3">
              <div className="text-sm font-medium mb-1">Weekly Goals</div>
              <div className="text-xs text-orange-100 mb-4">
                Stay consistent with your routine
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Workout Days</span>
                <span className="font-bold">4/5</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Calories Burned</span>
                <span className="font-bold">1,200</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracker;