import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface ProgressStatCardProps {
  icon: string;
  label: string;
  value: string;
  unit: string;
  change: string;
  trend: 'up' | 'down';
  color: string;
  className?: string;
}

const ProgressStatCard: React.FC<ProgressStatCardProps> = ({
  icon,
  label,
  value,
  unit,
  change,
  trend,
  color,
  className = ''
}) => {
  return (
    <div className={`${color} rounded-2xl p-6 text-white ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <span className="text-xl">{icon}</span>
        </div>
        <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-green-200' : 'text-red-200'}`}>
          {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span>{change}</span>
        </div>
      </div>
      <div className="text-2xl font-bold mb-1">
        {value} <span className="text-lg font-normal">{unit}</span>
      </div>
      <div className="text-sm opacity-80">{label}</div>
    </div>
  );
};

export default ProgressStatCard; 