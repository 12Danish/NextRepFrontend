export interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto';
  accessibility: {
    highContrast: boolean;
    colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
    fontSize: 'small' | 'medium' | 'large' | 'extra-large';
    reducedMotion: boolean;
  };
  customizations: {
    primaryColor?: string;
    accentColor?: string;
  };
}

export interface ThemeContextValue {
  config: ThemeConfig;
  updateTheme: (updates: Partial<ThemeConfig>) => void;
  resetTheme: () => void;
  isDark: boolean;
  systemPrefersDark: boolean;
}

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  mode: 'auto',
  accessibility: {
    highContrast: false,
    colorBlindMode: 'none',
    fontSize: 'medium',
    reducedMotion: false,
  },
  customizations: {},
};

export const FONT_SIZE_SCALES = {
  small: 0.875,
  medium: 1,
  large: 1.125,
  'extra-large': 1.25,
} as const;

export const COLOR_BLIND_FILTERS = {
  none: '',
  protanopia: 'url(#protanopia-filter)',
  deuteranopia: 'url(#deuteranopia-filter)',
  tritanopia: 'url(#tritanopia-filter)',
} as const;