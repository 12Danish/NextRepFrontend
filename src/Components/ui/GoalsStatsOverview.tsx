import React from 'react';
import { Target, CheckCircle, TrendingUp, Award } from 'lucide-react';
import StatCard from './StatCard';

interface GoalsStatsOverviewProps {
  totalGoals: number;
  completedGoals: number;
  overallProgress: number;
  inProgressGoals: number;
}

const GoalsStatsOverview: React.FC<GoalsStatsOverviewProps> = ({
  totalGoals,
  completedGoals,
  overallProgress,
  inProgressGoals
}) => {
  const stats = [
    {
      icon: <Target size={20} />,
      value: totalGoals,
      label: 'Total Goals',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-500'
    },
    {
      icon: <CheckCircle size={20} />,
      value: completedGoals,
      label: 'Completed',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-500'
    },
    {
      icon: <TrendingUp size={20} />,
      value: `${Math.round(overallProgress)}%`,
      label: 'Overall Progress',
      bgColor: 'bg-cyan-100',
      iconColor: 'text-cyan-500'
    },
    {
      icon: <Award size={20} />,
      value: inProgressGoals,
      label: 'In Progress',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          icon={stat.icon}
          value={stat.value}
          label={stat.label}
          bgColor={stat.bgColor}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  );
};

export default GoalsStatsOverview; 