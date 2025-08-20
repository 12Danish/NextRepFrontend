import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import { X, Dumbbell, Apple, Moon } from 'lucide-react';

interface TrackerEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  onEntryAdded: () => void;
}

interface DietFormData {
  foodName: string;
  meal: "breakfast" | "lunch" | "dinner" | "snack";
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  mealWeight: number;
  goalId?: string;
}

interface WorkoutFormData {
  exerciseName: string;
  type: "weight lifting" | "cardio" | "crossfit" | "yoga";
  duration: number;
  reps: number;
  sets: number;
  targetMuscleGroup: Array<"chest" | "back" | "legs" | "arms" | "shoulders" | "core">;
  goalId?: string;
}

interface SleepFormData {
  duration: number;
  goalId?: string;
}

const TrackerEntryModal: React.FC<TrackerEntryModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  onEntryAdded
}) => {
  const { isAuthenticated } = useUser();
  const [activeTab, setActiveTab] = useState<'diet' | 'workout' | 'sleep'>('diet');
  const [userGoals, setUserGoals] = useState<any[]>([]);
  const [isLoadingGoals, setIsLoadingGoals] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data
  const [dietForm, setDietForm] = useState<DietFormData>({
    foodName: '',
    meal: 'breakfast',
    calories: 0,
    carbs: 0,
    protein: 0,
    fat: 0,
    mealWeight: 0,
    goalId: ''
  });

  const [workoutForm, setWorkoutForm] = useState<WorkoutFormData>({
    exerciseName: '',
    type: 'weight lifting',
    duration: 30,
    reps: 10,
    sets: 3,
    targetMuscleGroup: ['chest'],
    goalId: ''
  });

  const [sleepForm, setSleepForm] = useState<SleepFormData>({
    duration: 8,
    goalId: ''
  });

  const mealTypes = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snack' }
  ];

  const workoutTypes = [
    { value: 'weight lifting', label: 'Weight Lifting' },
    { value: 'cardio', label: 'Cardio' },
    { value: 'crossfit', label: 'Crossfit' },
    { value: 'yoga', label: 'Yoga' }
  ];

  const muscleGroups = [
    { value: 'chest', label: 'Chest' },
    { value: 'back', label: 'Back' },
    { value: 'legs', label: 'Legs' },
    { value: 'arms', label: 'Arms' },
    { value: 'shoulders', label: 'Shoulders' },
    { value: 'core', label: 'Core' }
  ];

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

  const handleDietSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const dietData = {
        ...dietForm,
        mealDateAndTime: selectedDate.toISOString(),
        goalId: dietForm.goalId || undefined
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/diet`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dietData),
      });

      if (response.ok) {
        const newDiet = await response.json();
        
        // Add to tracker
        await addToTracker('diet', newDiet.data._id);
        
        onEntryAdded();
        onClose();
        resetDietForm();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to create diet entry');
      }
    } catch (error) {
      console.error('Error creating diet entry:', error);
      alert('Failed to create diet entry');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWorkoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const workoutData = {
        ...workoutForm,
        workoutDateAndTime: selectedDate.toISOString(),
        goalId: workoutForm.goalId || undefined
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/workout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workoutData),
      });

      if (response.ok) {
        const newWorkout = await response.json();
        
        // Add to tracker
        await addToTracker('workout', newWorkout.newWorkout._id);
        
        onEntryAdded();
        onClose();
        resetWorkoutForm();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to create workout entry');
      }
    } catch (error) {
      console.error('Error creating workout entry:', error);
      alert('Failed to create workout entry');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSleepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const sleepData = {
        ...sleepForm,
        date: selectedDate.toISOString(),
        goalId: sleepForm.goalId || undefined
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/sleep`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sleepData),
      });

      if (response.ok) {
        const newSleep = await response.json();
        
        // Add to tracker
        await addToTracker('sleep', newSleep.data._id);
        
        onEntryAdded();
        onClose();
        resetSleepForm();
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to create sleep entry');
      }
    } catch (error) {
      console.error('Error creating sleep entry:', error);
      alert('Failed to create sleep entry');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addToTracker = async (type: 'diet' | 'workout' | 'sleep', referenceId: string) => {
    try {
      const trackerData = {
        type,
        refId: referenceId,
        date: selectedDate.toISOString(),
        workoutOrDietData: {}
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tracker/addTracking/${referenceId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trackerData),
      });

      if (!response.ok) {
        console.error('Failed to add to tracker');
      }
    } catch (error) {
      console.error('Error adding to tracker:', error);
    }
  };

  const resetDietForm = () => {
    setDietForm({
      foodName: '',
      meal: 'breakfast',
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
      mealWeight: 0,
      goalId: ''
    });
  };

  const resetWorkoutForm = () => {
    setWorkoutForm({
      exerciseName: '',
      type: 'weight lifting',
      duration: 30,
      reps: 10,
      sets: 3,
      targetMuscleGroup: ['chest'],
      goalId: ''
    });
  };

  const resetSleepForm = () => {
    setSleepForm({
      duration: 8,
      goalId: ''
    });
  };

  const handleClose = () => {
    resetDietForm();
    resetWorkoutForm();
    resetSleepForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Add Entry for {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('diet')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === 'diet' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Apple size={16} />
              <span>Diet</span>
            </button>
            <button
              onClick={() => setActiveTab('workout')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === 'workout' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Dumbbell size={16} />
              <span>Workout</span>
            </button>
            <button
              onClick={() => setActiveTab('sleep')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === 'sleep' 
                  ? 'bg-white text-orange-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Moon size={16} />
              <span>Sleep</span>
            </button>
          </div>

          {/* Diet Form */}
          {activeTab === 'diet' && (
            <form onSubmit={handleDietSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Food Name
                  </label>
                  <input
                    type="text"
                    value={dietForm.foodName}
                    onChange={(e) => setDietForm(prev => ({ ...prev, foodName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Grilled Chicken Breast"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meal Type
                  </label>
                  <select
                    value={dietForm.meal}
                    onChange={(e) => setDietForm(prev => ({ ...prev, meal: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    {mealTypes.map(meal => (
                      <option key={meal.value} value={meal.value}>
                        {meal.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Calories
                  </label>
                  <input
                    type="number"
                    value={dietForm.calories}
                    onChange={(e) => setDietForm(prev => ({ ...prev, calories: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-transparent"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Carbs (g)
                  </label>
                  <input
                    type="number"
                    value={dietForm.carbs}
                    onChange={(e) => setDietForm(prev => ({ ...prev, carbs: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-transparent"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    value={dietForm.protein}
                    onChange={(e) => setDietForm(prev => ({ ...prev, protein: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-transparent"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fat (g)
                  </label>
                  <input
                    type="number"
                    value={dietForm.fat}
                    onChange={(e) => setDietForm(prev => ({ ...prev, fat: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-transparent"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (g)
                  </label>
                  <input
                    type="number"
                    value={dietForm.mealWeight}
                    onChange={(e) => setDietForm(prev => ({ ...prev, mealWeight: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-transparent"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link to Goal
                  </label>
                  <select
                    value={dietForm.goalId}
                    onChange={(e) => setDietForm(prev => ({ ...prev, goalId: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-transparent"
                    disabled={isLoadingGoals}
                  >
                    <option value="">No goal selected</option>
                    {userGoals.map((goal) => (
                      <option key={goal._id} value={goal._id}>
                        {goal.category} - {goal.description || 'No description'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 cursor-pointer ext-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Adding...' : 'Add Diet Entry'}
              </button>
            </form>
          )}

          {/* Workout Form */}
          {activeTab === 'workout' && (
            <form onSubmit={handleWorkoutSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exercise Name
                  </label>
                  <input
                    type="text"
                    value={workoutForm.exerciseName}
                    onChange={(e) => setWorkoutForm(prev => ({ ...prev, exerciseName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Bench Press, Running"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workout Type
                  </label>
                  <select
                    value={workoutForm.type}
                    onChange={(e) => setWorkoutForm(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-transparent"
                    required
                  >
                    {workoutTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (min)
                  </label>
                  <input
                    type="number"
                    value={workoutForm.duration}
                    onChange={(e) => setWorkoutForm(prev => ({ ...prev, duration: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-transparent"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reps
                  </label>
                  <input
                    type="number"
                    value={workoutForm.reps}
                    onChange={(e) => setWorkoutForm(prev => ({ ...prev, reps: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-transparent"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sets
                  </label>
                  <input
                    type="number"
                    value={workoutForm.sets}
                    onChange={(e) => setWorkoutForm(prev => ({ ...prev, sets: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-transparent"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Muscle Groups
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {muscleGroups.map(muscle => (
                    <label key={muscle.value} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={workoutForm.targetMuscleGroup.includes(muscle.value as any)}
                        onChange={() => {
                          setWorkoutForm(prev => ({
                            ...prev,
                            targetMuscleGroup: prev.targetMuscleGroup.includes(muscle.value as any)
                              ? prev.targetMuscleGroup.filter(mg => mg !== muscle.value)
                              : [...prev.targetMuscleGroup, muscle.value as any]
                          }));
                        }}
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="text-sm text-gray-700">{muscle.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link to Goal
                </label>
                <select
                  value={workoutForm.goalId}
                  onChange={(e) => setWorkoutForm(prev => ({ ...prev, goalId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-transparent"
                  disabled={isLoadingGoals}
                >
                  <option value="">No goal selected</option>
                  {userGoals.map((goal) => (
                    <option key={goal._id} value={goal._id}>
                      {goal.category} - {goal.description || 'No description'}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 cursor-pointer text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Adding...' : 'Add Workout Entry'}
              </button>
            </form>
          )}

          {/* Sleep Form */}
          {activeTab === 'sleep' && (
            <form onSubmit={handleSleepSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sleep Duration (hours)
                </label>
                <input
                  type="number"
                  value={sleepForm.duration}
                  onChange={(e) => setSleepForm(prev => ({ ...prev, duration: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-transparent"
                  min="0.5"
                  max="24"
                  step="0.5"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Link to Goal
                </label>
                <select
                  value={sleepForm.goalId}
                  onChange={(e) => setSleepForm(prev => ({ ...prev, goalId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-transparent"
                  disabled={isLoadingGoals}
                >
                  <option value="">No goal selected</option>
                  {userGoals.map((goal) => (
                    <option key={goal._id} value={goal._id}>
                      {goal.category} - {goal.description || 'No description'}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 cursor-pointer text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Adding...' : 'Add Sleep Entry'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackerEntryModal;
