
interface ProgressBarProps {
  current: number;
  target: number;
  showPercentage?: boolean;
  showValues?: boolean;
  color?: 'orange' | 'green' | 'blue' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  target,
  showPercentage = true,
  showValues = true,
  color = 'orange',
  size = 'md',
  className = ''
}) => {
  const percentage = Math.min((current / target) * 100, 100);
  
  const colorClasses = {
    orange: 'bg-orange-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500'
  };

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  return (
    <div className={className}>
      {showValues && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm text-gray-600">
            {current} / {target}
          </span>
        </div>
      )}
      
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
        <div
          className={`${sizeClasses[size]} rounded-full transition-all duration-300 ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      {showPercentage && (
        <div className="text-right text-xs text-gray-500 mt-1">
          {Math.round(percentage)}% complete
        </div>
      )}
    </div>
  );
};

export default ProgressBar; 