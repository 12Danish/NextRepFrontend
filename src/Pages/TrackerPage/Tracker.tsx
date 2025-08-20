import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import TrackerHero from '../../Components/ui/TrackerHero';
import TrackerCalendar from '../../Components/ui/TrackerCalendar';
import TrackerSidebar from '../../Components/ui/TrackerSidebar';
import TrackerEntryModal from '../../Components/ui/TrackerEntryModal';
import type { DayTrackerData, ITracker, IDiet, IWorkout, ISleep } from '../../types/tracker';

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
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      
      // Fetch tracker entries for the month
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/tracker/getTracked?date=${startOfMonth.toISOString()}`,
        {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const trackers: ITracker[] = await response.json();
        
        // Group trackers by date and fetch associated data
        const groupedData: DayTrackerData = {};
        
        for (const tracker of trackers) {
          const dateStr = new Date(tracker.date).toISOString().split('T')[0];
          
          if (!groupedData[dateStr]) {
            groupedData[dateStr] = [];
          }
          
          // Fetch the actual entry data based on type
          try {
            let entryData: IDiet | IWorkout | ISleep | null = null;
            
                         switch (tracker.type) {
               case 'diet':
                 const dietResponse = await fetch(
                   `${import.meta.env.VITE_API_BASE_URL}/api/diet/get/${tracker.referenceId}`,
                   { credentials: 'include' }
                 );
                 if (dietResponse.ok) {
                   entryData = await dietResponse.json();
                 }
                 break;
                 
               case 'workout':
                 const workoutResponse = await fetch(
                   `${import.meta.env.VITE_API_BASE_URL}/api/workout/get/${tracker.referenceId}`,
                   { credentials: 'include' }
                 );
                 if (workoutResponse.ok) {
                   entryData = await workoutResponse.json();
                 }
                 break;
                 
               case 'sleep':
                 const sleepResponse = await fetch(
                   `${import.meta.env.VITE_API_BASE_URL}/api/sleep/get/${tracker.referenceId}`,
                   { credentials: 'include' }
                 );
                 if (sleepResponse.ok) {
                   entryData = await sleepResponse.json();
                 }
                 break;
            }
            
            if (entryData) {
              groupedData[dateStr].push({
                type: tracker.type,
                data: entryData,
                tracker: tracker
              });
            }
          } catch (error) {
            console.error(`Error fetching ${tracker.type} data:`, error);
          }
        }
        
        setTrackerData(groupedData);
      }
    } catch (error) {
      console.error('Error fetching tracker data:', error);
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
        onEntryAdded={handleEntryAdded}
      />
    </div>
  );
};

export default Tracker;