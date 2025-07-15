interface GoalItemProps {
  title: string;
  rounds: string;
  date: string;
  time: string;
}

const GoalItem = ({ title, rounds, date, time }: GoalItemProps) => {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-sm">{title}</span>
        <span className="text-xs text-orange-500 font-medium">{rounds}</span>
      </div>
      <div className="text-xs text-gray-500">{date} | {time}</div>
    </div>
  );
};

export default GoalItem; 