import React from 'react';
import { Dumbbell, Apple, Moon, Scale, Target } from 'lucide-react';

type GoalCategory = 'workout' | 'diet' | 'sleep' | 'weight' | 'other';

interface CategoryBadgeProps {
  category: GoalCategory;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  size = 'md',
  showIcon = true,
  className = ''
}) => {
  const categoryIcons = {
    workout: <Dumbbell size={16} className="text-orange-500" />,
    diet: <Apple size={16} className="text-cyan-500" />,
    sleep: <Moon size={16} className="text-purple-500" />,
    weight: <Scale size={16} className="text-green-500" />,
    other: <Target size={16} className="text-gray-500" />
  };

  const categoryColors = {
    workout: 'bg-orange-50 border-orange-200 text-orange-700',
    diet: 'bg-cyan-50 border-cyan-200 text-cyan-700',
    sleep: 'bg-purple-50 border-purple-200 text-purple-700',
    weight: 'bg-green-50 border-green-200 text-green-700',
    other: 'bg-gray-50 border-gray-200 text-gray-700'
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium border ${categoryColors[category]} ${sizeClasses[size]} ${className}`}>
      {showIcon && categoryIcons[category]}
      <span className="capitalize">{category}</span>
    </span>
  );
};

export default CategoryBadge; 