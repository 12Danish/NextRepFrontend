import React, { useState, useEffect } from 'react';
import { X, Dumbbell, Apple, Moon, CheckCircle, AlertCircle } from 'lucide-react';
import type { DayTrackerData } from '../../types/tracker';

interface TrackerEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  trackerData: DayTrackerData;
  onEntryAdded: () => void;
  initialTab?: 'diet' | 'workout' | 'sleep';
}

interface TrackingProgress {
  type: 'diet' | 'workout' | 'sleep';
  referenceId: string;
  weightConsumed?: number;
  completedReps?: number;
  completedTime?: number;
  isNew?: boolean; // Flag to indicate if this is a new tracker entry
}

const TrackerEntryModal: React.FC<TrackerEntryModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  trackerData,
  onEntryAdded,
  initialTab = 'diet'
}) => {
  const [activeTab, setActiveTab] = useState<'diet' | 'workout' | 'sleep'>(initialTab);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingProgress, setTrackingProgress] = useState<TrackingProgress[]>([]);
  const [error, setError] = useState<string | null>(null);

  const dateStr = selectedDate.toISOString().split('T')[0];
  const dayData = trackerData[dateStr] || [];

  const dietEntries = dayData.filter(entry => entry.type === 'diet');
  const workoutEntries = dayData.filter(entry => entry.type === 'workout');
  const sleepEntries = dayData.filter(entry => entry.type === 'sleep');

  useEffect(() => {
    if (isOpen) {
      // Set the active tab when modal opens
      setActiveTab(initialTab);
      
      // Initialize tracking progress for existing entries and prepare for new ones
      const initialProgress: TrackingProgress[] = [];
      
      dayData.forEach(entry => {
        if (entry.tracker) {
          // Existing tracker entry - load current values
          initialProgress.push({
            type: entry.type,
            referenceId: entry.data._id, // Use the original entry ID
            weightConsumed: entry.tracker.weightConsumed || undefined,
            completedReps: entry.tracker.completedReps || undefined,
            completedTime: entry.tracker.completedTime || undefined,
            isNew: false
          });
        } else {
          // New tracker entry to be created
          initialProgress.push({
            type: entry.type,
            referenceId: entry.data._id,
            weightConsumed: undefined,
            completedReps: undefined,
            completedTime: undefined,
            isNew: true
          });
        }
      });
      
      setTrackingProgress(initialProgress);
      setError(null); // Clear any previous errors
    }
  }, [isOpen, dateStr, dayData, initialTab]);

  const handleTrackingUpdate = (type: 'diet' | 'workout' | 'sleep', referenceId: string, field: string, value: number) => {
    setTrackingProgress(prev => {
      const existing = prev.find(p => p.type === type && p.referenceId === referenceId);
      if (existing) {
        return prev.map(p => 
          p.type === type && p.referenceId === referenceId 
            ? { ...p, [field]: value }
            : p
        );
      } else {
        return [...prev, { type, referenceId, [field]: value, isNew: true }];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Only process entries that have actual user input
      const entriesToProcess = trackingProgress.filter(progress => {
        if (progress.type === 'diet') {
          return progress.weightConsumed !== undefined && progress.weightConsumed > 0;
        } else if (progress.type === 'workout') {
          return (progress.completedReps !== undefined && progress.completedReps > 0) || 
                 (progress.completedTime !== undefined && progress.completedTime > 0);
        } else if (progress.type === 'sleep') {
          // Sleep is automatically tracked when user submits (if there are sleep entries)
          return true;
        }
        return false;
      });

      if (entriesToProcess.length === 0) {
        setError('Please enter some tracking data before submitting.');
        return;
      }

      // Process each entry that has user input
      for (const progress of entriesToProcess) {
        if (progress.isNew) {
          await createTrackerEntry(progress);
        } else {
          await updateTrackerEntry(progress);
        }
      }

      onEntryAdded();
      onClose();
    } catch (error) {
      console.error('Error updating tracking:', error);
      setError(error instanceof Error ? error.message : 'Failed to update tracking progress');
    } finally {
      setIsSubmitting(false);
    }
  };

  const createTrackerEntry = async (progress: TrackingProgress) => {
    const trackerData: any = {};
    
    if (progress.type === 'diet') {
      // For diet, always send weightConsumed (0 if not specified)
      trackerData.weightConsumed = progress.weightConsumed || 0;
    } else if (progress.type === 'workout') {
      // For workout, always send both fields (0 if not specified)
      trackerData.completedReps = progress.completedReps || 0;
      trackerData.completedTime = progress.completedTime || 0;
    }
    // Sleep doesn't need additional data

    const requestBody = {
      type: progress.type,
      date: selectedDate.toISOString(),
      workoutOrDietData: trackerData
    };

    console.log('Creating tracker entry:', requestBody);

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/tracker/addTracking/${progress.referenceId}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Backend error response:', errorData);
      throw new Error(errorData.message || `Failed to create ${progress.type} tracker (Status: ${response.status})`);
    }
  };

  const updateTrackerEntry = async (progress: TrackingProgress) => {
    // Find the existing tracker entry to get its ID
    const existingEntry = dayData.find(entry => 
      entry.tracker && entry.data._id === progress.referenceId
    );

    if (!existingEntry?.tracker?._id) {
      throw new Error('Tracker ID not found');
    }

    const updates: any = {};
    
    if (progress.type === 'diet' && progress.weightConsumed !== undefined) {
      updates.weightConsumed = progress.weightConsumed;
    } else if (progress.type === 'workout') {
      if (progress.completedReps !== undefined) updates.completedReps = progress.completedReps;
      if (progress.completedTime !== undefined) updates.completedTime = progress.completedTime;
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/tracker/updateTracking/${existingEntry.tracker._id}`,
      {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          updates
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Failed to update ${progress.type} tracker`);
    }
  };

  const handleClose = () => {
    setTrackingProgress([]);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Track Progress for {selectedDate.toLocaleDateString('en-US', { 
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

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-800">
                <AlertCircle size={20} />
                <span className="font-medium">Error:</span>
                <span>{error}</span>
              </div>
            </div>
          )}

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
              <span>Diet ({dietEntries.length})</span>
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
              <span>Workout ({workoutEntries.length})</span>
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
              <span>Sleep ({sleepEntries.length})</span>
            </button>
          </div>

          {/* Diet Section */}
          {activeTab === 'diet' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Track Your Meals</h3>
              
              {dietEntries.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Apple size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No meals planned for this date</p>
                  <p className="text-sm">Add meals in the Diet Plan page first</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {dietEntries.map((entry, index) => {
                    const diet = entry.data as any;
                    const progress = trackingProgress.find(p => p.type === 'diet' && p.referenceId === diet._id);
                    
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-800">{diet.foodName}</h4>
                            <p className="text-sm text-gray-600 capitalize">{diet.meal}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                              <span>Calories: {diet.calories}</span>
                              <span>Protein: {diet.protein}g</span>
                              <span>Carbs: {diet.carbs}g</span>
                              <span>Fat: {diet.fat}g</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Planned Weight</p>
                            <p className="font-medium">{diet.mealWeight || 0}g</p>
                          </div>
                        </div>
                        
                        <div className="pt-3">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Actual Weight Consumed (g)
                          </label>
                          <input
                            type="number"
                            value={progress?.weightConsumed || ''}
                            onChange={(e) => handleTrackingUpdate('diet', diet._id, 'weightConsumed', Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-transparent"
                            placeholder="Enter actual weight consumed"
                            min="0"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Workout Section */}
          {activeTab === 'workout' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Track Your Workouts</h3>
              
              {workoutEntries.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Dumbbell size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No workouts planned for this date</p>
                  <p className="text-sm">Add workouts in the Workout Plan page first</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {workoutEntries.map((entry, index) => {
                    const workout = entry.data as any;
                    const progress = trackingProgress.find(p => p.type === 'workout' && p.referenceId === workout._id);
                    
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-800">{workout.exerciseName}</h4>
                            <p className="text-sm text-gray-600 capitalize">{workout.type}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                              <span>Target: {workout.reps || 0} reps × {workout.sets || 1} sets</span>
                              <span>Duration: {workout.duration || 0} min</span>
                              <span>Muscle: {workout.targetMuscleGroup?.join(', ') || 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 pt-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Completed Reps
                            </label>
                            <input
                              type="number"
                              value={progress?.completedReps || ''}
                              onChange={(e) => handleTrackingUpdate('workout', workout._id, 'completedReps', Number(e.target.value))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-transparent"
                              placeholder="Enter completed reps"
                              min="0"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Completed Time (min)
                            </label>
                            <input
                              type="number"
                              value={progress?.completedTime || ''}
                              onChange={(e) => handleTrackingUpdate('workout', workout._id, 'completedTime', Number(e.target.value))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:outline-none focus:ring-orange-500 focus:border-transparent"
                              placeholder="Enter completed time"
                              min="0"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Sleep Section */}
          {activeTab === 'sleep' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Track Your Sleep</h3>
              
              {sleepEntries.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Moon size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No sleep entry for this date</p>
                  <p className="text-sm">Add sleep entry in the Sleep page first</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sleepEntries.map((entry, index) => {
                    const sleep = entry.data as any;
                    
                    return (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-800">Sleep Entry</h4>
                            <p className="text-sm text-gray-600">Target Duration: {sleep.duration} hours</p>
                          </div>
                          <div className="text-right">
                            {entry.tracker ? (
                              <div className="flex items-center gap-2 text-green-600">
                                <CheckCircle size={20} />
                                <span className="text-sm font-medium">Tracked</span>
                              </div>
                            ) : (
                              <div className="text-sm text-gray-500">
                                Not tracked yet
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="mt-3 text-sm text-gray-600">
                          <p>Sleep tracking will be automatically created when you submit this form.</p>
                          <p>Duration: {sleep.duration} hours</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          {dayData.length > 0 && (
            <div className="pt-6">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full cursor-pointer bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Updating Progress...' : 'Update Progress'}
              </button>
            </div>
          )}

          {dayData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No activities planned for this date</p>
              <p className="text-sm">Plan your activities first, then come back to track your progress</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackerEntryModal;
