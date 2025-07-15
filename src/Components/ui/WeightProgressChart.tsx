import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { WeightDataPoint } from '../../types/progress';

interface WeightProgressChartProps {
  data: WeightDataPoint[];
  className?: string;
}

const WeightProgressChart: React.FC<WeightProgressChartProps> = ({ data, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm ${className}`}>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Weight Progress</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="month" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e2e8f0', 
              borderRadius: '8px' 
            }} 
          />
          <Line type="monotone" dataKey="weight" stroke="#06B6D4" strokeWidth={3} dot={{ fill: '#06B6D4', strokeWidth: 2, r: 6 }} />
          <Line type="monotone" dataKey="target" stroke="#F97316" strokeWidth={2} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeightProgressChart; 