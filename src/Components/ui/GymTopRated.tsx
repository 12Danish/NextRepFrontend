import type { Gym } from '../../types/gym';
import StarRating from './StarRating';

interface GymTopRatedProps {
  allGyms: Gym[];
}

export default function GymTopRated({ allGyms }: GymTopRatedProps) {
  return (
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
  );
} 