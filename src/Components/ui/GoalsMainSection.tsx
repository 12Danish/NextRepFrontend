import React, { useState } from 'react';
import { Plus, Target } from 'lucide-react';
import GoalsCategoryTabs from './GoalsCategoryTabs';
import AddGoalForm from './AddGoalForm';
import GoalItemDetailed from './GoalItemDetailed';

interface Goal {
  id: string;
  title: string;
  category: 'workout' | 'diet' | 'sleep' | 'weight' | 'other';
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  completed: boolean;
  createdAt: string;
}

type GoalCategory = 'workout' | 'diet' | 'sleep' | 'weight' | 'other';

interface GoalsMainSectionProps {
  goals: Goal[];
  activeTab: 'all' | GoalCategory;
  onTabChange: (tab: 'all' | GoalCategory) => void;
  onAddGoal: (goal: Omit<Goal, 'id' | 'completed' | 'createdAt'>) => void;
  onToggleCompletion: (goalId: string) => void;
  onUpdateProgress: (goalId: string, newValue: number) => void;
  onDeleteGoal: (goalId: string) => void;
}

const GoalsMainSection: React.FC<GoalsMainSectionProps> = ({
  goals,
  activeTab,
  onTabChange,
  onAddGoal,
  onToggleCompletion,
  onUpdateProgress,
  onDeleteGoal
}) => {
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  const filteredGoals = activeTab === 'all' ? goals : goals.filter(goal => goal.category === activeTab);

  const handleAddGoal = (goalData: any) => {
    onAddGoal({
      title: goalData.title,
      category: goalData.category,
      description: goalData.description,
      targetValue: goalData.targetValue,
      currentValue: goalData.currentValue,
      unit: goalData.unit,
      deadline: goalData.deadline
    });
    setShowAddForm(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <GoalsCategoryTabs activeTab={activeTab} onTabChange={onTabChange} />
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus size={16} />
          Add Goal
        </button>
      </div>

      {/* Add Goal Form */}
      <AddGoalForm
        isVisible={showAddForm}
        onAddGoal={handleAddGoal}
        onCancel={() => setShowAddForm(false)}
      />

      {/* Goals List */}
      <div className="space-y-4">
        {filteredGoals.length > 0 ? (
          filteredGoals.map((goal: Goal) => (
            <GoalItemDetailed
              key={goal.id}
              goal={goal}
              onToggleCompletion={onToggleCompletion}
              onUpdateProgress={onUpdateProgress}
              onDelete={onDeleteGoal}
            />
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Target size={48} className="mx-auto mb-3 text-gray-300" />
            <p>No goals found for this category</p>
            <p className="text-sm">Create your first goal to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalsMainSection; 