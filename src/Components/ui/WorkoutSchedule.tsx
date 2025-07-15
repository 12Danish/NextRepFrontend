import React from 'react';
import WorkoutScheduleItem from './WorkoutScheduleItem';
import type { WorkoutItem } from '../../types/workoutPlan';

interface WorkoutScheduleProps {
  workouts: WorkoutItem[];
  onStartWorkout?: (workout: WorkoutItem) => void;
}

const WorkoutSchedule: React.FC<WorkoutScheduleProps> = ({
  workouts,
  onStartWorkout
}) => {


  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Today's Workout</h3>

      <div className="space-y-4">
        {workouts.map((workout, index) => (
          <WorkoutScheduleItem
            key={index}
            name={workout.name}
            time={workout.time}
            duration={workout.duration}
            type={workout.type}
            onStartWorkout={() => onStartWorkout?.(workout)}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkoutSchedule; 