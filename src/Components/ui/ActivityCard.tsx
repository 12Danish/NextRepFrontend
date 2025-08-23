interface ActivityCardProps {
  title: string;
  value: number;
  subtitle: string;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  unit?: string;
}

const ActivityCard = ({ title, value, subtitle, icon, gradientFrom, gradientTo, unit }: ActivityCardProps) => {
  const getGradientClass = (from: string, to: string) => {
    const gradients: { [key: string]: string } = {
      'cyan-400-cyan-500': 'bg-gradient-to-br from-cyan-400 to-cyan-500',
      'orange-400-orange-500': 'bg-gradient-to-br from-orange-400 to-orange-500',
      'purple-400-purple-500': 'bg-gradient-to-br from-purple-400 to-purple-500'
    };
    return gradients[`${from}-${to}`] || 'bg-gradient-to-br from-gray-400 to-gray-500';
  };

  const getSubtitleColor = (from: string) => {
    const colors: { [key: string]: string } = {
      'cyan-400': 'text-cyan-100',
      'orange-400': 'text-orange-100',
      'purple-400': 'text-purple-100'
    };
    return colors[from] || 'text-gray-100';
  };

  const formatValue = (val: number, unit?: string) => {
    if (unit === 'hrs') {
      return val.toFixed(1);
    }
    return val.toLocaleString();
  };

  return (
    <div className={`${getGradientClass(gradientFrom, gradientTo)} rounded-xl p-6 text-white`}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl font-bold">{icon}</div>
        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded"></div>
        </div>
      </div>
      <div>
        <div className="font-semibold text-lg">{title}</div>
        <div className="text-2xl font-bold mb-1">
          {formatValue(value, unit)}{unit}
        </div>
        <div className={`${getSubtitleColor(gradientFrom)} text-sm`}>{subtitle}</div>
      </div>
    </div>
  );
};

export default ActivityCard; 