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
    if (isAuthenticated && user) {
      loadUserDietData();
    }
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
              className="bg-orange-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
                <FoodSchedule existingMeals={existingMeals} />
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