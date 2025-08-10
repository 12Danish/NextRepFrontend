import { useState } from 'react';
import type { GymWithDistance } from '../../types/gym';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface GymQuickStatsProps {
  filteredGyms: GymWithDistance[];
  favorites: string[];
}

export default function GymQuickStats({ filteredGyms, favorites }: GymQuickStatsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Count locations by type
  const gymCount = filteredGyms.filter(g => g.type === 'gym').length;
  const studioCount = filteredGyms.filter(g => g.type === 'studio').length;
  const crossfitCount = filteredGyms.filter(g => g.type === 'crossfit').length;
  const poolCount = filteredGyms.filter(g => g.type === 'pool').length;
  const martialArtsCount = filteredGyms.filter(g => g.type === 'martial-arts').length;
  
  // Total locations (all types)
  const totalLocations = filteredGyms.length;
  
  // Open now count
  const openNowCount = filteredGyms.filter(g => g.openingHours && g.openingHours.includes('open')).length;

  return (
    <div>
      <h3 className="font-semibold text-gray-800 mb-4">Quick Stats</h3>
      
      {/* Essential Stats (Always Visible) */}
      <div className="space-y-3">
        {/* Total Locations */}
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-700">Total Locations</span>
            <span className="text-lg font-bold text-blue-600">{totalLocations}</span>
          </div>
        </div>
        
        {/* Gyms Only */}
        <div className="p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-orange-700">Gyms Found</span>
            <span className="text-lg font-bold text-orange-600">{gymCount}</span>
          </div>
        </div>
      </div>

      {/* Expandable Section */}
      {!isExpanded && (
        <div className="mt-3 relative">
          {/* Blurred Preview - Only the next stat */}
          <div className="opacity-60 blur-[1px] pointer-events-none">
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-purple-700">Studios</span>
                <span className="text-lg font-bold text-purple-600">{studioCount}</span>
              </div>
            </div>
          </div>
          
          {/* Expand Button */}
          <div className="mt-3 flex justify-center">
            <button
              onClick={() => setIsExpanded(true)}
              className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full text-sm text-gray-600 hover:text-gray-800 hover:bg-white/90 transition-all duration-200 shadow-sm"
            >
              <span>Show More</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Expanded Stats */}
      {isExpanded && (
        <div className="mt-3 space-y-3">
          {/* Studios */}
          <div className="p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-purple-700">Studios</span>
              <span className="text-lg font-bold text-purple-600">{studioCount}</span>
            </div>
          </div>
          
          {/* CrossFit */}
          <div className="p-3 bg-red-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-red-700">CrossFit</span>
              <span className="text-lg font-bold text-red-600">{crossfitCount}</span>
            </div>
          </div>
          
          {/* Swimming Pools */}
          <div className="p-3 bg-cyan-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-cyan-700">Swimming Pools</span>
              <span className="text-lg font-bold text-cyan-600">{poolCount}</span>
            </div>
          </div>
          
          {/* Martial Arts */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Martial Arts</span>
              <span className="text-lg font-bold text-gray-600">{martialArtsCount}</span>
            </div>
          </div>
          
          {/* Open Now */}
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-700">Open Now</span>
              <span className="text-lg font-bold text-green-600">{openNowCount}</span>
            </div>
          </div>
          
          {/* Favorites */}
          <div className="p-3 bg-pink-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-pink-700">Favorites</span>
              <span className="text-lg font-bold text-pink-600">{favorites.length}</span>
            </div>
          </div>

          {/* Collapse Button */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setIsExpanded(false)}
              className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-600 hover:text-gray-800 transition-all duration-200"
            >
              <span>Show Less</span>
              <ChevronUp size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 