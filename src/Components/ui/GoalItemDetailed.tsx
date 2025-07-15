import React from 'react';
import CategoryBadge from './CategoryBadge';
import ProgressBar from './ProgressBar';
import DeadlineIndicator from './DeadlineIndicator';
import GoalActions from './GoalActions';
import GoalProgressInput from './GoalProgressInput';

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

interface GoalItemDetailedProps {
  goal: Goal;
  onToggleCompletion: (goalId: string) => void;
  onUpdateProgress: (goalId: string, newValue: number) => void;
  onDelete: (goalId: string) => void;
}

const GoalItemDetailed: React.FC<GoalItemDetailedProps> = ({
  goal,
  onToggleCompletion,
  onUpdateProgress,
  onDelete
}) => {

  return (
    <div className="p-5 bg-gray-50 rounded-lg">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <GoalActions
            isCompleted={goal.completed}
            onToggleCompletion={() => onToggleCompletion(goal.id)}
            onDelete={() => onDelete(goal.id)}
          />
          <div className="flex-1">
            <h5 className={`font-semibold ${goal.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {goal.title}
            </h5>
            {goal.description && (
              <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CategoryBadge category={goal.category} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="flex-1">
          <ProgressBar
            current={goal.currentValue}
            target={goal.targetValue}
            color={goal.completed ? 'green' : 'orange'}
            showValues={true}
            showPercentage={true}
          />
        </div>

        <DeadlineIndicator deadline={goal.deadline} />

        <div className="flex items-center gap-2">
          <GoalProgressInput
            currentValue={goal.currentValue}
            onUpdate={(newValue) => onUpdateProgress(goal.id, newValue)}
          />
        </div>
      </div>
    </div>
  );
};

export default GoalItemDetailed; 