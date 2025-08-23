import React from 'react';

interface ProgressStatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle: string;
  bgGradient: string;
  textColor: string;
  iconBgColor: string;
}

const ProgressStatCard: React.FC<ProgressStatCardProps> = ({
  icon,
  title,
  value,
  subtitle,
  bgGradient,
  textColor,
  iconBgColor
}) => {
  return (
    <div className={`${bgGradient} p-6 rounded-xl shadow-sm border border-gray-100`}>
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 ${iconBgColor} rounded-full flex items-center justify-center text-white`}>
          {icon}
        </div>
        <div>
          <h3 className={`font-semibold text-sm ${textColor}`}>{title}</h3>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>
      
      <div className="mb-3">
        <div className="flex items-baseline gap-2">
          <span className={`text-3xl font-bold ${textColor}`}>{value}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressStatCard; 