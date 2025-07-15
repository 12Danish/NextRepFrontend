import React from 'react';
import type { WeeklyGoal } from '../../types/tracker';

interface WeeklyGoalsCardProps {
  title: string;
  subtitle: string;
  goals: WeeklyGoal[];
  className?: string;
}

const WeeklyGoalsCard: React.FC<WeeklyGoalsCardProps> = ({
  title,
  subtitle,
  goals,
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
        {goals.map((goal, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm">{goal.label}</span>
            <span className="font-bold">{goal.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyGoalsCard; 