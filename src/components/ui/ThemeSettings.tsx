import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../../Components/ui/Button';
import { cn } from '../../lib/utils';
import { Sun, Moon, Monitor, Eye, Type, Palette, RotateCcw } from 'lucide-react';

interface ThemeSettingsProps {
  className?: string;
}

export const ThemeSettings: React.FC<ThemeSettingsProps> = ({ className }) => {
  const { config, updateTheme, resetTheme, isDark, systemPrefersDark } = useTheme();

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'auto', label: 'System', icon: Monitor },
  ] as const;

  const fontSizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'extra-large', label: 'Extra Large' },
  ] as const;

  const colorBlindOptions = [
    { value: 'none', label: 'None' },
    { value: 'protanopia', label: 'Protanopia (Red-blind)' },
    { value: 'deuteranopia', label: 'Deuteranopia (Green-blind)' },
    { value: 'tritanopia', label: 'Tritanopia (Blue-blind)' },
  ] as const;

  return (
    <div className={cn('space-y-6 p-6 bg-card rounded-lg border', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Theme Settings</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={resetTheme}
          className="flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </Button>
      </div>

      {/* Theme Mode Selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-muted-foreground" />
          <label className="text-sm font-medium text-foreground">Theme Mode</label>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {themeOptions.map(({ value, label, icon: Icon }) => (
            <Button
              key={value}
              variant={config.mode === value ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateTheme({ mode: value })}
              className="flex items-center gap-2 justify-center"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Button>
          ))}
        </div>
        {config.mode === 'auto' && (
          <p className="text-xs text-muted-foreground">
            Currently using {systemPrefersDark ? 'dark' : 'light'} mode based on system preference
          </p>
        )}
      </div>

      {/* Accessibility Options */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-muted-foreground" />
          <label className="text-sm font-medium text-foreground">Accessibility</label>
        </div>

        {/* High Contrast Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">High Contrast</span>
          <Button
            variant={config.accessibility.highContrast ? 'default' : 'outline'}
            size="sm"
            onClick={() =>
              updateTheme({
                accessibility: {
                  ...config.accessibility,
                  highContrast: !config.accessibility.highContrast,
                },
              })
            }
          >
            {config.accessibility.highContrast ? 'On' : 'Off'}
          </Button>
        </div>

        {/* Reduced Motion Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-foreground">Reduce Motion</span>
          <Button
            variant={config.accessibility.reducedMotion ? 'default' : 'outline'}
            size="sm"
            onClick={() =>
              updateTheme({
                accessibility: {
                  ...config.accessibility,
                  reducedMotion: !config.accessibility.reducedMotion,
                },
              })
            }
          >
            {config.accessibility.reducedMotion ? 'On' : 'Off'}
          </Button>
        </div>

        {/* Font Size Selection */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground">Font Size</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {fontSizeOptions.map(({ value, label }) => (
              <Button
                key={value}
                variant={config.accessibility.fontSize === value ? 'default' : 'outline'}
                size="sm"
                onClick={() =>
                  updateTheme({
                    accessibility: {
                      ...config.accessibility,
                      fontSize: value,
                    },
                  })
                }
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Color Blind Mode Selection */}
        <div className="space-y-2">
          <span className="text-sm text-foreground">Color Vision Support</span>
          <select
            value={config.accessibility.colorBlindMode}
            onChange={(e) =>
              updateTheme({
                accessibility: {
                  ...config.accessibility,
                  colorBlindMode: e.target.value as any,
                },
              })
            }
            className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {colorBlindOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Theme Preview */}
      <div className="space-y-2">
        <span className="text-sm font-medium text-foreground">Preview</span>
        <div className="p-4 border border-border rounded-md bg-background">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-sm text-foreground">Primary Color</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary"></div>
              <span className="text-sm text-muted-foreground">Secondary Color</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <span className="text-sm text-destructive">Destructive Color</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};