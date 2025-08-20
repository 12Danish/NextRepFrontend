import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import TrackerHero from '../../Components/ui/TrackerHero';
import TrackerCalendar from '../../Components/ui/TrackerCalendar';
import TrackerSidebar from '../../Components/ui/TrackerSidebar';
import TrackerEntryModal from '../../Components/ui/TrackerEntryModal';
import type { DayTrackerData} from '../../types/tracker';

const Tracker: React.FC = () => {
  const { isAuthenticated } = useUser();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trackerData, setTrackerData] = useState<DayTrackerData>({});
  const [isLoading, setIsLoading] = useState(false);

  // Fetch tracker data for the current month
  const fetchTrackerData = async (date: Date) => {
    if (!isAuthenticated) return;
    
    try {
      setIsLoading(true);
      
      // Get the start and end of the month for the given date
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      
      // Fetch all entries for the entire month
      const [dietResponse, workoutResponse, sleepResponse] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/diet/getDiet?viewType=month&offset=0`, {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }),
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/workout/getSchedule?viewType=month&offset=0`, {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }),
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/sleep/getSleep?viewType=month&offset=0`, {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        })
      ]);

      const groupedData: DayTrackerData = {};
      
      // Process diet entries for the month
      if (dietResponse.ok) {
        const dietData = await dietResponse.json();
        if (dietData.data && dietData.data.length > 0) {
          dietData.data.forEach((diet: any) => {
            const entryDate = new Date(diet.mealDateAndTime);
            const dateStr = entryDate.toISOString().split('T')[0];
            
            if (!groupedData[dateStr]) groupedData[dateStr] = [];
            groupedData[dateStr].push({
              type: 'diet' as const,
              data: diet,
              tracker: undefined
            });
          });
        }
      }

      // Process workout entries for the month
      if (workoutResponse.ok) {
        const workoutData = await workoutResponse.json();
        if (workoutData.workouts && workoutData.workouts.length > 0) {
          workoutData.workouts.forEach((workout: any) => {
            const entryDate = new Date(workout.workoutDateAndTime);
            const dateStr = entryDate.toISOString().split('T')[0];
            
            if (!groupedData[dateStr]) groupedData[dateStr] = [];
            groupedData[dateStr].push({
              type: 'workout' as const,
              data: workout,
              tracker: undefined
            });
          });
        }
      }

      // Process sleep entries for the month
      if (sleepResponse.ok) {
        const sleepData = await sleepResponse.json();
        
        if (sleepData.data && sleepData.data.sleepEntries && sleepData.data.sleepEntries.length > 0) {
          sleepData.data.sleepEntries.forEach((sleep: any) => {
            const entryDate = new Date(sleep.date);
            const dateStr = entryDate.toISOString().split('T')[0];
            
            if (!groupedData[dateStr]) groupedData[dateStr] = [];
            groupedData[dateStr].push({
              type: 'sleep' as const,
              data: sleep,
              tracker: undefined
            });
          });
        }
      }

      // Now fetch tracker entries for the month to see progress
      try {
        const trackerResponse = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/tracker/getTracked?date=${startOfMonth.toISOString()}`,
          {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          }
        );

        if (trackerResponse.ok) {
          const trackers = await trackerResponse.json();
          if (trackers.trackedData && trackers.trackedData.length > 0) {
            // Merge tracker data with existing entries
            trackers.trackedData.forEach((tracker: any) => {
              const trackerDate = new Date(tracker.date);
              const trackerDateStr = trackerDate.toISOString().split('T')[0];
              
              if (groupedData[trackerDateStr]) {
                const entry = groupedData[trackerDateStr].find(e => 
                  e.data._id === tracker.referenceId
                );
                if (entry) {
                  entry.tracker = tracker;
                }
              }
            });
          }
        }
      } catch (error) {
        console.error('Error fetching tracker data:', error);
      }
      
      setTrackerData(groupedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when month changes or component mounts
  useEffect(() => {
    if (isAuthenticated) {
      fetchTrackerData(currentDate);
    }
  }, [currentDate, isAuthenticated]);

  const navigateMonth = (direction: number): void => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleEntryAdded = () => {
    // Refresh data after adding an entry
    fetchTrackerData(currentDate);
  };

  const handleAddEntry = () => {
    setSelectedDate(new Date());
    setIsModalOpen(true);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex w-full min-h-screen py-6 bg-orange-50 items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please sign in to view your tracker</h2>
          <p className="text-gray-600">You need to be authenticated to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-screen py-6 bg-orange-50">
      {/* Main Content Area */}
      <div className="flex-[10] p-4 lg:p-6">
        <div className="space-y-6">
          <TrackerHero />

          {/* Calendar Section */}
          <TrackerCalendar
            currentDate={currentDate}
            selectedDate={selectedDate}
            trackerData={trackerData}
            onNavigateMonth={navigateMonth}
            onDateClick={handleDateClick}
          />
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block flex-[3] bg-white border-l border-gray-200 p-6 h-full">
        <TrackerSidebar 
          trackerData={trackerData}
          onAddEntry={handleAddEntry}
        />
      </div>

      {/* Tracker Entry Modal */}
      <TrackerEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        trackerData={trackerData}
        onEntryAdded={handleEntryAdded}
      />
    </div>
  );
};

export default Tracker;