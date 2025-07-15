import React from 'react';
import { Activity } from 'lucide-react';
import type { WorkoutRecord } from '../../types/progress';

interface RecentWorkoutsTableProps {
  workouts: WorkoutRecord[];
  className?: string;
}

const RecentWorkoutsTable: React.FC<RecentWorkoutsTableProps> = ({ workouts, className = '' }) => {
  const getIntensityBadgeClass = (intensity: string) => {
    switch (intensity) {
      case 'High':
        return 'bg-orange-100 text-orange-600';
      case 'Medium':
        return 'bg-cyan-100 text-cyan-600';
      case 'Low':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm ${className}`}>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Workouts</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-2 font-medium text-gray-600">Date</th>
              <th className="text-left py-4 px-2 font-medium text-gray-600">Exercise</th>
              <th className="text-left py-4 px-2 font-medium text-gray-600">Duration</th>
              <th className="text-left py-4 px-2 font-medium text-gray-600">Calories</th>
              <th className="text-left py-4 px-2 font-medium text-gray-600">Intensity</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-2 text-gray-600">{workout.date}</td>
                <td className="py-4 px-2">
                  <div className="flex items-center gap-2">
                    <Activity size={16} className="text-cyan-500" />
                    <span className="font-medium text-gray-800">{workout.exercise}</span>
                  </div>
                </td>
                <td className="py-4 px-2 text-gray-600">{workout.duration}</td>
                <td className="py-4 px-2">
                  <span className="text-orange-600 font-medium">{workout.calories}</span>
                </td>
                <td className="py-4 px-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getIntensityBadgeClass(workout.intensity)}`}>
                    {workout.intensity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentWorkoutsTable; 