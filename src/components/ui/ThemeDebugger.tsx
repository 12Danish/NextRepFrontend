import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * Debug component to help identify theme issues
 * Shows current theme state and common color values
 */
export const ThemeDebugger: React.FC = () => {
  const { config, isDark, systemPrefersDark } = useTheme();

  const getComputedColor = (property: string) => {
    if (typeof window === 'undefined') return 'N/A';
    const root = document.documentElement;
    const value = getComputedStyle(root).getPropertyValue(property);
    return value || 'Not set';
  };

  return (
    <div className="">
      
    </div>
  );
};