import React from 'react';
import { Dumbbell, Apple, Moon, Scale, Target } from 'lucide-react';

type GoalCategory = 'workout' | 'diet' | 'sleep' | 'weight' | 'other';

interface GoalsCategoryTabsProps {
  activeTab: 'all' | GoalCategory;
  onTabChange: (tab: 'all' | GoalCategory) => void;
}

const GoalsCategoryTabs: React.FC<GoalsCategoryTabsProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs = [
    { id: 'all' as const, label: 'All Goals', icon: null },
    { id: 'workout' as const, label: 'Workout', icon: <Dumbbell size={16} className="inline mr-2" /> },
    { id: 'diet' as const, label: 'Diet', icon: <Apple size={16} className="inline mr-2" /> },
    { id: 'sleep' as const, label: 'Sleep', icon: <Moon size={16} className="inline mr-2" /> },
    { id: 'weight' as const, label: 'Weight', icon: <Scale size={16} className="inline mr-2" /> }
  ];

  const getTabStyles = (tabId: string) => {
    const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap';
    
    if (activeTab === tabId) {
      const activeColors = {
        all: 'bg-orange-500 text-white',
        workout: 'bg-orange-500 text-white',
        diet: 'bg-cyan-500 text-white',
        sleep: 'bg-purple-500 text-white',
        weight: 'bg-green-500 text-white'
      };
      return `${baseStyles} ${activeColors[tabId as keyof typeof activeColors]}`;
    }
    
    return `${baseStyles} bg-gray-100 text-gray-600 hover:bg-gray-200`;
  };

  return (
    <div className="flex items-center gap-4 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={getTabStyles(tab.id)}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default GoalsCategoryTabs; 