import type { Gym } from '../../types/gym';

interface GymQuickStatsProps {
  filteredGyms: Gym[];
  favorites: string[];
}

export default function GymQuickStats({ filteredGyms, favorites }: GymQuickStatsProps) {
  return (
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
  );
} 