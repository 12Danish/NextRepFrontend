import React from 'react';
import { Input } from './input';
import { cn } from '../../lib/utils';

interface DateOfBirthInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
  error?: string;
}

const DateOfBirthInput: React.FC<DateOfBirthInputProps> = ({
  value,
  onChange,
  disabled = false,
  className = "",
  error
}) => {
  // Calculate max date (today - 13 years)
  const today = new Date();
  const minAge = 13;
  const maxDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
  const maxDateString = maxDate.toISOString().split('T')[0];

  // Calculate min date (today - 120 years, reasonable max age)
  const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
  const minDateString = minDate.toISOString().split('T')[0];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    
    // Check if date is in the future
    if (selectedDate > today) {
      return; // Don't allow future dates
    }
    
    // Check if user is at least 13 years old
    const age = today.getFullYear() - selectedDate.getFullYear();
    const monthDiff = today.getMonth() - selectedDate.getMonth();
    if (age < minAge || (age === minAge && monthDiff < 0)) {
      return; // Don't allow dates that make user younger than 13
    }
    
    onChange(e.target.value);
  };

  return (
    <div className="w-full">
      <Input
        type="date"
        value={value}
        onChange={handleDateChange}
        min={minDateString}
        max={maxDateString}
        disabled={disabled}
        className={cn(
          error ? "border-red-300 focus:ring-red-500" : "",
          className
        )}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">
          {error}
        </p>
      )}
      <p className="text-gray-500 text-xs mt-1">
        Must be at least 13 years old
      </p>
    </div>
  );
};

export default DateOfBirthInput;
