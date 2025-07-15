import React from 'react';
import { Dumbbell, Apple } from 'lucide-react';
import TodaySummaryCard from './TodaySummaryCard';
import QuickActionsCard from './QuickActionsCard';
import WeeklyGoalsCard from './WeeklyGoalsCard';

interface TrackerSidebarProps {
  className?: string;
}

const TrackerSidebar: React.FC<TrackerSidebarProps> = ({ className = '' }) => {
  const summaryItems = [
    {
      icon: <Dumbbell size={16} />,
      label: 'Workouts',
      value: '2/3',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      icon: <Apple size={16} />,
      label: 'Meals',
      value: '3/5',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-600'
    }
  ];

  const quickActions = [
    {
      icon: '🏃',
      title: 'Log Cardio Workout',
      description: 'Running, cycling, swimming'
    },
    {
      icon: '💪',
      title: 'Log Strength Training',
      description: 'Weight lifting, resistance'
    },
    {
      icon: '🥗',
      title: 'Quick Meal Entry',
      description: 'Add breakfast, lunch, dinner'
    }
  ];

  const weeklyGoals = [
    { label: 'Workout Days', value: '4/5' },
    { label: 'Calories Burned', value: '1,200' }
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