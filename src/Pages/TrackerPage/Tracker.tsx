import React, { useState } from 'react';
import TrackerHero from '../../Components/ui/TrackerHero';
import TrackerCalendar from '../../Components/ui/TrackerCalendar';
import DailyDetailsSection from '../../Components/ui/DailyDetailsSection';
import TrackerSidebar from '../../Components/ui/TrackerSidebar';
import type { LoggedData, DayData, TabType } from '../../types/tracker';

const Tracker: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [activeTab, setActiveTab] = useState<TabType>('workout');

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

  const navigateMonth = (direction: number): void => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const selectedDateData: DayData = loggedData[formatDate(selectedDate)] || { workouts: [], meals: [] };

  const handleAddWorkout = (): void => {
    // TODO: Implement add workout functionality
    console.log('Add workout clicked');
  };

  const handleAddMeal = (): void => {
    // TODO: Implement add meal functionality
    console.log('Add meal clicked');
  };

  return (
    <div className="flex w-full min-h-screen py-6 bg-orange-50">
      {/* Main Content Area */}
      <div className="flex-[10] p-4 lg:p-6">
        <div className="space-y-6">
          <TrackerHero />

          {/* Calendar Section */}
          <TrackerCalendar
            currentDate={currentDate}
            selectedDate={selectedDate}
            loggedData={loggedData}
            onNavigateMonth={navigateMonth}
            onSelectDate={setSelectedDate}
          />

          {/* Daily Details Section */}
          <DailyDetailsSection
            selectedDate={selectedDate}
            dayData={selectedDateData}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onAddWorkout={handleAddWorkout}
            onAddMeal={handleAddMeal}
          />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block flex-[3] bg-white border-l border-gray-200 p-6 h-full">
        <TrackerSidebar />
      </div>
    </div>
  );
};

export default Tracker;