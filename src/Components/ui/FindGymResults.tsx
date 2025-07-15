import { MapPin, Clock, Phone, Navigation, Heart, Dumbbell, Star, Users, Zap } from 'lucide-react';
import type { Gym } from '../../types/gym';
import StarRating from './StarRating';

interface FindGymResultsProps {
  filteredGyms: Gym[];
  favorites: string[];
  toggleFavorite: (gymId: string) => void;
}

export default function FindGymResults({
  filteredGyms,
  favorites,
  toggleFavorite
}: FindGymResultsProps) {
  const categoryIcons = {
    gym: <Dumbbell size={20} className="text-orange-500" />,
    studio: <Heart size={20} className="text-purple-500" />,
    crossfit: <Zap size={20} className="text-red-500" />,
    pool: <Users size={20} className="text-cyan-500" />,
    'martial-arts': <Star size={20} className="text-yellow-500" />
  };

  const categoryColors = {
    gym: 'bg-orange-50 border-orange-200 text-orange-700',
    studio: 'bg-purple-50 border-purple-200 text-purple-700',
    crossfit: 'bg-red-50 border-red-200 text-red-700',
    pool: 'bg-cyan-50 border-cyan-200 text-cyan-700',
    'martial-arts': 'bg-yellow-50 border-yellow-200 text-yellow-700'
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold text-gray-800 mb-4">
        Found {filteredGyms.length} gyms near you
      </h3>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredGyms.map((gym) => (
          <div key={gym.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1">{gym.name}</h4>
                <div className="flex items-center gap-1 mb-2">
                  <StarRating rating={gym.rating} />
                  <span className="text-sm text-gray-600 ml-1">
                    {gym.rating} ({gym.reviews} reviews)
                  </span>
                </div>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <MapPin size={14} />
                  {gym.address}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${categoryColors[gym.category]}`}>
                  {categoryIcons[gym.category]}
                  <span className="ml-1 capitalize">{gym.category}</span>
                </span>
                <button
                  onClick={() => toggleFavorite(gym.id)}
                  className={`p-1 rounded-full transition-colors ${
                    favorites.includes(gym.id)
                      ? 'text-red-500 hover:text-red-600'
                      : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart size={16} className={favorites.includes(gym.id) ? 'fill-current' : ''} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-1 text-gray-600">
                <Navigation size={14} />
                {gym.distance}
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Clock size={14} />
                <span className={gym.openNow ? 'text-green-600' : 'text-red-600'}>
                  {gym.openNow ? 'Open' : 'Closed'}
                </span>
              </div>
              <div className="font-medium text-orange-600">
                {gym.price}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-1">
              {gym.amenities.slice(0, 3).map((amenity, index) => (
                <span key={index} className="px-2 py-1 bg-gray-200 text-xs rounded text-gray-600">
                  {amenity}
                </span>
              ))}
              {gym.amenities.length > 3 && (
                <span className="px-2 py-1 bg-gray-200 text-xs rounded text-gray-600">
                  +{gym.amenities.length - 3} more
                </span>
              )}
            </div>

            <div className="mt-3 flex gap-2">
              <button className="flex-1 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm">
                View Details
              </button>
              <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm flex items-center gap-1">
                <Phone size={14} />
                Call
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}