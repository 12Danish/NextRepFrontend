import React, { useState } from 'react';
import { Plus, Target, Calendar, Clock, CheckCircle, Circle, Trash2, Edit3, TrendingUp, Award, Dumbbell, Apple, Moon, Scale } from 'lucide-react';

// Type definitions
interface Goal {
  id: string;
  title: string;
  category: 'workout' | 'diet' | 'sleep' | 'weight' | 'other';
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  completed: boolean;
  createdAt: string;
}

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

const Goals: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | GoalCategory>('all');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [editingGoal, setEditingGoal] = useState<string | null>(null);

  // Sample goals data
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Lose 10 pounds',
      category: 'weight',
      description: 'Reach target weight of 150 lbs',
      targetValue: 10,
      currentValue: 6,
      unit: 'lbs',
      deadline: '2024-08-15',
      completed: false,
      createdAt: '2024-06-01'
    },
    {
      id: '2',
      title: 'Complete 20 workouts',
      category: 'workout',
      description: 'Maintain consistent exercise routine',
      targetValue: 20,
      currentValue: 15,
      unit: 'sessions',
      deadline: '2024-07-30',
      completed: false,
      createdAt: '2024-06-10'
    },
    {
      id: '3',
      title: 'Drink 8 glasses of water daily',
      category: 'diet',
      description: 'Stay hydrated throughout the day',
      targetValue: 30,
      currentValue: 30,
      unit: 'days',
      deadline: '2024-06-30',
      completed: true,
      createdAt: '2024-06-01'
    },
    {
      id: '4',
      title: 'Sleep 8 hours daily',
      category: 'sleep',
      description: 'Maintain healthy sleep schedule',
      targetValue: 8,
      currentValue: 6.5,
      unit: 'hours avg',
      deadline: '2024-07-15',
      completed: false,
      createdAt: '2024-06-05'
    }
  ]);

  const [newGoal, setNewGoal] = useState<NewGoalForm>({
    title: '',
    category: 'workout',
    description: '',
    targetValue: '',
    currentValue: '',
    unit: '',
    deadline: ''
  });

  const categoryIcons = {
    workout: <Dumbbell size={20} className="text-orange-500" />,
    diet: <Apple size={20} className="text-cyan-500" />,
    sleep: <Moon size={20} className="text-purple-500" />,
    weight: <Scale size={20} className="text-green-500" />,
    other: <Target size={20} className="text-gray-500" />
  };

  const categoryColors = {
    workout: 'bg-orange-50 border-orange-200 text-orange-700',
    diet: 'bg-cyan-50 border-cyan-200 text-cyan-700',
    sleep: 'bg-purple-50 border-purple-200 text-purple-700',
    weight: 'bg-green-50 border-green-200 text-green-700',
    other: 'bg-gray-50 border-gray-200 text-gray-700'
  };

  const getProgressPercentage = (current: number, target: number): number => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysUntilDeadline = (deadline: string): number => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const filteredGoals = activeTab === 'all' ? goals : goals.filter(goal => goal.category === activeTab);

  const completedGoals = goals.filter(goal => goal.completed).length;
  const totalGoals = goals.length;
  const overallProgress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  const handleAddGoal = (): void => {
    if (!newGoal.title || !newGoal.targetValue || !newGoal.deadline) return;

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      category: newGoal.category,
      description: newGoal.description,
      targetValue: parseFloat(newGoal.targetValue),
      currentValue: parseFloat(newGoal.currentValue) || 0,
      unit: newGoal.unit,
      deadline: newGoal.deadline,
      completed: false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setGoals([...goals, goal]);
    setNewGoal({
      title: '',
      category: 'workout',
      description: '',
      targetValue: '',
      currentValue: '',
      unit: '',
      deadline: ''
    });
    setShowAddForm(false);
  };

  const updateGoalProgress = (goalId: string, newValue: number): void => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const completed = newValue >= goal.targetValue;
        return { ...goal, currentValue: newValue, completed };
      }
      return goal;
    }));
  };

  const deleteGoal = (goalId: string): void => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const toggleGoalCompletion = (goalId: string): void => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        return { ...goal, completed: !goal.completed };
      }
      return goal;
    }));
  };

  return (
    <div className="flex w-full min-h-screen py-6">
      {/* Main Content Area */}
      <div className="flex-[10] p-4 lg:p-6">
        <div className="space-y-6">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <div className="flex-1 mb-4 lg:mb-0">
                <h1 className="text-2xl lg:text-4xl font-bold mb-3">Goals & Progress</h1>
                <p className="text-orange-100 max-w-md text-sm lg:text-base">
                  Set meaningful goals, track your progress, and celebrate achievements. Stay motivated on your fitness journey.
                </p>
              </div>
              <div className="w-full lg:w-48 h-32 lg:h-40 bg-orange-600 bg-opacity-30 rounded-xl flex items-center justify-center">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 w-48 h-full bg-orange-600 opacity-30 rounded-l-full transform translate-x-24"></div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Target size={20} className="text-orange-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{totalGoals}</div>
                  <div className="text-sm text-gray-600">Total Goals</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle size={20} className="text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{completedGoals}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                  <TrendingUp size={20} className="text-cyan-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{Math.round(overallProgress)}%</div>
                  <div className="text-sm text-gray-600">Overall Progress</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Award size={20} className="text-purple-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{goals.filter(g => !g.completed).length}</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
              </div>
            </div>
          </div>

          {/* Goals Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-4 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === 'all'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  All Goals
                </button>
                <button
                  onClick={() => setActiveTab('workout')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === 'workout'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  <Dumbbell size={16} className="inline mr-2" />
                  Workout
                </button>
                <button
                  onClick={() => setActiveTab('diet')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === 'diet'
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  <Apple size={16} className="inline mr-2" />
                  Diet
                </button>
                <button
                  onClick={() => setActiveTab('sleep')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === 'sleep'
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  <Moon size={16} className="inline mr-2" />
                  Sleep
                </button>
                <button
                  onClick={() => setActiveTab('weight')}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${activeTab === 'weight'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                >
                  <Scale size={16} className="inline mr-2" />
                  Weight
                </button>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <Plus size={16} />
                Add Goal
              </button>
            </div>

            {/* Add Goal Form */}
            {showAddForm && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-4">Add New Goal</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Goal title"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as GoalCategory })}
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
                    value={newGoal.targetValue}
                    onChange={(e) => setNewGoal({ ...newGoal, targetValue: e.target.value })}
                    className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="number"
                    placeholder="Current value"
                    value={newGoal.currentValue}
                    onChange={(e) => setNewGoal({ ...newGoal, currentValue: e.target.value })}
                    className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="text"
                    placeholder="Unit (e.g., lbs, sessions, hours)"
                    value={newGoal.unit}
                    onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                    className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <textarea
                  placeholder="Goal description (optional)"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  className="w-full mt-4 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={3}
                />
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={handleAddGoal}
                    className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Add Goal
                  </button>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Goals List */}
            <div className="space-y-4">
              {filteredGoals.length > 0 ? (
                filteredGoals.map((goal: Goal) => {
                  const progress = getProgressPercentage(goal.currentValue, goal.targetValue);
                  const daysLeft = getDaysUntilDeadline(goal.deadline);

                  return (
                    <div key={goal.id} className="p-5 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleGoalCompletion(goal.id)}
                            className="mt-1"
                          >
                            {goal.completed ? (
                              <CheckCircle size={20} className="text-green-500" />
                            ) : (
                              <Circle size={20} className="text-gray-400 hover:text-gray-600" />
                            )}
                          </button>
                          <div className="flex-1">
                            <h5 className={`font-semibold ${goal.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                              {goal.title}
                            </h5>
                            {goal.description && (
                              <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${categoryColors[goal.category]}`}>
                            {categoryIcons[goal.category]}
                            <span className="ml-1 capitalize">{goal.category}</span>
                          </span>
                          <button
                            onClick={() => deleteGoal(goal.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Progress</span>
                            <span className="text-sm text-gray-600">
                              {goal.currentValue} / {goal.targetValue} {goal.unit}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${goal.completed ? 'bg-green-500' : 'bg-orange-500'
                                }`}
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <div className="text-right text-xs text-gray-500 mt-1">
                            {Math.round(progress)}% complete
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar size={16} />
                          <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className={`text-sm font-medium ${daysLeft < 0 ? 'text-red-600' : daysLeft <= 7 ? 'text-yellow-600' : 'text-gray-600'
                            }`}>
                            {daysLeft < 0 ? `${Math.abs(daysLeft)} days overdue` :
                              daysLeft === 0 ? 'Due today' :
                                `${daysLeft} days left`}
                          </div>
                          <input
                            type="number"
                            value={goal.currentValue}
                            onChange={(e) => updateGoalProgress(goal.id, parseFloat(e.target.value) || 0)}
                            className="w-20 p-1 text-sm border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Target size={48} className="mx-auto mb-3 text-gray-300" />
                  <p>No goals found for this category</p>
                  <p className="text-sm">Create your first goal to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block flex-[3] bg-white border-l border-gray-200 p-6 h-full">
        <div className="space-y-6">
          {/* Quick Stats */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Goal Categories</h3>
            <div className="space-y-3">
              {Object.entries(categoryIcons).map(([category, icon]) => {
                const categoryGoals = goals.filter(g => g.category === category);
                const completed = categoryGoals.filter(g => g.completed).length;
                const total = categoryGoals.length;

                return (
                  <div key={category} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {icon}
                        <span className="text-sm font-medium capitalize">{category}</span>
                      </div>
                      <span className="text-sm font-bold">{completed}/{total}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Upcoming Deadlines</h3>
            <div className="space-y-2">
              {goals
                .filter(g => !g.completed)
                .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
                .slice(0, 5)
                .map((goal) => {
                  const daysLeft = getDaysUntilDeadline(goal.deadline);
                  return (
                    <div key={goal.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium text-sm text-gray-800 mb-1">{goal.title}</div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          {new Date(goal.deadline).toLocaleDateString()}
                        </div>
                        <div className={`text-xs font-medium ${daysLeft <= 7 ? 'text-red-600' : 'text-gray-600'
                          }`}>
                          {daysLeft} days
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Achievement Badge */}
          <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-4 text-white">
            <div className="mb-3">
              <div className="text-sm font-medium mb-1">Achievement Level</div>
              <div className="text-xs text-orange-100 mb-4">
                Keep up the great work!
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Goals Completed</span>
                <span className="font-bold">{completedGoals}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Success Rate</span>
                <span className="font-bold">{Math.round(overallProgress)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;