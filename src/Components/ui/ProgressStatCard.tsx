import React from 'react';

interface ProgressStatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle: string;
  bgGradient: string;
  textColor: string;
  iconBgColor: string;
  className?: string;
}

const ProgressStatCard: React.FC<ProgressStatCardProps> = ({
  icon,
  title,
  value,
  subtitle,
  bgGradient,
  textColor,
  iconBgColor,
  className = ''
}) => {
  return (
    <div className={`${bgGradient} p-6 rounded-xl ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-8 h-8 ${iconBgColor} rounded-full flex items-center justify-center`}>
          {icon}
        </div>
        <span className={`font-semibold ${textColor}`}>{title}</span>
      </div>
      <div className={`text-3xl font-bold ${textColor} mb-1`}>{value}</div>
      <div className={`text-sm ${textColor}`}>{subtitle}</div>
    </div>
  );
};

export default ProgressStatCard; 