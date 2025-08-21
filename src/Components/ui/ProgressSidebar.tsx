import React from 'react';
import AchievementCard from './AchievementCard';
import ProgressSummaryCard from './ProgressSummaryCard';
import type { Achievement } from '../../types/progress';

interface ProgressSidebarProps {
  achievements: Achievement[];
  sidebarData: {
    workoutsCompleted: number;
    totalWorkouts: number;
    caloriesBurned: number;
    weightProgress: number;
    goalAchievement: number;
  };
  className?: string;
}

const ProgressSidebar: React.FC<ProgressSidebarProps> = ({ achievements, sidebarData, className = '' }) => {
  // Generate meaningful subtitle based on goal achievement
  const getSubtitle = (achievement: number) => {
    if (achievement >= 80) return "Excellent progress! You're exceeding your goals.";
    if (achievement >= 60) return "Great progress! You're on track to meet your goals.";
    if (achievement >= 40) return "Good progress! Keep up the momentum.";
    if (achievement >= 20) return "Making progress! Every step counts.";
    return "Getting started! Set some goals to begin your journey.";
  };

  // Generate weight progress text
  const getWeightProgressText = (weightDiff: number) => {
    if (weightDiff === 0) return "Target reached!";
    if (weightDiff > 0) return `+${weightDiff.toFixed(1)}kg`;
    return `${weightDiff.toFixed(1)}kg`;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Achievements Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">Recent Achievements</h3>
          <button className="text-orange-500 text-sm hover:text-orange-600 font-medium">View All →</button>
        </div>

        <div className="space-y-4">
          {achievements.length > 0 ? (
            achievements.map((achievement, index) => (
              <AchievementCard
                key={index}
                title={achievement.title}
                description={achievement.description}
                date={achievement.date}
                icon={achievement.icon}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-2">🎯</div>
              <p className="text-sm">No achievements yet</p>
              <p className="text-xs">Complete goals to earn achievements!</p>
            </div>
          )}
        </div>
      </div>

      <ProgressSummaryCard
        title="This Week's Summary"
        subtitle={getSubtitle(sidebarData.goalAchievement)}
        stats={[
          { 
            label: 'Workouts Completed', 
            value: `${sidebarData.workoutsCompleted}/${sidebarData.totalWorkouts}` 
          },
          { 
            label: 'Calories Burned', 
            value: sidebarData.caloriesBurned.toLocaleString() 
          },
          { 
            label: 'Weight Progress', 
            value: getWeightProgressText(sidebarData.weightProgress) 
          }
        ]}
        goalAchievement={`${sidebarData.goalAchievement}%`}
      />
    </div>
  );
};

export default ProgressSidebar; 