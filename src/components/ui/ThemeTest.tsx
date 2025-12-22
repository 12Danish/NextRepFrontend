import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useThemeColors } from '../../hooks/useThemeColors';
import { Button } from '../../Components/ui/Button';
import { Input } from '../../Components/ui/input';

/**
 * Component to test theme functionality
 * This can be temporarily added to any page to verify theme system works
 */
export const ThemeTest: React.FC = () => {
  const { config, isDark, systemPrefersDark } = useTheme();
  const colors = useThemeColors();

  return (
    <div className="p-6 space-y-4 bg-card border border-border rounded-lg">
      <h3 className="text-lg font-semibold text-foreground">Theme System Test</h3>
      
      {/* Theme Status */}
      <div className="space-y-2 text-sm">
        <p className="text-foreground">
          <strong>Current Mode:</strong> {config.mode} 
          {config.mode === 'auto' && ` (${systemPrefersDark ? 'dark' : 'light'} detected)`}
        </p>
        <p className="text-foreground">
          <strong>Active Theme:</strong> {isDark ? 'Dark' : 'Light'}
        </p>
        <p className="text-foreground">
          <strong>Font Size:</strong> {config.accessibility.fontSize}
        </p>
        <p className="text-foreground">
          <strong>High Contrast:</strong> {config.accessibility.highContrast ? 'On' : 'Off'}
        </p>
        <p className="text-foreground">
          <strong>Color Blind Mode:</strong> {config.accessibility.colorBlindMode}
        </p>
      </div>

      {/* Color Swatches */}
      <div className="space-y-2">
        <h4 className="font-medium text-foreground">Color Swatches</h4>
        <div className="grid grid-cols-4 gap-2">
          <div className="space-y-1">
            <div className="w-full h-8 bg-primary rounded"></div>
            <span className="text-xs text-muted-foreground">Primary</span>
          </div>
          <div className="space-y-1">
            <div className="w-full h-8 bg-secondary rounded"></div>
            <span className="text-xs text-muted-foreground">Secondary</span>
          </div>
          <div className="space-y-1">
            <div className="w-full h-8 bg-destructive rounded"></div>
            <span className="text-xs text-muted-foreground">Destructive</span>
          </div>
          <div className="space-y-1">
            <div className="w-full h-8 bg-muted rounded"></div>
            <span className="text-xs text-muted-foreground">Muted</span>
          </div>
        </div>
      </div>

      {/* Component Tests */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Component Tests</h4>
        
        <div className="flex gap-2 flex-wrap">
          <Button variant="default">Default Button</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>

        <Input placeholder="Test input field" />

        <div className="p-3 bg-muted rounded border border-border">
          <p className="text-muted-foreground">
            This is muted text in a muted background container.
          </p>
        </div>
      </div>

      {/* Typography Scale Test */}
      <div className="space-y-2">
        <h4 className="font-medium text-foreground">Typography Scale</h4>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">Extra small text (12px base)</p>
          <p className="text-sm text-muted-foreground">Small text (14px base)</p>
          <p className="text-base text-foreground">Base text (16px base)</p>
          <p className="text-lg text-foreground">Large text (18px base)</p>
          <p className="text-xl text-foreground">Extra large text (20px base)</p>
        </div>
      </div>
    </div>
  );
};