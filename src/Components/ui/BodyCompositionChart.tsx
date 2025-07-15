import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { BodyCompositionDataPoint } from '../../types/progress';

interface BodyCompositionChartProps {
  data: BodyCompositionDataPoint[];
  className?: string;
}

const BodyCompositionChart: React.FC<BodyCompositionChartProps> = ({ data, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm ${className}`}>
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Body Composition</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
            <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BodyCompositionChart; 