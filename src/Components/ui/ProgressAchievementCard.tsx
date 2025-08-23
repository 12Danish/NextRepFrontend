import React from 'react';

interface ProgressAchievementCardProps {
  title: string;
  description: string;
  date: string;
  icon: string;
  className?: string;
}

const ProgressAchievementCard: React.FC<ProgressAchievementCardProps> = ({
  title,
  description,
  date,
  icon,
  className = ''
}) => {
  return (
    <div className={`bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 text-white ${className}`}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm mb-1 truncate">{title}</h4>
          <p className="text-xs text-blue-100 mb-2 line-clamp-2">{description}</p>
          <p className="text-xs text-blue-200">{new Date(date).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          })}</p>
        </div>
      </div>
    </div>
  );
};

export default ProgressAchievementCard;
