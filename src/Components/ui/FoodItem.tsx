interface FoodItemProps {
  icon: string;
  food: string;
  meal: string;
  calories: string;
  time: string;
  carbs: string;
  bgColor: string;
}

const FoodItem = ({ icon, food, meal, calories, time, carbs, bgColor }: FoodItemProps) => {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="py-4 px-2">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${bgColor}`}>
            <span className="text-lg">{icon}</span>
          </div>
          <span className="font-medium text-gray-800">{food}</span>
        </div>
      </td>
      <td className="py-4 px-2 text-gray-600">{meal}</td>
      <td className="py-4 px-2">
        <span className="text-green-600 font-medium">{calories}</span>
      </td>
      <td className="py-4 px-2 text-gray-600">{time}</td>
      <td className="py-4 px-2 text-gray-600">{carbs}</td>
    </tr>
  );
};

export default FoodItem; 