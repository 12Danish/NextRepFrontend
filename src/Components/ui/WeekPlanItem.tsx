interface WeekPlanItemProps {
  day: string;
  meal: string;
  time: string;
}

const WeekPlanItem = ({ day, meal, time }: WeekPlanItemProps) => {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-600 mb-2">{day}</h4>
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex-1">
          <div className="font-medium text-sm text-gray-800">{meal}</div>
        </div>
        <div className="text-xs text-orange-500 font-medium">{time}</div>
      </div>
    </div>
  );
};

export default WeekPlanItem; 