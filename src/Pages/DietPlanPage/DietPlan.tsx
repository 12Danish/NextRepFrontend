import { useState, useEffect } from 'react';
import DietHero from "../../Components/ui/DietHero";
import FoodSchedule from "../../Components/ui/FoodSchedule";
import DietRightSidebar from "../../Components/ui/DietRightSidebar";
import MealPlanModal from "../../Components/ui/MealPlanModal";
import { useUser } from "../../contexts/UserContext";

const DietPlan = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [existingMeals, setExistingMeals] = useState<{ [key: string]: any[] }>({});
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useUser();

  // Load user's existing diet data
  useEffect(() => {

    console.log("UseEffect Being run for data")
    loadUserDietData();

  }, [isAuthenticated, user]);

  const loadUserDietData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/diet/getDiet?viewType=month&offset=0`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Group meals by date for the calendar
        const mealsByDate: { [key: string]: any[] } = {};
        data.data.diets.forEach((meal: any) => {
          const dateKey = new Date(meal.mealDateAndTime).toISOString().split('T')[0];
          if (!mealsByDate[dateKey]) {
            mealsByDate[dateKey] = [];
          }
          mealsByDate[dateKey].push(meal);
        });
        setExistingMeals(mealsByDate);
      }
    } catch (error) {
      console.error('Error loading diet data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate combined nutrition stats for a specific date
  const getCombinedNutritionForDate = (date: string) => {
    const meals = existingMeals[date] || [];
    return meals.reduce((acc, meal) => ({
      calories: acc.calories + (meal.calories || 0),
      carbs: acc.carbs + (meal.carbs || 0),
      protein: acc.protein + (meal.protein || 0),
      fat: acc.fat + (meal.fat || 0)
    }), { calories: 0, carbs: 0, protein: 0, fat: 0 });
  };

  const handleAddPlan = () => {
    setIsModalOpen(true);
  };

  const handleSaveMealPlan = async (meals: any[]) => {
    try {
      // Make API call to backend
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/diet/bulk-meal-plan`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ meals })
      });

      if (!response.ok) {
        throw new Error('Failed to save meal plan');
      }

      const result = await response.json();
      console.log('Meal plan saved:', result);

      // Reload user's diet data to show new meals
      await loadUserDietData();

    } catch (error) {
      console.error('Error saving meal plan:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-orange-50 py-6 ">
      {/* Main Content Area */}
      <div className="flex-[10]">
        <div className="p-4 lg:p-6 space-y-6 min-h-full">
          <DietHero />

          {/* Add Plan Button */}
          <div className="flex justify-center">
            <button
              onClick={handleAddPlan}
              className="bg-orange-500 cursor-pointer text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
            >
              + Add Meal Plan
            </button>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <>
              {Object.keys(existingMeals).length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg mb-4">No meals planned yet</div>
                  <div className="text-gray-400">Click "Add Meal Plan" to get started!</div>
                </div>
              ) : (
                <>
                  {/* Enhanced Nutrition Summary */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-gray-800">Monthly Nutrition Overview</h3>
                      <div className="text-sm text-gray-500">
                        {Object.keys(existingMeals).length} days with meals planned
                      </div>
                    </div>
                    
                    {/* Overall Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      {(() => {
                        const allDates = Object.keys(existingMeals);
                        const totalNutrition = allDates.reduce((acc, date) => {
                          const nutrition = getCombinedNutritionForDate(date);
                          return {
                            calories: acc.calories + nutrition.calories,
                            protein: acc.protein + nutrition.protein,
                            carbs: acc.carbs + nutrition.carbs,
                            fat: acc.fat + nutrition.fat
                          };
                        }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
                        
                        const avgDays = allDates.length || 1;
                        return [
                          { label: 'Avg Calories', value: Math.round(totalNutrition.calories / avgDays), unit: 'cal', color: 'bg-orange-100 text-orange-700' },
                          { label: 'Avg Protein', value: (totalNutrition.protein / avgDays).toFixed(1), unit: 'g', color: 'bg-blue-100 text-blue-700' },
                          { label: 'Avg Carbs', value: (totalNutrition.carbs / avgDays).toFixed(1), unit: 'g', color: 'bg-green-100 text-green-700' },
                          { label: 'Avg Fat', value: (totalNutrition.fat / avgDays).toFixed(1), unit: 'g', color: 'bg-purple-100 text-purple-700' }
                        ];
                      })().map((stat, index) => (
                        <div key={index} className={`${stat.color} rounded-xl p-4 text-center`}>
                          <div className="text-2xl font-bold mb-1">{stat.value}</div>
                          <div className="text-sm font-medium">{stat.label}</div>
                          <div className="text-xs opacity-75">{stat.unit}</div>
                        </div>
                      ))}
                    </div>

                    {/* Recent Days */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-700 mb-4">Recent Days</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.keys(existingMeals).slice(0, 6).map((date) => {
                          const nutrition = getCombinedNutritionForDate(date);
                          const mealCount = existingMeals[date].length;
                          return (
                            <div key={date} className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:border-orange-200 transition-colors">
                              <div className="flex items-center justify-between mb-3">
                                <div className="text-sm font-medium text-gray-700">
                                  {new Date(date).toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </div>
                                <div className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                                  {mealCount} meal{mealCount !== 1 ? 's' : ''}
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-500">Calories</span>
                                  <span className="text-sm font-semibold text-gray-800">{nutrition.calories.toFixed(0)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-500">Protein</span>
                                  <span className="text-sm font-semibold text-gray-800">{nutrition.protein.toFixed(1)}g</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-500">Carbs</span>
                                  <span className="text-sm font-semibold text-gray-800">{nutrition.carbs.toFixed(1)}g</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-gray-500">Fat</span>
                                  <span className="text-sm font-semibold text-gray-800">{nutrition.fat.toFixed(1)}g</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <FoodSchedule existingMeals={existingMeals} />
                </>
              )}
            </>
          )}
        </div>
      </div>
      <DietRightSidebar existingMeals={existingMeals} />

      {/* Meal Plan Modal */}
      <MealPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveMealPlan}
        existingMeals={existingMeals}
      />
    </div>
  );
};

export default DietPlan;