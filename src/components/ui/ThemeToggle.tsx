import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../../Components/ui/Button';
import { ThemeSettings } from './ThemeSettings';
import { Sun, Moon, Monitor, Settings } from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';

export const ThemeToggle: React.FC = () => {
  const { config, updateTheme, isDark } = useTheme();
  const [showSettings, setShowSettings] = useState(false);

  const getThemeIcon = () => {
    switch (config.mode) {
      case 'light':
        return Sun;
      case 'dark':
        return Moon;
      case 'auto':
        return Monitor;
      default:
        return Sun;
    }
  };

  const cycleTheme = () => {
    const modes = ['light', 'dark', 'auto'] as const;
    const currentIndex = modes.indexOf(config.mode);
    const nextIndex = (currentIndex + 1) % modes.length;
    updateTheme({ mode: modes[nextIndex] });
  };

  const Icon = getThemeIcon();

  return (
    <div className="flex items-center gap-1">
      {/* Quick theme toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={cycleTheme}
        className="relative"
        title={`Current theme: ${config.mode}${config.mode === 'auto' ? ` (${isDark ? 'dark' : 'light'})` : ''}`}
      >
        <Icon className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Theme settings popover */}
      <Popover.Root open={showSettings} onOpenChange={setShowSettings}>
        <Popover.Trigger asChild>
          <Button
            variant="ghost"
            size="icon"
            title="Theme settings"
          >
            <Settings className="h-4 w-4" />
            <span className="sr-only">Theme settings</span>
          </Button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="z-50 w-80 rounded-md border bg-popover p-0 text-popover-foreground shadow-md outline-none"
            sideOffset={5}
            align="end"
          >
            <ThemeSettings />
            <Popover.Arrow className="fill-border" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
};