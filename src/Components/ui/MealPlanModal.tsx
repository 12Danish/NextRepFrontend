import React, { useState, useEffect } from 'react';
import MealPlanCalendar from './MealPlanCalendar';
import { useUser } from '../../contexts/UserContext';

interface MealPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (meals: MealPlanItem[]) => void;
  existingMeals: { [key: string]: any[] };
}

interface MealPlanItem {
  foodName: string;
  meal: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  mealDateAndTime: Date;
  mealWeight?: number;
}

interface FoodSearchResult {
  id: number;
  title: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  image: string;
}

const MealPlanModal: React.FC<MealPlanModalProps> = ({
  isOpen,
  onClose,
  onSave,
  existingMeals
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<FoodSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMeals, setSelectedMeals] = useState<MealPlanItem[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<string>('');
  const [userGoals, setUserGoals] = useState<any[]>([]);
  const [isLoadingGoals, setIsLoadingGoals] = useState(false);
  const { isAuthenticated } = useUser();

  const mealTypes: ('breakfast' | 'lunch' | 'dinner' | 'snack')[] = ['breakfast', 'lunch', 'dinner', 'snack'];

  // Load user's goals when modal opens
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadUserGoals();
    }
  }, [isOpen, isAuthenticated]);

  const loadUserGoals = async () => {
    try {
      setIsLoadingGoals(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/goal/getGoals`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserGoals(data.goalsData.goals || []);
      }
    } catch (error) {
      console.error('Error loading goals:', error);
    } finally {
      setIsLoadingGoals(false);
    }
  };

  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      searchFoods();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const searchFoods = async () => {
    setIsSearching(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/food/search?q=${encodeURIComponent(searchQuery)}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to search foods');
      }

      const data = await response.json();
      setSearchResults(data.data);
    } catch (error) {
      console.error('Error searching foods:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const addMealToDate = (food: FoodSearchResult, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    console.log('Adding meal:', { food: food.title, mealType, selectedDate, currentSelectedMeals: selectedMeals.length });
    
    const newMeal: MealPlanItem = {
      foodName: food.title,
      meal: mealType,
      mealDateAndTime: new Date(selectedDate),
      mealWeight: 100
    };

    // Check if meal already exists for this date and meal type
    const existingMealIndex = selectedMeals.findIndex(
      meal => 
        meal.mealDateAndTime.toDateString() === selectedDate.toDateString() &&
        meal.meal === mealType
    );

    if (existingMealIndex !== -1) {
      // Replace existing meal
      const updatedMeals = [...selectedMeals];
      updatedMeals[existingMealIndex] = newMeal;
      setSelectedMeals(updatedMeals);
      console.log('Replaced existing meal, updated meals:', updatedMeals);
    } else {
      // Add new meal
      const newMeals = [...selectedMeals, newMeal];
      setSelectedMeals(newMeals);
      console.log('Added new meal, total meals:', newMeals);
    }

    setSearchQuery('');
    setSearchResults([]);
  };

  const removeMeal = (date: Date, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack') => {
    setSelectedMeals(selectedMeals.filter(
      meal => 
        !(meal.mealDateAndTime.toDateString() === date.toDateString() && meal.meal === mealType)
    ));
  };

  const getMealsForDate = (date: Date) => {
    const meals = selectedMeals.filter(
      meal => meal.mealDateAndTime.toDateString() === date.toDateString()
    );
    return meals;
  };

  const handleSave = () => {
    // Add goalId to meals if selected
    const mealsWithGoal = selectedMeals.map(meal => ({
      ...meal,
      goalId: selectedGoal || undefined
    }));
    
    onSave(mealsWithGoal);
    onClose();
  };

  const handleClose = () => {
    // Reset state when closing
    setSelectedMeals([]);
    setSelectedGoal('');
    setSearchQuery('');
    setSearchResults([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[100vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Create Meal Plan</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 cursor-pointer rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Left Side - Calendar */}
          <div className="w-1/2 p-6 border-r border-gray-200 overflow-y-auto">
            <MealPlanCalendar
              currentDate={currentDate}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              onNavigateMonth={(direction) => {
                const newDate = new Date(currentDate);
                newDate.setMonth(currentDate.getMonth() + direction);
                setCurrentDate(newDate);
              }}
              existingMeals={existingMeals}
            />
          </div>

          {/* Right Side - Meal Selection */}
          <div className="w-1/2 p-6 overflow-y-auto">
            {/* Goal Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link to Goal (Optional)
              </label>
              <select
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                disabled={isLoadingGoals}
              >
                <option value="">No goal selected</option>
                {isLoadingGoals ? (
                  <option disabled>Loading goals...</option>
                ) : userGoals.length > 0 ? (
                  userGoals.map((goal) => (
                    <option key={goal._id} value={goal._id}>
                      {goal.category} - {goal.description || 'No description'}
                    </option>
                  ))
                ) : (
                  <option disabled>No goals found</option>
                )}
              </select>
              {isLoadingGoals && (
                <div className="mt-2 text-sm text-gray-500">Loading your goals...</div>
              )}
            </div>

            {/* Food Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Foods
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for foods..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                />
                {isSearching && (
                  <div className="absolute right-3 top-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500"></div>
                  </div>
                )}
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="mt-3 max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
                  {searchResults.map((food) => (
                    <div key={food.id} className="p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">{food.title}</h4>
                          <p className="text-sm text-gray-600">
                            {food.calories} cal | P: {food.protein}g | F: {food.fat}g | C: {food.carbs}g
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          {mealTypes.map((mealType) => (
                            <button
                              key={mealType}
                              onClick={() => addMealToDate(food, mealType)}
                              className="px-3 py-1 text-xs bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition-colors"
                            >
                              {mealType}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* No Results Message */}
              {searchQuery.trim().length > 2 && searchResults.length === 0 && !isSearching && (
                <div className="mt-3 p-3 text-center text-gray-500 border border-gray-200 rounded-lg">
                  No foods found. Try a different search term.
                </div>
              )}
            </div>

            {/* Selected Meals for Current Date */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Meals for {selectedDate.toLocaleDateString()}
              </h3>
              {mealTypes.map((mealType) => {
                const meal = getMealsForDate(selectedDate).find(m => m.meal === mealType);
                return (
                  <div key={mealType} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg mb-2">
                    <span className="capitalize font-medium text-gray-700">{mealType}</span>
                    {meal ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{meal.foodName}</span>
                        <button
                          onClick={() => removeMeal(selectedDate, mealType)}
                          className="text-red-500 cursor-pointer hover:text-red-700"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">No meal planned</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                disabled={selectedMeals.length === 0}
                className="flex-1 bg-orange-500 cursor-pointer text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Save Meal Plan ({selectedMeals.length} meals)
              </button>
              <button
                onClick={handleClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanModal;
