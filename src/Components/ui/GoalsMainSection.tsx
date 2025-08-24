import React, { useState } from 'react';
import { Plus, Target, ChevronLeft, ChevronRight } from 'lucide-react';
import GoalsCategoryTabs from './GoalsCategoryTabs';
import AddGoalForm from './AddGoalForm';
import GoalItemDetailed from './GoalItemDetailed';
import type { Goal, GoalCategory } from '../../types/goals';

interface GoalsMainSectionProps {
  goals: Goal[];
  activeTab: 'all' | GoalCategory;
  onTabChange: (tab: 'all' | GoalCategory) => void;
  onAddGoal: (goal: any) => void;
  onToggleCompletion: (goalId: string) => void;
  onUpdateProgress: (goalId: string, newValue: number) => void;
  onDeleteGoal: (goalId: string) => void;
  loading: boolean;
  progressLoading?: boolean;
  currentPage: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPageChange: (page: number) => void;
  goalProgressData: { [goalId: string]: { current: number; target: number; percentage: number; unit: string; } };
}

const GoalsMainSection: React.FC<GoalsMainSectionProps> = ({
  goals,
  activeTab,
  onTabChange,
  onAddGoal,
  onToggleCompletion,
  onUpdateProgress,
  onDeleteGoal,
  loading,
  progressLoading = false,
  currentPage,
  hasNext,
  hasPrev,
  onPageChange,
  goalProgressData
}) => {
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  const filteredGoals = activeTab === 'all' ? goals : goals.filter(goal => goal.category === activeTab);

  const handleAddGoal = (goalData: any) => {
    onAddGoal(goalData);
    setShowAddForm(false);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="text-center py-12 text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-3"></div>
          <p>Loading goals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <GoalsCategoryTabs activeTab={activeTab} onTabChange={onTabChange} />
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
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
          <>
            {filteredGoals.map((goal: Goal) => (
              <GoalItemDetailed
                key={goal._id}
                goal={goal}
                onToggleCompletion={onToggleCompletion}
                onUpdateProgress={onUpdateProgress}
                onDelete={onDeleteGoal}
                goalProgressData={goalProgressData[goal._id]}
                progressLoading={progressLoading}
              />
            ))}
            
            {/* Pagination */}
            {(hasNext || hasPrev) && (
              <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={!hasPrev}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                    hasPrev
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>
                
                <span className="px-3 py-2 text-gray-600">
                  Page {currentPage}
                </span>
                
                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={!hasNext}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                    hasNext
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Target size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No goals yet</h3>
            <p className="text-gray-500 mb-6">Start by creating your first goal to track your progress</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center cursor-pointer gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Plus size={16} />
              Create Your First Goal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalsMainSection; 