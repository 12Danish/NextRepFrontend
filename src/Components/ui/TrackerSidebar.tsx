import React from 'react';
import { Dumbbell, Apple, Moon, Target, TrendingUp } from 'lucide-react';
import TodaySummaryCard from './TodaySummaryCard';
import QuickActionsCard from './QuickActionsCard';
import WeeklyGoalsCard from './WeeklyGoalsCard';
import type { DayTrackerData, TrackerEntry } from '../../types/tracker';

interface TrackerSidebarProps {
  className?: string;
  trackerData: DayTrackerData;
  onAddEntry: () => void;
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
      onClick: onAddEntry
    },
    {
      icon: '💪',
      title: 'Log Strength Training',
      description: 'Weight lifting, resistance',
      onClick: onAddEntry
    },
    {
      icon: '🥗',
      title: 'Quick Meal Entry',
      description: 'Add breakfast, lunch, dinner',
      onClick: onAddEntry
    },
    {
      icon: '😴',
      title: 'Log Sleep',
      description: 'Track your sleep duration',
      onClick: onAddEntry
    }
  ];

  // Calculate weekly progress
  const getWeeklyProgress = () => {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    
    let weeklyWorkouts = 0;
    let weeklyMeals = 0;
    let weeklySleep = 0;
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      const dateStr = date.toISOString().split('T')[0];
      const dayData = trackerData[dateStr] || [];
      
      weeklyWorkouts += dayData.filter(entry => entry.type === 'workout').length;
      weeklyMeals += dayData.filter(entry => entry.type === 'diet').length;
      weeklySleep += dayData.filter(entry => entry.type === 'sleep').length;
    }
    
    return { weeklyWorkouts, weeklyMeals, weeklySleep };
  };

  const { weeklyWorkouts, weeklyMeals, weeklySleep } = getWeeklyProgress();

  const weeklyGoals = [
    { label: 'Workout Days', value: `${weeklyWorkouts}/5` },
    { label: 'Meals Tracked', value: `${weeklyMeals}/35` },
    { label: 'Sleep Days', value: `${weeklySleep}/7` }
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