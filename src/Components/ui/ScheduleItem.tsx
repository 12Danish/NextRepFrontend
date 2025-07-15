interface ScheduleItemProps {
  icon: string;
  title: string;
  time: string;
  duration: string;
  iconBgColor: string;
  iconTextColor: string;
  durationColor: string;
}

const ScheduleItem = ({ 
  icon, 
  title, 
  time, 
  duration, 
  iconBgColor, 
  iconTextColor, 
  durationColor 
}: ScheduleItemProps) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
      <div className={`w-8 h-8 ${iconBgColor} rounded-full flex items-center justify-center`}>
        <span className={`${iconTextColor} text-xs`}>{icon}</span>
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm">{title}</div>
        <div className="text-xs text-gray-500">At {time}</div>
      </div>
      <div className={`text-xs ${durationColor} font-medium`}>{duration}</div>
    </div>
  );
};

export default ScheduleItem; 