import React from 'react';
import { TrendingUp, Activity, Target, Heart } from 'lucide-react';
import ProgressStatCard from './ProgressStatCard';
import type { ProgressStats } from '../../types/userInfo';

interface ProgressOverviewSectionProps {
  stats: ProgressStats;
}

const ProgressOverviewSection: React.FC<ProgressOverviewSectionProps> = ({ stats }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <TrendingUp size={20} className="text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Progress Overview</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProgressStatCard
          icon={<Activity size={16} className="text-white" />}
          title="Workouts"
          value={stats.workouts}
          subtitle="This month"
          bgGradient="bg-gradient-to-br from-blue-50 to-blue-100"
          textColor="text-blue-600"
          iconBgColor="bg-blue-500"
        />

        <ProgressStatCard
          icon={<Target size={16} className="text-white" />}
          title="Goals"
          value={stats.goals}
          subtitle="Achieved"
          bgGradient="bg-gradient-to-br from-purple-50 to-purple-100"
          textColor="text-purple-600"
          iconBgColor="bg-purple-500"
        />

        <ProgressStatCard
          icon={<Heart size={16} className="text-white" />}
          title="Streak"
          value={stats.streak}
          subtitle="Days"
          bgGradient="bg-gradient-to-br from-pink-50 to-pink-100"
          textColor="text-pink-600"
          iconBgColor="bg-pink-500"
        />
      </div>
    </div>
  );
};

export default ProgressOverviewSection; 