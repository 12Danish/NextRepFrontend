import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { WorkoutDataPoint } from '../../types/progress';

interface WeeklyWorkoutChartProps {
  data: WorkoutDataPoint[];
  className?: string;
}

const WeeklyWorkoutChart: React.FC<WeeklyWorkoutChartProps> = ({ data, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm lg:col-span-2 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Weekly Workout Activity</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="day" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e2e8f0', 
              borderRadius: '8px' 
            }} 
          />
          <Bar dataKey="calories" fill="#F97316" radius={[4, 4, 0, 0]} />
          <Bar dataKey="workouts" fill="#06B6D4" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-sm text-gray-600">Calories Burned</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
          <span className="text-sm text-gray-600">Workouts Completed</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyWorkoutChart; 