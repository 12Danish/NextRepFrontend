import React from 'react';

interface GoalProgressInputProps {
  currentValue: number;
  onUpdate: (newValue: number) => void;
  className?: string;
  placeholder?: string;
}

const GoalProgressInput: React.FC<GoalProgressInputProps> = ({
  currentValue,
  onUpdate,
  className = '',
  placeholder = 'Update progress'
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    onUpdate(value);
  };

  return (
    <input
      type="number"
      value={currentValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={`w-20 p-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-500 ${className}`}
    />
  );
};

export default GoalProgressInput; 