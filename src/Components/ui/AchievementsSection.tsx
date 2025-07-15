import React from 'react';
import AchievementCard from './AchievementCard';
import type { Achievement } from '../../types/workoutPlan';

interface AchievementsSectionProps {
  achievements: Achievement[];
}

const AchievementsSection: React.FC<AchievementsSectionProps> = ({ achievements }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Achievements</h3>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {achievements.map((achievement, index) => (
          <AchievementCard
            key={index}
            icon={achievement.icon}
            label={achievement.label}
            value={achievement.value}
            color={achievement.color}
          />
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection; 