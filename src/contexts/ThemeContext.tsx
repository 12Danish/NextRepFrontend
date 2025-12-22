import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { DEFAULT_THEME_CONFIG } from '../types/theme';


const THEME_STORAGE_KEY = 'nextRep-theme-config';

const ThemeContext = createContext<any | undefined>(undefined);

export const useTheme = (): any => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [config, setConfig] = useState<any>(DEFAULT_THEME_CONFIG);
  const [systemPrefersDark, setSystemPrefersDark] = useState(false);

  // Detect system color scheme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemPrefersDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Load theme from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored) {
        const parsedConfig = JSON.parse(stored) as any;
        setConfig({ ...DEFAULT_THEME_CONFIG, ...parsedConfig });
      }
    } catch (error) {
      console.warn('Failed to load theme config from localStorage:', error);
    }
  }, []);

  // Determine if dark mode should be active
  const isDark = useMemo(() => {
    if (config.mode === 'dark') return true;
    if (config.mode === 'light') return false;
    return systemPrefersDark; // auto mode
  }, [config.mode, systemPrefersDark]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply theme mode
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    
    // Apply accessibility settings
    root.setAttribute('data-high-contrast', config.accessibility.highContrast.toString());
    root.setAttribute('data-color-blind-mode', config.accessibility.colorBlindMode);
    root.setAttribute('data-font-size', config.accessibility.fontSize);
    root.setAttribute('data-reduced-motion', config.accessibility.reducedMotion.toString());
    
    // Apply font size scale
    const fontSizeScales = {
      small: '0.875',
      medium: '1',
      large: '1.125',
      'extra-large': '1.25',
    };
    root.style.setProperty('--font-size-scale', fontSizeScales[config.accessibility.fontSize]);
    
    // Apply custom colors if provided
    if (config.customizations.primaryColor) {
      root.style.setProperty('--color-primary-custom', config.customizations.primaryColor);
    } else {
      root.style.removeProperty('--color-primary-custom');
    }
    
    if (config.customizations.accentColor) {
      root.style.setProperty('--color-accent-custom', config.customizations.accentColor);
    } else {
      root.style.removeProperty('--color-accent-custom');
    }
  }, [config, isDark]);

  // Update theme configuration
  const updateTheme = useCallback((updates: Partial<any>) => {
    setConfig((prevConfig:any) => {
      const newConfig = {
        ...prevConfig,
        ...updates,
        accessibility: {
          ...prevConfig.accessibility,
          ...(updates.accessibility || {}),
        },
        customizations: {
          ...prevConfig.customizations,
          ...(updates.customizations || {}),
        },
      };
      
      // Save to localStorage
      try {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(newConfig));
      } catch (error) {
        console.warn('Failed to save theme config to localStorage:', error);
      }
      
      return newConfig;
    });
  }, []);

  // Reset theme to defaults
  const resetTheme = useCallback(() => {
    setConfig(DEFAULT_THEME_CONFIG);
    try {
      localStorage.removeItem(THEME_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to remove theme config from localStorage:', error);
    }
  }, []);

  const value = useMemo<ThemeContextValue>(() => ({
    config,
    updateTheme,
    resetTheme,
    isDark,
    systemPrefersDark,
  }), [config, updateTheme, resetTheme, isDark, systemPrefersDark]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};