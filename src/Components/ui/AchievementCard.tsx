import React from 'react';
import { Calendar } from 'lucide-react';

interface AchievementCardProps {
  title: string;
  description: string;
  date: string;
  icon: string;
  className?: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  description,
  date,
  icon,
  className = ''
}) => {
  return (
    <div className={`p-4 bg-gray-50 rounded-lg ${className}`}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-lg">{icon}</span>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          <div className="flex items-center gap-1 text-xs text-orange-500">
            <Calendar size={12} />
            <span>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard; 