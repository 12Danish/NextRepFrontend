import React from 'react';

interface FitnessLevelIndicatorProps {
  activityLevel: string;
  className?: string;
}

const FitnessLevelIndicator: React.FC<FitnessLevelIndicatorProps> = ({
  activityLevel,
  className = ''
}) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Fitness Level</span>
        <span className="text-sm text-orange-600 font-medium">{activityLevel}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '60%' }}></div>
      </div>
    </div>
  );
};

export default FitnessLevelIndicator; 