import React from 'react';
import WeightProgressChart from './WeightProgressChart';
import BodyCompositionChart from './BodyCompositionChart';
import WeeklyWorkoutChart from './WeeklyWorkoutChart';
import type { WeightDataPoint, WorkoutDataPoint, BodyCompositionDataPoint } from '../../types/progress';

interface ProgressChartsSectionProps {
  weightData: WeightDataPoint[];
  workoutData: WorkoutDataPoint[];
  bodyCompositionData: BodyCompositionDataPoint[];
}

const ProgressChartsSection: React.FC<ProgressChartsSectionProps> = ({
  weightData,
  workoutData,
  bodyCompositionData
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <WeightProgressChart data={weightData} />
      <BodyCompositionChart data={bodyCompositionData} />
      <WeeklyWorkoutChart data={workoutData} />
    </div>
  );
};

export default ProgressChartsSection; 