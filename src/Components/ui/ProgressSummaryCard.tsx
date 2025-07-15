import React from 'react';
import { Target } from 'lucide-react';

interface ProgressSummaryCardProps {
  title: string;
  subtitle: string;
  stats: Array<{
    label: string;
    value: string;
  }>;
  goalAchievement: string;
  className?: string;
}

const ProgressSummaryCard: React.FC<ProgressSummaryCardProps> = ({
  title,
  subtitle,
  stats,
  goalAchievement,
  className = ''
}) => {
  return (
    <div className={`bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-4 text-white ${className}`}>
      <div className="mb-3">
        <div className="text-sm font-medium mb-1">{title}</div>
        <div className="text-xs text-orange-100 mb-4">
          {subtitle}
        </div>
      </div>
      
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm">{stat.label}</span>
            <span className="font-bold">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-orange-400">
        <div className="flex items-center gap-2">
          <Target size={16} />
          <span className="text-sm">Goal Achievement: {goalAchievement}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressSummaryCard; 