import React from 'react';
import AchievementCard from './AchievementCard';
import ProgressSummaryCard from './ProgressSummaryCard';
import type { Achievement } from '../../types/progress';

interface ProgressSidebarProps {
  achievements: Achievement[];
  className?: string;
}

const ProgressSidebar: React.FC<ProgressSidebarProps> = ({ achievements, className = '' }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Achievements Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Recent Achievements</h3>
          <button className="text-orange-500 text-sm hover:text-orange-600 font-medium">View All →</button>
        </div>

        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={index}
              title={achievement.title}
              description={achievement.description}
              date={achievement.date}
              icon={achievement.icon}
            />
          ))}
        </div>
      </div>

      <ProgressSummaryCard
        title="This Month's Summary"
        subtitle="Great progress! You're on track to meet your goals."
        stats={[
          { label: 'Workouts Completed', value: '24/30' },
          { label: 'Calories Burned', value: '8,450' },
          { label: 'Weight Progress', value: '-2.1kg' }
        ]}
        goalAchievement="80%"
      />
    </div>
  );
};

export default ProgressSidebar; 