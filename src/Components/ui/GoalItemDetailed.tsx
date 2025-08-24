import React from 'react';
import CategoryBadge from './CategoryBadge';
import ProgressBar from './ProgressBar';
import DeadlineIndicator from './DeadlineIndicator';
import GoalActions from './GoalActions';
import type { Goal } from '../../types/goals';

interface GoalItemDetailedProps {
  goal: Goal;
  onToggleCompletion: (goalId: string) => void;
  onUpdateProgress: (goalId: string, newValue: number) => void;
  onDelete: (goalId: string) => void;
  goalProgressData?: {
    current: number;
    target: number;
    percentage: number;
    unit: string;
  };
  progressLoading?: boolean;
}

const GoalItemDetailed: React.FC<GoalItemDetailedProps> = ({
  goal,
  onToggleCompletion,
  onUpdateProgress,
  onDelete,
  goalProgressData,
  progressLoading = false
}) => {
  const getGoalTitle = (): string => {
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

  const getProgressData = () => {
    // If we have real progress data from backend, use it
    if (goalProgressData) {
      return {
        current: goalProgressData.current,
        target: goalProgressData.target,
        unit: goalProgressData.unit
      };
    }

    // Fallback to local calculation if no backend data
    switch (goal.category) {
      case 'weight':
        const weightData = goal.data as any;
        const current = weightData.currentWeight;
        const target = weightData.targetWeight;
        const initial = weightData.previousWeights?.[0]?.weight || current;
        
        if (weightData.goalType === 'loss') {
          const totalToLose = initial - target;
          const lost = initial - current;
          return { current: lost, target: totalToLose, unit: 'lbs' };
        } else if (weightData.goalType === 'gain') {
          const totalToGain = target - initial;
          const gained = current - initial;
          return { current: gained, target: totalToGain, unit: 'lbs' };
        } else {
          return { current: 0, target: 0, unit: 'lbs' };
        }
      
      case 'diet':
        const dietData = goal.data as any;
        return { current: 0, target: dietData.targetCalories, unit: 'calories' };
      
      case 'sleep':
        const sleepData = goal.data as any;
        return { current: 0, target: sleepData.targetHours, unit: 'hours' };
      
      case 'workout':
        const workoutData = goal.data as any;
        return { current: 0, target: workoutData.targetMinutes || workoutData.targetReps || 1, unit: workoutData.targetMinutes ? 'minutes' : 'reps' };
      
      default:
        return { current: 0, target: 1, unit: '' };
    }
  };

  const progressData = getProgressData();
  const isCompleted = goal.status === 'completed';

  return (
    <div className="p-5 bg-gray-50 rounded-lg">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <GoalActions
            isCompleted={isCompleted}
            onToggleCompletion={() => onToggleCompletion(goal._id)}
            onDelete={() => onDelete(goal._id)}
          />
          <div className="flex-1">
            <h5 className={`font-semibold ${isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {getGoalTitle()}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="flex-1">
          <ProgressBar
            current={progressData.current}
            target={progressData.target}
            color={isCompleted ? 'green' : 'orange'}
            showValues={true}
            showPercentage={true}
            loading={progressLoading}
          />
        </div>

        <DeadlineIndicator deadline={goal.targetDate} />
      </div>
    </div>
  );
};

export default GoalItemDetailed; 