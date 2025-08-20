import React from 'react';
import { Users, TrendingUp } from 'lucide-react';
import type { TrainerInfo } from '../../types/workoutPlan';

interface TrainerCardProps {
  trainerInfo: TrainerInfo;
}

const TrainerCard: React.FC<TrainerCardProps> = ({
  trainerInfo
}) => {
  const { trainerName, trainerRole, workoutType, workoutCategory, difficulty } = trainerInfo;
  return (
    <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full overflow-hidden flex items-center justify-center">
          <span className="text-lg font-bold text-purple-700">
            {trainerName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
          </span>
        </div>
        <div>
          <h3 className="font-semibold">{trainerName}</h3>
          <p className="text-purple-100 text-sm">{trainerRole}</p>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-xl font-bold mb-1">{workoutType}</h4>
        <h4 className="text-xl font-semibold text-purple-100">Workout</h4>
      </div>

      <div className="flex gap-2">
        <div className="flex items-center gap-2 border border-white bg-opacity-20 rounded-full px-3 py-1">
          <Users size={14} />
          <span className="text-sm text-white">{workoutCategory}</span>
        </div>
        <div className="flex items-center gap-2 border border-white bg-opacity-20 rounded-full px-3 py-1">
          <TrendingUp size={14} />
          <span className="text-sm text-white">{difficulty}</span>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500 bg-opacity-30 rounded-full transform translate-x-16 translate-y-16"></div>
    </div>
  );
};

export default TrainerCard; 