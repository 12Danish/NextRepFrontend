import React, { useState } from 'react';
import GoalsHero from '../../Components/ui/GoalsHero';
import GoalsStatsOverview from '../../Components/ui/GoalsStatsOverview';
import GoalsMainSection from '../../Components/ui/GoalsMainSection';
import GoalsSidebar from '../../Components/ui/GoalsSidebar';
import type { Goal, GoalCategory } from '../../types/goals';

const Goals: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | GoalCategory>('all');

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Lose 10 pounds',
      category: 'weight',
      description: 'Reach target weight of 150 lbs',
      targetValue: 10,
      currentValue: 6,
      unit: 'lbs',
      deadline: '2024-08-15',
      completed: false,
      createdAt: '2024-06-01'
    },
    {
      id: '2',
      title: 'Complete 20 workouts',
      category: 'workout',
      description: 'Maintain consistent exercise routine',
      targetValue: 20,
      currentValue: 15,
      unit: 'sessions',
      deadline: '2024-07-30',
      completed: false,
      createdAt: '2024-06-10'
    },
    {
      id: '3',
      title: 'Drink 8 glasses of water daily',
      category: 'diet',
      description: 'Stay hydrated throughout the day',
      targetValue: 30,
      currentValue: 30,
      unit: 'days',
      deadline: '2024-06-30',
      completed: true,
      createdAt: '2024-06-01'
    },
    {
      id: '4',
      title: 'Sleep 8 hours daily',
      category: 'sleep',
      description: 'Maintain healthy sleep schedule',
      targetValue: 8,
      currentValue: 6.5,
      unit: 'hours avg',
      deadline: '2024-07-15',
      completed: false,
      createdAt: '2024-06-05'
    }
  ]);

  const completedGoals = goals.filter(goal => goal.completed).length;
  const totalGoals = goals.length;
  const overallProgress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  const handleAddGoal = (goalData: Omit<Goal, 'id' | 'completed' | 'createdAt'>): void => {
    const goal: Goal = {
      id: Date.now().toString(),
      title: goalData.title,
      category: goalData.category,
      description: goalData.description,
      targetValue: goalData.targetValue,
      currentValue: goalData.currentValue,
      unit: goalData.unit,
      deadline: goalData.deadline,
      completed: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setGoals([...goals, goal]);
  };

  const updateGoalProgress = (goalId: string, newValue: number): void => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const completed = newValue >= goal.targetValue;
        return { ...goal, currentValue: newValue, completed };
      }
      return goal;
    }));
  };

  const deleteGoal = (goalId: string): void => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const toggleGoalCompletion = (goalId: string): void => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        return { ...goal, completed: !goal.completed };
      }
      return goal;
    }));
  };

  return (
    <div className="flex w-full min-h-screen py-6">
      {/* Main Content Area */}
      <div className="flex-[10] p-4 lg:p-6">
        <div className="space-y-6">
          <GoalsHero />
          
          {/* Stats Overview */}
          <GoalsStatsOverview
            totalGoals={totalGoals}
            completedGoals={completedGoals}
            overallProgress={overallProgress}
            inProgressGoals={goals.filter(g => !g.completed).length}
          />

          {/* Goals Main Section */}
          <GoalsMainSection
            goals={goals}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onAddGoal={handleAddGoal}
            onToggleCompletion={toggleGoalCompletion}
            onUpdateProgress={updateGoalProgress}
            onDeleteGoal={deleteGoal}
          />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block flex-[3] bg-white border-l border-gray-200 p-6 h-full">
        <GoalsSidebar
          goals={goals}
          completedGoals={completedGoals}
          overallProgress={overallProgress}
        />
      </div>
    </div>
  );
};

export default Goals; 