import React from 'react';

interface AchievementCardProps {
  icon: string;
  label: string;
  value: string;
  color: string;
  className?: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  icon,
  label,
  value,
  color,
  className = ''
}) => {
  return (
    <div className={`${color} rounded-2xl p-6 text-white text-center ${className}`}>
      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
        <span className="text-xl">{icon}</span>
      </div>
      <div className="text-sm font-medium mb-1">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
};

export default AchievementCard; 