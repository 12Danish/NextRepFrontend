interface ActivityCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
}

const ActivityCard = ({ title, value, subtitle, icon, gradientFrom, gradientTo }: ActivityCardProps) => {
  return (
    <div className={`bg-gradient-to-br from-${gradientFrom} to-${gradientTo} rounded-xl p-6 text-white`}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl font-bold">{icon}</div>
        <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded"></div>
        </div>
      </div>
      <div>
        <div className="font-semibold text-lg">{title}</div>
        <div className={`text-${gradientFrom.split('-')[1]}-100 text-sm`}>{subtitle}</div>
      </div>
    </div>
  );
};

export default ActivityCard; 