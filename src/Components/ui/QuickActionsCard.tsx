import React from 'react';
import type { QuickAction } from '../../types/tracker';

interface QuickActionsCardProps {
  actions: QuickAction[];
  className?: string;
}

const QuickActionsCard: React.FC<QuickActionsCardProps> = ({ actions, className = '' }) => {
  return (
    <div className={className}>
      <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
      <div className="space-y-2">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <div className="font-medium text-sm">{action.icon} {action.title}</div>
            <div className="text-xs text-gray-500">{action.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsCard; 