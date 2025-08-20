import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';

interface WorkoutCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (workoutData: any) => void;
}

interface WorkoutFormData {
  exerciseName: string;
  type: "weight lifting" | "cardio" | "crossfit" | "yoga";
  duration: number;
  reps: number;
  sets: number;
  targetMuscleGroup: Array<"chest" | "back" | "legs" | "arms" | "shoulders" | "core">;
  workoutDateAndTime: Date;
  goalId?: string;
}

const WorkoutCreationModal: React.FC<WorkoutCreationModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const { isAuthenticated } = useUser();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userGoals, setUserGoals] = useState<any[]>([]);
  const [isLoadingGoals, setIsLoadingGoals] = useState(false);
  const [formData, setFormData] = useState<WorkoutFormData>({
    exerciseName: '',
    type: 'weight lifting',
    duration: 30,
    reps: 10,
    sets: 3,
    targetMuscleGroup: ['chest'],
    workoutDateAndTime: new Date(),
    goalId: ''
  });

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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const checkIfToday = (date: Date): boolean => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const renderCalendarDays = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isSelected = formatDate(date) === formatDate(selectedDate);
      const isTodayDate = checkIfToday(date);

      days.push(
        <button
          key={day}
          onClick={() => {
            setSelectedDate(date);
            setFormData(prev => ({ ...prev, workoutDateAndTime: date }));
          }}
          className={`
            h-12 w-full rounded-lg border-2 transition-all duration-200 hover:bg-orange-100
            ${isSelected 
              ? 'border-orange-500 bg-orange-100 text-orange-700' 
              : 'border-gray-200 hover:border-orange-300'
            }
            ${isTodayDate ? 'ring-2 ring-orange-300' : ''}
          `}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <span className={`text-sm font-medium ${isSelected ? 'text-orange-700' : 'text-gray-700'}`}>
              {day}
            </span>
          </div>
        </button>
      );
    }

    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set the selected date and time
    const workoutDateTime = new Date(selectedDate);
    const [hours, minutes] = formData.workoutDateAndTime.toTimeString().split(':');
    workoutDateTime.setHours(parseInt(hours), parseInt(minutes));

    const workoutData = {
      ...formData,
      workoutDateAndTime: workoutDateTime,
      goalId: formData.goalId || undefined
    };

    onSave(workoutData);
  };

  const handleClose = () => {
    // Reset state when closing
    setFormData({
      exerciseName: '',
      type: 'weight lifting',
      duration: 30,
      reps: 10,
      sets: 3,
      targetMuscleGroup: ['chest'],
      workoutDateAndTime: new Date(),
      goalId: ''
    });
    onClose();
  };

  const handleInputChange = (field: keyof WorkoutFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMuscleGroupChange = (muscleGroup: string) => {
    setFormData(prev => ({
      ...prev,
      targetMuscleGroup: prev.targetMuscleGroup.includes(muscleGroup as any)
        ? prev.targetMuscleGroup.filter(mg => mg !== muscleGroup)
        : [...prev.targetMuscleGroup, muscleGroup as any]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[100vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Create Workout Plan</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Calendar Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Date</h3>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="text-lg font-medium text-gray-700 min-w-[120px] text-center">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </span>
                  <button
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="h-8 flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-500 uppercase">{day}</span>
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {renderCalendarDays()}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-100 border-2 border-orange-300 rounded"></div>
                    <span className="text-xs text-gray-600">Selected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
                    <span className="text-xs text-gray-600">Today</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Workout Details</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exercise Name
                  </label>
                  <input
                    type="text"
                    value={formData.exerciseName}
                    onChange={(e) => handleInputChange('exerciseName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Bench Press, Running, Yoga"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Workout Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link to Goal 
                    </label>
                    <select
                      value={formData.goalId}
                      onChange={(e) => handleInputChange('goalId', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-transparent"
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
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
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
                      value={formData.reps}
                      onChange={(e) => handleInputChange('reps', parseInt(e.target.value))}
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
                      value={formData.sets}
                      onChange={(e) => handleInputChange('sets', parseInt(e.target.value))}
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
                          checked={formData.targetMuscleGroup.includes(muscle.value as any)}
                          onChange={() => handleMuscleGroupChange(muscle.value)}
                          className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                        <span className="text-sm text-gray-700">{muscle.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time
                  </label>
                  <input
                    type="time"
                    value={formData.workoutDateAndTime.toTimeString().slice(0, 5)}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(':');
                      const newDateTime = new Date(formData.workoutDateAndTime);
                      newDateTime.setHours(parseInt(hours), parseInt(minutes));
                      handleInputChange('workoutDateAndTime', newDateTime);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-orange-500 cursor-pointer text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                  >
                    Create Workout
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCreationModal;
