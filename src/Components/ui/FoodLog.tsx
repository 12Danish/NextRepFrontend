interface MealPlan {
  meals: {
    breakfast: any[];
    lunch: any[];
    dinner: any[];
    snack: any[];
  };
  totals: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface FoodLogProps {
  data: MealPlan | null;
}

export default function FoodLog({ data }: FoodLogProps) {
  if (!data) {
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Today's Meal Plan</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((index) => (
              <div key={index} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const { meals, totals } = data;

  const getMealIcon = (meal: string) => {
    const icons: { [key: string]: string } = {
      breakfast: '🍳',
      lunch: '🍽️',
      dinner: '🍴',
      snack: '🍎'
    };
    return icons[meal] || '🍽️';
  };

  const getMealColor = (meal: string) => {
    const colors: { [key: string]: string } = {
      breakfast: 'bg-yellow-100 text-yellow-600',
      lunch: 'bg-green-100 text-green-600',
      dinner: 'bg-blue-100 text-blue-600',
      snack: 'bg-purple-100 text-purple-600'
    };
    return colors[meal] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Today's Meal Plan</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-orange-600">{(totals.calories).toFixed(2)}</div>
            <div className="text-sm text-gray-500">Total Calories</div>
          </div>
        </div>

        {/* Nutrition Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold text-blue-600">{(totals.protein).toFixed(2)}g</div>
            <div className="text-xs text-gray-500">Protein</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-green-600">{(totals.carbs).toFixed(2)}g</div>
            <div className="text-xs text-gray-500">Carbs</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-orange-600">{(totals.fat).toFixed(2)}g</div>
            <div className="text-xs text-gray-500">Fat</div>
          </div>
        </div>

        {/* Meals */}
        <div className="space-y-4">
          {Object.entries(meals).map(([mealType, mealItems]) => {
            if (!mealItems || mealItems.length === 0) return null;
            
            return (
              <div key={mealType} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getMealColor(mealType)}`}>
                    <span className="text-lg">{getMealIcon(mealType)}</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 capitalize">{mealType}</h4>
                </div>
                
                <div className="space-y-2">
                  {mealItems.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.foodName}</div>
                        <div className="text-sm text-gray-500">
                          {item.mealWeight ? `${item.mealWeight}g` : 'Standard portion'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-orange-600">{item.calories} cal</div>
                        <div className="text-xs text-gray-500">
                          P: {item.protein}g | C: {item.carbs}g | F: {item.fat}g
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {Object.values(meals).every(meal => !meal || meal.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🍽️</div>
            <p>No meals planned for today</p>
            <p className="text-sm">Add some meals to your plan to see them here</p>
          </div>
        )}
      </div>
    </div>
  );
}