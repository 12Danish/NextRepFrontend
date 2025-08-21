import type { GymWithDistance } from '../../types/gym';
import GymCard from './GymCard';

interface FindGymResultsProps {
  filteredGyms: GymWithDistance[];
  favorites: string[];
  toggleFavorite: (gymId: string) => void;
}

export default function FindGymResults({
  filteredGyms,
  favorites,
  toggleFavorite
}: FindGymResultsProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-4">
        Found {filteredGyms.length} locations near you
      </h3>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredGyms.map((gym) => (
          <GymCard
            key={gym.id}
            gym={gym}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}