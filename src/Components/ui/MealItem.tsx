import React from 'react';
import { Apple } from 'lucide-react';

interface MealItemProps {
  type: string;
  food: string;
  calories: number;
  className?: string;
}

const MealItem: React.FC<MealItemProps> = ({
  type,
  food,
  calories,
  className = ''
}) => {
  return (
    <div className={`p-4 bg-gray-50 rounded-lg ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
            <Apple size={16} className="text-cyan-600" />
          </div>
          <div>
            <h5 className="font-medium text-gray-800">{type}</h5>
            <p className="text-sm text-gray-600">{food}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="font-medium text-gray-800">{calories}</div>
          <div className="text-sm text-gray-500">calories</div>
        </div>
      </div>
    </div>
  );
};

export default MealItem; 