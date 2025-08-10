import type { GymWithDistance } from '../../types/gym';
import GymQuickStats from './GymQuickStats';
import GymTopRated from './GymTopRated';
import GymPopularAmenities from './GymPopularAmenities';
import GymLocationCard from './GymLocationCard';

interface GymSidebarProps {
  filteredGyms: GymWithDistance[];
  allGyms: GymWithDistance[];
  favorites: string[];
}

export default function GymSidebar({ filteredGyms, allGyms, favorites }: GymSidebarProps) {
  return (
    <div className="hidden lg:block flex-[3] bg-white border-l border-gray-200 p-6 h-full">
      <div className="space-y-6">
        <GymQuickStats filteredGyms={filteredGyms} favorites={favorites} />
        <GymTopRated allGyms={allGyms} />
        <GymPopularAmenities allGyms={allGyms} />
        <GymLocationCard filteredGyms={filteredGyms} />
      </div>
    </div>
  );
} 