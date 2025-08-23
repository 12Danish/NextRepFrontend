import React from 'react';
import type { ReactNode } from 'react';

interface StatCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
  bgColor?: string;
  iconColor?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  value,
  label,
  bgColor = 'bg-orange-100',
  iconColor = 'text-orange-500',
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm ${className}`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${bgColor} rounded-full flex items-center justify-center`}>
          <div className={iconColor}>
            {icon}
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-800">{value}</div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
      </div>
    </div>
  );
};

export default StatCard; 