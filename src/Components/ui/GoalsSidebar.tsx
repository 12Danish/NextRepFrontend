import React from 'react';
import { Dumbbell, Apple, Moon, Scale } from 'lucide-react';
import type { Goal } from '../../types/goals';

interface GoalsSidebarProps {
  goals: Goal[];
  completedGoals: number;
  overallProgress: number;
}

const GoalsSidebar: React.FC<GoalsSidebarProps> = ({
  goals,
  completedGoals,
  overallProgress
}) => {
  const categoryIcons = {
    workout: <Dumbbell size={20} className="text-orange-500" />,
    diet: <Apple size={20} className="text-cyan-500" />,
    sleep: <Moon size={20} className="text-purple-500" />,
    weight: <Scale size={20} className="text-green-500" />
  };

  const getDaysUntilDeadline = (deadline: string): number => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getGoalTitle = (goal: Goal): string => {
    switch (goal.category) {
      case 'weight':
        const weightData = goal.data as any;
        return `${weightData.goalType === 'loss' ? 'Lose' : weightData.goalType === 'gain' ? 'Gain' : 'Maintain'} weight`;
      case 'diet':
        const dietData = goal.data as any;
        return `Target ${dietData.targetCalories} calories`;
      case 'sleep':
        const sleepData = goal.data as any;
        return `Sleep ${sleepData.targetHours} hours`;
      case 'workout':
        const workoutData = goal.data as any;
        return workoutData.exerciseName || 'Workout goal';
      default:
        return goal.description;
    }
  };

  return (
    <div className="space-y-6">
      {/* Goal Categories */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-4">Goal Categories</h3>
        <div className="space-y-3">
          {Object.entries(categoryIcons).map(([category, icon]) => {
            const categoryGoals = goals.filter(g => g.category === category);
            const completed = categoryGoals.filter(g => g.status === 'completed').length;
            const total = categoryGoals.length;

            return (
              <div key={category} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {icon}
                    <span className="text-sm font-medium capitalize">{category}</span>
                  </div>
                  <span className="text-sm font-bold">{completed}/{total}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-4">Upcoming Deadlines</h3>
        <div className="space-y-2">
          {goals
            .filter(g => g.status !== 'completed')
            .sort((a, b) => new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime())
            .slice(0, 5)
            .map((goal) => {
              const daysLeft = getDaysUntilDeadline(goal.targetDate);
              return (
                <div key={goal._id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-sm text-gray-800 mb-1">{getGoalTitle(goal)}</div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {new Date(goal.targetDate).toLocaleDateString()}
                    </div>
                    <div className={`text-xs font-medium ${daysLeft <= 7 ? 'text-red-600' : 'text-gray-600'}`}>
                      {daysLeft} days
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Achievement Badge */}
      <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-4 text-white">
        <div className="mb-3">
          <div className="text-sm font-medium mb-1">Achievement Level</div>
          <div className="text-xs text-orange-100 mb-4">
            Keep up the great work!
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Goals Completed</span>
            <span className="font-bold">{completedGoals}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Success Rate</span>
            <span className="font-bold">{Math.round(overallProgress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsSidebar; 