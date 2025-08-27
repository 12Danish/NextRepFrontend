import React, { useState } from 'react';
import type { GoalCategory, WeightGoalData, DietGoalData, SleepGoalData, WorkoutGoalData } from '../../types/goals';

interface AddGoalFormProps {
  isVisible: boolean;
  onAddGoal: (goal: {
    category: GoalCategory;
    description: string;
    deadline: string;
    data: WeightGoalData | DietGoalData | SleepGoalData | WorkoutGoalData;
  }) => void;
  onCancel: () => void;
}

const AddGoalForm: React.FC<AddGoalFormProps> = ({
  isVisible,
  onAddGoal,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    category: 'workout' as GoalCategory,
    description: '',
    deadline: '',
    // Weight goal data
    goalType: 'loss' as 'gain' | 'loss' | 'maintenance',
    targetWeight: '',
    currentWeight: '',
    // Diet goal data
    targetCalories: '',
    targetProteins: '',
    targetFats: '',
    targetCarbs: '',
    // Sleep goal data
    targetHours: '',
    // Workout goal data
    type: 'weight lifting' as 'weight lifting' | 'cardio' | 'crossfit' | 'yoga',
    targetMinutes: '',
    targetReps: '',
    targetSets: '',
    exerciseName: '',
    targetMuscleGroup: ['chest'] as Array<'chest' | 'back' | 'legs' | 'arms' | 'shoulders' | 'core'>
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.deadline) return;

    let goalData: any = {
      category: formData.category,
      description: formData.description,
      deadline: formData.deadline
    };

    // Create category-specific data
    switch (formData.category) {
      case 'weight':
        if (!formData.targetWeight || !formData.currentWeight) return;
        goalData.data = {
          goalType: formData.goalType,
          targetWeight: parseFloat(formData.targetWeight),
          currentWeight: parseFloat(formData.currentWeight),
          previousWeights: []
        };
        break;
      
      case 'diet':
        if (!formData.targetCalories) return;
        goalData.data = {
          targetCalories: parseFloat(formData.targetCalories),
          targetProteins: parseFloat(formData.targetProteins) || 0,
          targetFats: parseFloat(formData.targetFats) || 0,
          targetCarbs: parseFloat(formData.targetCarbs) || 0
        };
        break;
      
      case 'sleep':
        if (!formData.targetHours) return;
        goalData.data = {
          targetHours: parseFloat(formData.targetHours)
        };
        break;
      
      case 'workout':
        if (!formData.exerciseName) return;
        goalData.data = {
          type: formData.type,
          exerciseName: formData.exerciseName,
          targetMinutes: formData.targetMinutes ? parseFloat(formData.targetMinutes) : undefined,
          targetReps: formData.targetReps ? parseFloat(formData.targetReps) : undefined,
          targetSets: formData.targetSets ? parseFloat(formData.targetSets) : undefined,
          targetMuscleGroup: formData.targetMuscleGroup
        };
        break;
    }

    onAddGoal(goalData);

    // Reset form
    setFormData({
      category: 'workout',
      description: '',
      deadline: '',
      goalType: 'loss',
      targetWeight: '',
      currentWeight: '',
      targetCalories: '',
      targetProteins: '',
      targetFats: '',
      targetCarbs: '',
      targetHours: '',
      targetMinutes: '',
      targetReps: '',
      targetSets: '',
      exerciseName: '',
      type: 'weight lifting',
      targetMuscleGroup: ['chest']
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isVisible) return null;

  const renderCategoryFields = () => {
    switch (formData.category) {
      case 'weight':
        return (
          <>
            <select
              value={formData.goalType}
              onChange={(e) => handleInputChange('goalType', e.target.value)}
              className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="loss">Weight Loss</option>
              <option value="gain">Weight Gain</option>
              <option value="maintenance">Weight Maintenance</option>
            </select>
            <input
              type="number"
              placeholder="Target weight (kgs)"
              value={formData.targetWeight}
              onChange={(e) => handleInputChange('targetWeight', e.target.value)}
              className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="number"
              placeholder="Current weight (kg)"
              value={formData.currentWeight}
              onChange={(e) => handleInputChange('currentWeight', e.target.value)}
              className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </>
        );
      
      case 'diet':
        return (
          <>
            <input
              type="number"
              placeholder="Target calories per day"
              value={formData.targetCalories}
              onChange={(e) => handleInputChange('targetCalories', e.target.value)}
              className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="number"
              placeholder="Target proteins (g)"
              value={formData.targetProteins}
              onChange={(e) => handleInputChange('targetProteins', e.target.value)}
              className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="number"
              placeholder="Target fats (g)"
              value={formData.targetFats}
              onChange={(e) => handleInputChange('targetFats', e.target.value)}
              className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="number"
              placeholder="Target carbs (g)"
              value={formData.targetCarbs}
              onChange={(e) => handleInputChange('targetCarbs', e.target.value)}
              className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </>
        );
      
      case 'sleep':
        return (
          <input
            type="number"
            placeholder="Target hours of sleep"
            value={formData.targetHours}
            onChange={(e) => handleInputChange('targetHours', e.target.value)}
            className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        );
      
      case 'workout':
        return (
          <>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="weight lifting">Weight Lifting</option>
              <option value="cardio">Cardio</option>
              <option value="crossfit">Crossfit</option>
              <option value="yoga">Yoga</option>
            </select>
            <input
              type="text"
              placeholder="Exercise name"
              value={formData.exerciseName}
              onChange={(e) => handleInputChange('exerciseName', e.target.value)}
              className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <input
              type="number"
              placeholder="Target minutes (optional)"
              value={formData.targetMinutes}
              onChange={(e) => handleInputChange('targetMinutes', e.target.value)}
              className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="number"
              placeholder="Target reps (optional)"
              value={formData.targetReps}
              onChange={(e) => handleInputChange('targetReps', e.target.value)}
              className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="number"
              placeholder="Target sets (optional)"
              value={formData.targetSets}
              onChange={(e) => handleInputChange('targetSets', e.target.value)}
              className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Muscle Groups
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['chest', 'back', 'legs', 'arms', 'shoulders', 'core'].map(muscle => (
                  <label key={muscle} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.targetMuscleGroup.includes(muscle as any)}
                      onChange={() => {
                        const newMuscleGroups = formData.targetMuscleGroup.includes(muscle as any)
                          ? formData.targetMuscleGroup.filter(mg => mg !== muscle)
                          : [...formData.targetMuscleGroup, muscle as any];
                        setFormData(prev => ({ ...prev, targetMuscleGroup: newMuscleGroups }));
                      }}
                      className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-sm text-gray-700 capitalize">{muscle}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-semibold text-gray-800 mb-4">Add New Goal</h4>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="workout">Workout</option>
            <option value="diet">Diet</option>
            <option value="sleep">Sleep</option>
            <option value="weight">Weight</option>
          </select>
          
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) => handleInputChange('deadline', e.target.value)}
            className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          
          {renderCategoryFields()}
        </div>
        
        <textarea
          placeholder="Goal description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="w-full mt-4 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          rows={3}
          required
        />
        
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="px-4 py-2 cursor-pointer bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Add Goal
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 cursor-pointer bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGoalForm; 