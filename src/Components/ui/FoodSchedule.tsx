import FoodItem from './FoodItem';

interface FoodScheduleProps {
  existingMeals: { [key: string]: any[] };
}

export default function FoodSchedule({ existingMeals }: FoodScheduleProps) {
  // Convert the meals data structure to a flat array for display
  const allMeals = Object.values(existingMeals).flat();
  
  // Sort meals by date and time
  const sortedMeals = allMeals.sort((a, b) => 
    new Date(a.mealDateAndTime).getTime() - new Date(b.mealDateAndTime).getTime()
  );

  // Helper function to get meal icon
  const getMealIcon = (mealType: string) => {
    switch (mealType.toLowerCase()) {
      case 'breakfast': return '🍳';
      case 'lunch': return '🍽️';
      case 'dinner': return '🌙';
      case 'snack': return '🍎';
      default: return '🍴';
    }
  };

  // Helper function to get background color
  const getBgColor = (mealType: string) => {
    switch (mealType.toLowerCase()) {
      case 'breakfast': return 'bg-yellow-100';
      case 'lunch': return 'bg-orange-100';
      case 'dinner': return 'bg-blue-100';
      case 'snack': return 'bg-green-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-2 font-medium text-gray-600">Food</th>
              <th className="text-left py-4 px-2 font-medium text-gray-600">Meal</th>
              <th className="text-left py-4 px-2 font-medium text-gray-600">Calories</th>
              <th className="text-left py-4 px-2 font-medium text-gray-600">Protein</th>
              <th className="text-left py-4 px-2 font-medium text-gray-600">Carbs</th>
              <th className="text-left py-4 px-2 font-medium text-gray-600">Fat</th>
            </tr>
          </thead>
          <tbody>
            {sortedMeals.length > 0 ? (
              sortedMeals.map((meal, index) => (
                <FoodItem
                  key={meal._id || index}
                  icon={getMealIcon(meal.meal)}
                  food={meal.foodName}
                  meal={meal.meal}
                  calories={`${meal.calories || 0} cal`}
                  protein={`${meal.protein || 0}g`}
                  carbs={`${meal.carbs || 0}g`}
                  fat={`${meal.fat || 0}g`}
                  bgColor={getBgColor(meal.meal)}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  No meals planned yet. Click "Add Meal Plan" to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}