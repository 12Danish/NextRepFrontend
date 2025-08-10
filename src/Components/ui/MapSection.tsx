import React from 'react';
import type { GymWithDistance } from '../../types/gym';

interface MapSectionProps {
  userLocation: { lat: number; lng: number } | null;
  gyms: GymWithDistance[];
  activeCategory: string;
}

const MapSection: React.FC<MapSectionProps> = ({ userLocation, gyms, activeCategory }) => {
  if (!userLocation) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center text-gray-500">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p>Location not available</p>
        </div>
      </div>
    );
  }

  // Filter gyms based on active category
  const filteredGyms = activeCategory === 'all' 
    ? gyms 
    : gyms.filter(gym => gym.type === activeCategory);

  // Calculate map dimensions and scale
  const mapSize = 400; // Map container size in pixels
  const maxDistance = Math.max(...gyms.map(g => g.distance), 5000); // Max distance in meters
  const scale = mapSize / (maxDistance * 2); // Scale factor for converting meters to pixels

  // Get category color
  const getCategoryColor = (type: string) => {
    switch (type) {
      case 'gym': return 'bg-orange-500';
      case 'studio': return 'bg-purple-500';
      case 'crossfit': return 'bg-red-500';
      case 'pool': return 'bg-blue-500';
      case 'martial-arts': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  // Convert gym coordinates to relative map positions
  const getGymPosition = (gym: GymWithDistance) => {
    // Calculate relative position from user location
    const latDiff = (gym.lat - userLocation.lat) * 111320; // Convert to meters
    const lngDiff = (gym.lng - userLocation.lng) * 111320 * Math.cos(userLocation.lat * Math.PI / 180);
    
    // Convert to pixel coordinates (center of map is user location)
    const x = (mapSize / 2) + (lngDiff * scale);
    const y = (mapSize / 2) - (latDiff * scale); // Invert Y axis for map orientation
    
    return { x, y };
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Interactive Map</h3>
        <p className="text-sm text-gray-600">
          Your location: {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
        </p>
        <p className="text-xs text-gray-500">
          Scale: 1 pixel ≈ {(1000 / scale).toFixed(0)} meters
        </p>
      </div>

      {/* Interactive Map Container */}
      <div className="relative w-full h-96 bg-gray-50 rounded-lg border border-gray-300 overflow-hidden">
        {/* Map Grid */}
        <div className="absolute inset-0">
          {/* Vertical center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 transform -translate-x-1/2"></div>
          {/* Horizontal center line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300 transform -translate-y-1/2"></div>
          
          {/* Distance circles */}
          <div className="absolute left-1/2 top-1/2 w-32 h-32 border border-gray-200 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute left-1/2 top-1/2 w-64 h-64 border border-gray-200 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* User Location (Center) */}
        <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-orange-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20 shadow-lg">
          <div className="absolute inset-0 bg-orange-400 rounded-full animate-ping"></div>
        </div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-6 text-xs text-gray-600 font-medium">
          You
        </div>

        {/* Gym Locations */}
        {filteredGyms.map((gym, index) => {
          const position = getGymPosition(gym);
          const isVisible = position.x >= 0 && position.x <= mapSize && position.y >= 0 && position.y <= mapSize;
          
          if (!isVisible) return null;

          return (
            <div
              key={`${gym.osmId}-${index}`}
              className={`absolute w-3 h-3 ${getCategoryColor(gym.type)} rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10 cursor-pointer hover:scale-125 transition-transform duration-200`}
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`
              }}
              title={`${gym.name} (${gym.distanceFormatted})`}
            >
              {/* Blinking animation */}
              <div className={`absolute inset-0 ${getCategoryColor(gym.type)} rounded-full animate-ping opacity-75`}></div>
              
              {/* Distance label */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded text-xs text-gray-700 shadow-md opacity-0 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {gym.distanceFormatted}
              </div>
            </div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md border border-gray-200">
          <div className="text-xs font-medium text-gray-700 mb-2">Categories</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Gyms</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Studios</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-600">CrossFit</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Pools</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Martial Arts</span>
            </div>
          </div>
        </div>

        {/* No results message */}
        {filteredGyms.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.263M15 9.172a4 4 0 00-5.656 0M15 12H9m6 4H9" />
                </svg>
              </div>
              <p className="text-sm">No {activeCategory === 'all' ? 'locations' : activeCategory}s found</p>
            </div>
          </div>
        )}
      </div>

      {/* Map Info */}
      <div className="mt-3 text-xs text-gray-500 text-center">
        <span>Click on dots to see distance • </span>
        <span>Orange dot = Your location • </span>
        <span>Colored dots = Fitness facilities</span>
      </div>
    </div>
  );
};

export default MapSection;