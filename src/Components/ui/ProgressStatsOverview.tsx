import React from 'react';
import ProgressStatCard from './ProgressStatCard';
import type { ProgressStat } from '../../types/progress';

interface ProgressStatsOverviewProps {
  stats: ProgressStat[];
}

const ProgressStatsOverview: React.FC<ProgressStatsOverviewProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <ProgressStatCard
          key={index}
          icon={stat.icon}
          label={stat.label}
          value={stat.value}
          unit={stat.unit}
          change={stat.change}
          trend={stat.trend}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default ProgressStatsOverview; 