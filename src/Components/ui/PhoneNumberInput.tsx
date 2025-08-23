import React from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './PhoneNumberInput.css';
import { cn } from '../../lib/utils';

interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  onChange,
  placeholder = "Enter your phone number",
  disabled = false,
  className = "",
  error
}) => {
  return (
    <div className="w-full">
      <PhoneInput
        international
        defaultCountry="US"
        value={value}
        onChange={(phone) => onChange(phone || '')}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "flex h-12 w-full rounded-lg border bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-red-300 focus:ring-red-500" : "border-gray-300",
          className
        )}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default PhoneNumberInput;
