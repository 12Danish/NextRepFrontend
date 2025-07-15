import React from 'react';
import { Calendar } from 'lucide-react';

interface DeadlineIndicatorProps {
  deadline: string;
  showIcon?: boolean;
  showDate?: boolean;
  className?: string;
}

const DeadlineIndicator: React.FC<DeadlineIndicatorProps> = ({
  deadline,
  showIcon = true,
  showDate = true,
  className = ''
}) => {
  const getDaysUntilDeadline = (deadline: string): number => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const daysLeft = getDaysUntilDeadline(deadline);

  const getStatusColor = (days: number): string => {
    if (days < 0) return 'text-red-600';
    if (days <= 7) return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getStatusText = (days: number): string => {
    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days === 0) return 'Due today';
    return `${days} days left`;
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showIcon && <Calendar size={16} />}
      {showDate && (
        <span className="text-sm text-gray-600">
          Due: {new Date(deadline).toLocaleDateString()}
        </span>
      )}
      <div className={`text-sm font-medium ${getStatusColor(daysLeft)}`}>
        {getStatusText(daysLeft)}
      </div>
    </div>
  );
};

export default DeadlineIndicator; 