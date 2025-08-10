import type { GymWithDistance } from '../../types/gym';

interface GymLocationCardProps {
  filteredGyms: GymWithDistance[];
}

export default function GymLocationCard({ filteredGyms }: GymLocationCardProps) {
  return (
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
          <span className="font-bold">5 km</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Results</span>
          <span className="font-bold">{filteredGyms.length} found</span>
        </div>
      </div>
    </div>
  );
} 