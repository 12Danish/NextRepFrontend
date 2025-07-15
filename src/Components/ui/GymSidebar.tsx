import type { Gym } from '../../types/gym';
import StarRating from './StarRating';

interface GymSidebarProps {
  filteredGyms: Gym[];
  allGyms: Gym[];
  favorites: string[];
}

export default function GymSidebar({ filteredGyms, allGyms, favorites }: GymSidebarProps) {
  return (
    <div className="hidden lg:block flex-[3] bg-white border-l border-gray-200 p-6 h-full">
      <div className="space-y-6">
        {/* Quick Stats */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Quick Stats</h3>
          <div className="space-y-3">
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-orange-700">Gyms Found</span>
                <span className="text-lg font-bold text-orange-600">{filteredGyms.length}</span>
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-700">Open Now</span>
                <span className="text-lg font-bold text-green-600">
                  {filteredGyms.filter(g => g.openNow).length}
                </span>
              </div>
            </div>
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-red-700">Favorites</span>
                <span className="text-lg font-bold text-red-600">{favorites.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Rated */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Top Rated</h3>
          <div className="space-y-3">
            {allGyms
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 3)
              .map((gym) => (
                <div key={gym.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium text-sm text-gray-800 mb-1">{gym.name}</div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <StarRating rating={gym.rating} size={12} />
                      <span className="text-xs text-gray-600 ml-1">{gym.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">{gym.distance}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Popular Amenities */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">Popular Amenities</h3>
          <div className="space-y-2">
            {['Personal Trainers', 'Cardio Equipment', 'Group Classes', 'Sauna', 'Parking', 'Childcare'].map((amenity) => (
              <div key={amenity} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">{amenity}</span>
                <span className="text-xs text-gray-500">
                  {allGyms.filter(g => g.amenities.includes(amenity)).length}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Location Info */}
        <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-4 text-white">
          <div className="mb-3">
            <div className="text-sm font-medium mb-1">Your Location</div>
            <div className="text-xs text-orange-100 mb-4">
              Location detected
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Radius</span>
              <span className="font-bold">5 miles</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Results</span>
              <span className="font-bold">{filteredGyms.length} found</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 