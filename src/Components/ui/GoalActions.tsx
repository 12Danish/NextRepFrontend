import React from 'react';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';

interface GoalActionsProps {
  isCompleted: boolean;
  onToggleCompletion: () => void;
  onDelete: () => void;
  className?: string;
}

const GoalActions: React.FC<GoalActionsProps> = ({
  isCompleted,
  onToggleCompletion,
  onDelete,
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={onToggleCompletion}
        className="mt-1"
        aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {isCompleted ? (
          <CheckCircle size={20} className="text-green-500" />
        ) : (
          <Circle size={20} className="text-gray-400 hover:text-gray-600" />
        )}
      </button>
      <button
        onClick={onDelete}
        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Delete goal"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default GoalActions; 