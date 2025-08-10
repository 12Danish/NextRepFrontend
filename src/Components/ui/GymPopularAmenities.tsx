import type { GymWithDistance } from '../../types/gym';

interface GymPopularAmenitiesProps {
  allGyms: GymWithDistance[];
}

export default function GymPopularAmenities({ allGyms }: GymPopularAmenitiesProps) {
  return (
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
  );
} 