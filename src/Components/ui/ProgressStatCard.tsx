import React from 'react';

interface ProgressStatCardProps {
  icon: string;
  label: string;
  value: string;
  unit: string;
  change: string;
  trend: 'up' | 'down';
  color: string;
}

const ProgressStatCard: React.FC<ProgressStatCardProps> = ({
  icon,
  label,
  value,
  unit,
  change,
  trend,
  color
}) => {
  const getTrendIcon = (trend: 'up' | 'down') => {
    return trend === 'up' ? '↗️' : '↘️';
  };

  const getTrendColor = (trend: 'up' | 'down') => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 ${color} rounded-full flex items-center justify-center text-white text-lg`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 text-sm">{label}</h3>
          <p className="text-xs text-gray-500">Current Progress</p>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">{value}</span>
          <span className="text-lg text-gray-600">{unit}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <span className={`text-sm font-medium ${getTrendColor(trend)}`}>
          {getTrendIcon(trend)} {change}
        </span>
      </div>
    </div>
  );
};

export default ProgressStatCard; 