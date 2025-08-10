import React, { useState, useEffect } from 'react';
import FindGymHero from '../../Components/ui/FindGymHero';
import MapSection from '../../Components/ui/MapSection';
import GymSearchFilters from '../../Components/ui/GymSearchFilters';
import FindGymResults from '../../Components/ui/FindGymResults';
import GymSidebar from '../../Components/ui/GymSidebar';
import type { GymCategory, GymWithDistance } from '../../types/gym';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const FindGyms: React.FC = () => {
  const [activeTab, setActiveTab] = useState<GymCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [gyms, setGyms] = useState<GymWithDistance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Get user's current location
  const getCurrentLocation = (): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          resolve(location);
        },
        (error) => {
          console.error('❌ Error getting location:', error);
          const defaultLocation = { lat: 40.7128, lng: -74.0060 };
          resolve(defaultLocation);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  };

  // Fetch nearby gyms from backend
  const fetchNearbyGyms = async (lat: number, lng: number, radius = 5000, type?: string, searchQuery?: string): Promise<GymWithDistance[]> => {
    try {
      const queryParams = new URLSearchParams({
        lat: lat.toString(),
        lng: lng.toString(),
        radius: radius.toString(),
        ...(type && type !== 'all' && { type }),
        ...(searchQuery && { searchQuery }),
        limit: '20'
      });

      const response = await fetch(`${API_BASE_URL}/locations/nearby?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Error fetching nearby gyms:', error);
      throw error;
    }
  };

  // Get user location and fetch nearby gyms
  useEffect(() => {
    const loadGyms = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get user's current location
        const location = await getCurrentLocation();
        setUserLocation(location);

        // Fetch nearby gyms
        const nearbyGyms = await fetchNearbyGyms(location.lat, location.lng);
        setGyms(nearbyGyms);
      } catch (err) {
        console.error('Error loading gyms:', err);
        setError('Failed to load nearby gyms. Please try again.');
        // Set default location and empty gyms array
        setUserLocation({ lat: 40.7128, lng: -74.0060 });
        setGyms([]);
      } finally {
        setLoading(false);
      }
    };

    loadGyms();
  }, []);

  // Filter gyms based on search query and category (client-side filtering for better performance)
  const filteredGyms = gyms.filter(gym => {
    const matchesCategory = activeTab === 'all' || gym.type === activeTab;
    const matchesSearch = searchQuery === '' || 
                         gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         gym.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Remove duplicates based on OSM ID to prevent showing the same location multiple times
  // This handles cases where a location was misclassified and corrected
  const deduplicatedGyms = filteredGyms.filter((gym, index, self) => 
    index === self.findIndex(g => g.osmId === gym.osmId)
  );

  // Remove duplicates from the main gyms array as well
  const deduplicatedAllGyms = gyms.filter((gym, index, self) => 
    index === self.findIndex(g => g.osmId === gym.osmId)
  );

  // Log deduplication results for debugging
  if (filteredGyms.length !== deduplicatedGyms.length) {
  }
  
  if (gyms.length !== deduplicatedAllGyms.length) {
  }

  const toggleFavorite = (gymId: string): void => {
    setFavorites(prev => 
      prev.includes(gymId) 
        ? prev.filter(id => id !== gymId)
        : [...prev, gymId]
    );
  };

  // Optimized search - no API call, just client-side filtering
  const handleSearch = () => {
  };

  // Optimized category change - no API call, just client-side filtering
  const handleCategoryChange = (category: GymCategory) => {
    setActiveTab(category);
  };

  if (loading && gyms.length === 0) {
    return (
      <div className="flex w-full min-h-screen py-6 bg-orange-50">
        <div className="flex-[10] p-4 lg:p-6">
          <div className="space-y-6">
            <FindGymHero />
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              <span className="ml-3 text-gray-600">Loading nearby gyms...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-screen py-6 bg-orange-50">
      {/* Main Content Area */}
      <div className="flex-[10] p-4 lg:p-6">
        <div className="space-y-6">
          {/* Hero Section */}
          <FindGymHero />

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Search and Filters */}
          <GymSearchFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeTab={activeTab}
            setActiveTab={handleCategoryChange}
            onSearch={handleSearch}
          />

          {/* Results Summary */}
          {deduplicatedGyms.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <span className="font-medium">Found {deduplicatedGyms.length} locations:</span>
                {deduplicatedGyms.filter(g => g.type === 'gym').length > 0 && (
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
                    {deduplicatedGyms.filter(g => g.type === 'gym').length} Gyms
                  </span>
                )}
                {deduplicatedGyms.filter(g => g.type === 'studio').length > 0 && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                    {deduplicatedGyms.filter(g => g.type === 'studio').length} Studios
                  </span>
                )}
                {deduplicatedGyms.filter(g => g.type === 'crossfit').length > 0 && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full">
                    {deduplicatedGyms.filter(g => g.type === 'crossfit').length} CrossFit
                  </span>
                )}
                {deduplicatedGyms.filter(g => g.type === 'pool').length > 0 && (
                  <span className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded-full">
                    {deduplicatedGyms.filter(g => g.type === 'pool').length} Swimming Pools
                  </span>
                )}
                {deduplicatedGyms.filter(g => g.type === 'martial-arts').length > 0 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                    {deduplicatedGyms.filter(g => g.type === 'martial-arts').length} Martial Arts
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Map and Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MapSection 
              userLocation={userLocation}
              gyms={deduplicatedGyms}
              activeCategory={activeTab}
            />
            <FindGymResults
              filteredGyms={deduplicatedGyms}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <GymSidebar
        filteredGyms={deduplicatedGyms}
        allGyms={deduplicatedAllGyms}
        favorites={favorites}
      />
    </div>
  );
};

export default FindGyms;