import React from 'react';
import type { SummaryItem } from '../../types/tracker';

interface TodaySummaryCardProps {
  items: SummaryItem[];
  className?: string;
}

const TodaySummaryCard: React.FC<TodaySummaryCardProps> = ({ items, className = '' }) => {
  return (
    <div className={className}>
      <h3 className="font-semibold text-gray-800 mb-4">Today's Summary</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className={`p-3 ${item.bgColor} rounded-lg`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={item.textColor}>
                  {item.icon}
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <span className={`${item.textColor} font-bold`}>{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaySummaryCard; 