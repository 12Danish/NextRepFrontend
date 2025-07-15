import React, { useState } from 'react';

type GoalCategory = 'workout' | 'diet' | 'sleep' | 'weight' | 'other';

interface NewGoalForm {
  title: string;
  category: GoalCategory;
  description: string;
  targetValue: string;
  currentValue: string;
  unit: string;
  deadline: string;
}

interface AddGoalFormProps {
  isVisible: boolean;
  onAddGoal: (goal: Omit<NewGoalForm, 'title' | 'category' | 'description' | 'targetValue' | 'currentValue' | 'unit' | 'deadline'> & {
    title: string;
    category: GoalCategory;
    description: string;
    targetValue: number;
    currentValue: number;
    unit: string;
    deadline: string;
  }) => void;
  onCancel: () => void;
}

const AddGoalForm: React.FC<AddGoalFormProps> = ({
  isVisible,
  onAddGoal,
  onCancel
}) => {
  const [formData, setFormData] = useState<NewGoalForm>({
    title: '',
    category: 'workout',
    description: '',
    targetValue: '',
    currentValue: '',
    unit: '',
    deadline: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.targetValue || !formData.deadline) return;

    onAddGoal({
      title: formData.title,
      category: formData.category,
      description: formData.description,
      targetValue: parseFloat(formData.targetValue),
      currentValue: parseFloat(formData.currentValue) || 0,
      unit: formData.unit,
      deadline: formData.deadline
    });

    // Reset form
    setFormData({
      title: '',
      category: 'workout',
      description: '',
      targetValue: '',
      currentValue: '',
      unit: '',
      deadline: ''
    });
  };

  const handleInputChange = (field: keyof NewGoalForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isVisible) return null;

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-semibold text-gray-800 mb-4">Add New Goal</h4>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Goal title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value as GoalCategory)}
            className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="workout">Workout</option>
            <option value="diet">Diet</option>
            <option value="sleep">Sleep</option>
            <option value="weight">Weight</option>
            <option value="other">Other</option>
          </select>
          <input
            type="number"
            placeholder="Target value"
            value={formData.targetValue}
            onChange={(e) => handleInputChange('targetValue', e.target.value)}
            className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <input
            type="number"
            placeholder="Current value"
            value={formData.currentValue}
            onChange={(e) => handleInputChange('currentValue', e.target.value)}
            className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="Unit (e.g., lbs, sessions, hours)"
            value={formData.unit}
            onChange={(e) => handleInputChange('unit', e.target.value)}
            className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) => handleInputChange('deadline', e.target.value)}
            className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <textarea
          placeholder="Goal description (optional)"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="w-full mt-4 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          rows={3}
        />
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Add Goal
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGoalForm; 