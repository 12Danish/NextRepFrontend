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

  const fetchTrackerData = async (date: Date) => {
    if (!isAuthenticated) return;
    
    try {
      setIsLoading(true);
      
      // Get the start and end of the month for the given date
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      
      // Use the new comprehensive tracking endpoint
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/tracker/getComprehensiveTracking?startDate=${startOfMonth.toISOString()}&endDate=${endOfMonth.toISOString()}`,
        {
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setTrackerData(result.trackingData || {});
      } else {
        console.error('Failed to fetch tracking data');
        setTrackerData({});
      }
    } catch (error) {
      console.error('Error fetching tracking data:', error);
      setTrackerData({});
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