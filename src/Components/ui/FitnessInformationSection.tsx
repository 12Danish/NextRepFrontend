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
              value={data.weight || ''}
              onChange={(e) => onInputChange('weight', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          ) : (
            <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
              <Weight size={16} className="text-gray-500" />
              {data.weight ? `${data.weight} kg` : 'Not set'}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
          {isEditing ? (
            <input
              type="number"
              value={data.height || ''}
              onChange={(e) => onInputChange('height', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          ) : (
            <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
              <Ruler size={16} className="text-gray-500" />
              {data.height ? `${data.height} cm` : 'Not set'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FitnessInformationSection; 