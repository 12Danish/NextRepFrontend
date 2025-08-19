import React, { useState, useEffect } from 'react';

interface DietNutritionSummaryProps {
  existingMeals: { [key: string]: any[] };
}

const DietNutritionSummary: React.FC<DietNutritionSummaryProps> = ({ existingMeals }) => {
  const [weeklyNutrition, setWeeklyNutrition] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0
  });

  useEffect(() => {
    calculateWeeklyNutrition();
  }, [existingMeals]);

  const calculateWeeklyNutrition = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    
    let totalCalories = 0;
    let totalProtein = 0;
    let totalFat = 0;
    let totalCarbs = 0;

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      const dateKey = currentDate.toISOString().split('T')[0];
      
      const dayMeals = existingMeals[dateKey] || [];
      dayMeals.forEach((meal: any) => {
        totalCalories += meal.calories || 0;
        totalProtein += meal.protein || 0;
        totalFat += meal.fat || 0;
        totalCarbs += meal.carbs || 0;
      });
    }

    setWeeklyNutrition({
      calories: Math.round(totalCalories),
      protein: Math.round(totalProtein),
      fat: Math.round(totalFat),
      carbs: Math.round(totalCarbs)
    });
  };

  const getNutritionColor = (type: string, value: number) => {
    const thresholds: { [key: string]: { low: number; high: number } } = {
      calories: { low: 1400, high: 2000 },
      protein: { low: 50, high: 100 },
      fat: { low: 44, high: 78 },
      carbs: { low: 130, high: 325 }
    };

    const threshold = thresholds[type];
    if (!threshold) return 'text-gray-600';

    if (value < threshold.low) return 'text-red-500';
    if (value > threshold.high) return 'text-orange-500';
    return 'text-green-500';
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Weekly Nutrition Summary</h3>
      
      {Object.keys(existingMeals).length === 0 ? (
        <div className="text-center py-4">
          <div className="text-gray-500 text-sm">No meals planned yet</div>
          <div className="text-gray-400 text-xs">Plan meals to see nutrition data</div>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Calories</span>
            <span className={`font-semibold ${getNutritionColor('calories', weeklyNutrition.calories)}`}>
              {weeklyNutrition.calories} kcal
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Protein</span>
            <span className={`font-semibold ${getNutritionColor('protein', weeklyNutrition.protein)}`}>
              {weeklyNutrition.protein}g
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Fat</span>
            <span className={`font-semibold ${getNutritionColor('fat', weeklyNutrition.fat)}`}>
              {weeklyNutrition.fat}g
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Carbs</span>
            <span className={`font-semibold ${getNutritionColor('carbs', weeklyNutrition.carbs)}`}>
              {weeklyNutrition.carbs}g
            </span>
          </div>
        </div>
      )}
      
      <div className="mt-4 pt-4 border-t border-orange-200">
        <div className="text-xs text-gray-500">
          💡 Colors indicate if values are within recommended daily ranges
        </div>
      </div>
    </div>
  );
};

export default DietNutritionSummary;
