import React from 'react';
import { Dumbbell, Weight, Ruler, Target, Activity } from 'lucide-react';
import type { FitnessData } from '../../types/userInfo';

interface FitnessInformationSectionProps {
  data: FitnessData;
  isEditing: boolean;
  onInputChange: (field: string, value: string) => void;
}

const FitnessInformationSection: React.FC<FitnessInformationSectionProps> = ({
  data,
  isEditing,
  onInputChange
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
          <Dumbbell size={20} className="text-orange-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">Fitness Information</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
          {isEditing ? (
            <input
              type="number"
              value={data.weight}
              onChange={(e) => onInputChange('weight', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          ) : (
            <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
              <Weight size={16} className="text-gray-500" />
              {data.weight} kg
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
          {isEditing ? (
            <input
              type="number"
              value={data.height}
              onChange={(e) => onInputChange('height', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          ) : (
            <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
              <Ruler size={16} className="text-gray-500" />
              {data.height} cm
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fitness Goal</label>
          {isEditing ? (
            <select
              value={data.fitnessGoal}
              onChange={(e) => onInputChange('fitnessGoal', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="Build Muscle">Build Muscle</option>
              <option value="Lose Weight">Lose Weight</option>
              <option value="Improve Endurance">Improve Endurance</option>
              <option value="General Fitness">General Fitness</option>
              <option value="Athletic Performance">Athletic Performance</option>
            </select>
          ) : (
            <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
              <Target size={16} className="text-gray-500" />
              {data.fitnessGoal}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
          {isEditing ? (
            <select
              value={data.activityLevel}
              onChange={(e) => onInputChange('activityLevel', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="Sedentary">Sedentary</option>
              <option value="Light">Light</option>
              <option value="Moderate">Moderate</option>
              <option value="Active">Active</option>
              <option value="Very Active">Very Active</option>
            </select>
          ) : (
            <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
              <Activity size={16} className="text-gray-500" />
              {data.activityLevel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FitnessInformationSection; 