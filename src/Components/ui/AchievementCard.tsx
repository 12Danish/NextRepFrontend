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
    <div className={`bg-gradient-to-br from-${color}-500 to-${color}-600 rounded-2xl p-4 text-white ${className}`}>
      <div className="flex flex-col items-center text-center gap-2">
        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <span className="text-2xl">{icon}</span>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-1">{label}</h4>
          <p className="text-xs text-blue-100">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard; 