import React from 'react';
import { Award } from 'lucide-react';

interface AchievementBadgeProps {
  title: string;
  subtitle: string;
  className?: string;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  title,
  subtitle,
  className = ''
}) => {
  return (
    <div className={`bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-xl ${className}`}>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
          <Award size={20} className="text-white" />
        </div>
        <div>
          <div className="font-semibold text-purple-800">{title}</div>
          <div className="text-sm text-purple-600">{subtitle}</div>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadge; 