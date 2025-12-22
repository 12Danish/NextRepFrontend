import { useTheme } from '../contexts/ThemeContext';
import { useMemo } from 'react';

/**
 * Hook to get theme-aware color values
 */
export function useThemeColors() {
  const { isDark, config } = useTheme();

  return useMemo(() => {
    const colors = {
      // Base colors
      background: isDark ? 'rgb(2, 6, 23)' : 'rgb(255, 255, 255)',
      foreground: isDark ? 'rgb(248, 250, 252)' : 'rgb(15, 23, 42)',
      
      // Primary colors
      primary: config.customizations.primaryColor || 'rgb(249, 115, 22)',
      primaryForeground: 'rgb(255, 255, 255)',
      
      // Secondary colors
      secondary: isDark ? 'rgb(30, 41, 59)' : 'rgb(241, 245, 249)',
      secondaryForeground: isDark ? 'rgb(248, 250, 252)' : 'rgb(15, 23, 42)',
      
      // Muted colors
      muted: isDark ? 'rgb(30, 41, 59)' : 'rgb(241, 245, 249)',
      mutedForeground: isDark ? 'rgb(148, 163, 184)' : 'rgb(100, 116, 139)',
      
      // Border and input
      border: isDark ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)',
      input: isDark ? 'rgb(30, 41, 59)' : 'rgb(226, 232, 240)',
      
      // Status colors
      destructive: isDark ? 'rgb(220, 38, 38)' : 'rgb(239, 68, 68)',
      success: isDark ? 'rgb(22, 163, 74)' : 'rgb(34, 197, 94)',
      warning: isDark ? 'rgb(217, 119, 6)' : 'rgb(245, 158, 11)',
      info: isDark ? 'rgb(37, 99, 235)' : 'rgb(59, 130, 246)',
    };

    // Apply high contrast adjustments
    if (config.accessibility.highContrast) {
      return {
        ...colors,
        background: isDark ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
        foreground: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
        border: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
        primary: isDark ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
        primaryForeground: isDark ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
      };
    }

    return colors;
  }, [isDark, config]);
}

/**
 * Hook to get CSS custom property values
 */
export function useThemeCSS() {
  const { config } = useTheme();

  return useMemo(() => ({
    fontSize: `calc(1rem * ${config.accessibility.fontSize === 'small' ? '0.875' : 
                                config.accessibility.fontSize === 'large' ? '1.125' : 
                                config.accessibility.fontSize === 'extra-large' ? '1.25' : '1'})`,
    fontSizeScale: config.accessibility.fontSize === 'small' ? '0.875' : 
                   config.accessibility.fontSize === 'large' ? '1.125' : 
                   config.accessibility.fontSize === 'extra-large' ? '1.25' : '1',
  }), [config.accessibility.fontSize]);
}