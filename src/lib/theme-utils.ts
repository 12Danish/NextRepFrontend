import { ThemeConfig } from '../types/theme';

/**
 * Detects the user's system color scheme preference
 */
export function getSystemThemePreference(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Detects if the user prefers reduced motion
 */
export function getSystemReducedMotionPreference(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Applies theme configuration to document root
 */
export function applyThemeToDocument(config: ThemeConfig, isDark: boolean): void {
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
}

/**
 * Validates theme configuration
 */
export function validateThemeConfig(config: Partial<ThemeConfig>): boolean {
  try {
    if (config.mode && !['light', 'dark', 'auto'].includes(config.mode)) {
      return false;
    }
    
    if (config.accessibility?.fontSize && 
        !['small', 'medium', 'large', 'extra-large'].includes(config.accessibility.fontSize)) {
      return false;
    }
    
    if (config.accessibility?.colorBlindMode && 
        !['none', 'protanopia', 'deuteranopia', 'tritanopia'].includes(config.accessibility.colorBlindMode)) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

/**
 * Generates CSS custom properties for a theme
 */
export function generateThemeCSS(config: ThemeConfig, isDark: boolean): string {
  const properties: string[] = [];
  
  // Add font size scale
  const fontSizeScales = {
    small: '0.875',
    medium: '1',
    large: '1.125',
    'extra-large': '1.25',
  };
  properties.push(`--font-size-scale: ${fontSizeScales[config.accessibility.fontSize]}`);
  
  // Add custom colors
  if (config.customizations.primaryColor) {
    properties.push(`--color-primary-custom: ${config.customizations.primaryColor}`);
  }
  
  if (config.customizations.accentColor) {
    properties.push(`--color-accent-custom: ${config.customizations.accentColor}`);
  }
  
  return `:root { ${properties.join('; ')} }`;
}