import React from 'react';
import { Dumbbell, Apple, Moon } from 'lucide-react';
import TodaySummaryCard from './TodaySummaryCard';
import QuickActionsCard from './QuickActionsCard';
import WeeklyGoalsCard from './WeeklyGoalsCard';
import type { DayTrackerData } from '../../types/tracker';

interface TrackerSidebarProps {
  className?: string;
  trackerData: DayTrackerData;
  onAddEntry: (tab?: 'diet' | 'workout' | 'sleep') => void;
}

const TrackerSidebar: React.FC<TrackerSidebarProps> = ({ 
  className = '', 
  trackerData,
  onAddEntry
}) => {
  const today = new Date().toISOString().split('T')[0];
  const todayData = trackerData[today] || [];
  
  const workouts = todayData.filter(entry => entry.type === 'workout').length;
  const meals = todayData.filter(entry => entry.type === 'diet').length;
  const sleep = todayData.filter(entry => entry.type === 'sleep').length;

  const summaryItems = [
    {
      icon: <Dumbbell size={16} />,
      label: 'Workouts',
      value: `${workouts}/3`,
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      icon: <Apple size={16} />,
      label: 'Meals',
      value: `${meals}/5`,
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-600'
    },
    {
      icon: <Moon size={16} />,
      label: 'Sleep',
      value: sleep > 0 ? '✓' : '0/1',
      bgColor: sleep > 0 ? 'bg-blue-50' : 'bg-gray-50',
      textColor: sleep > 0 ? 'text-blue-600' : 'text-gray-600'
    }
  ];

  const quickActions = [
    {
      icon: '🏃',
      title: 'Log Cardio Workout',
      description: 'Running, cycling, swimming',
      onClick: () => onAddEntry('workout')
    },
    {
      icon: '🥗',
      title: 'Quick Meal Entry',
      description: 'Add breakfast, lunch, dinner',
      onClick: () => onAddEntry('diet')
    },
    {
      icon: '😴',
      title: 'Log Sleep',
      description: 'Track your sleep duration',
      onClick: () => onAddEntry('sleep')
    }
  ];

  // Calculate weekly progress
  const getWeeklyProgress = () => {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    
    let workoutDays = 0;
    let daysWithMeals = 0;
    let sleepDays = 0;
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      const dayData = trackerData[dateStr] || [];
      
      // Count days with workouts (not total workout count)
      if (dayData.filter(entry => entry.type === 'workout').length > 0) {
        workoutDays++;
      }
      
      // Count days with meals (not total meal count)
      if (dayData.filter(entry => entry.type === 'diet').length > 0) {
        daysWithMeals++;
      }
      
      // Count days with sleep entries
      if (dayData.filter(entry => entry.type === 'sleep').length > 0) {
        sleepDays++;
      }
    }
    
    return { workoutDays, daysWithMeals, sleepDays };
  };

  const { workoutDays, daysWithMeals, sleepDays } = getWeeklyProgress();

  const weeklyGoals = [
    { label: 'Workout Days', value: `${workoutDays}/5` },
    { label: 'Days with Meals', value: `${daysWithMeals}/7` },
    { label: 'Sleep Days', value: `${sleepDays}/7` }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <TodaySummaryCard items={summaryItems} />
      <QuickActionsCard actions={quickActions} />
      <WeeklyGoalsCard
        title="Weekly Goals"
        subtitle="Stay consistent with your routine"
        goals={weeklyGoals}
      />
    </div>
  );
};

export default TrackerSidebar; 