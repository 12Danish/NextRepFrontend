import { Search, Filter, Dumbbell, Heart, Zap, Users, Star } from 'lucide-react';
import type { GymCategory } from '../../types/gym';

interface GymSearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: GymCategory;
  setActiveTab: (tab: GymCategory) => void;
}

export default function GymSearchFilters({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab
}: GymSearchFiltersProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search gyms, studios, or fitness centers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          <Filter size={20} />
          Filters
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === 'all'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Gyms
        </button>
        <button
          onClick={() => setActiveTab('gym')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === 'gym'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Dumbbell size={16} className="inline mr-2" />
          Gyms
        </button>
        <button
          onClick={() => setActiveTab('studio')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === 'studio'
              ? 'bg-purple-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Heart size={16} className="inline mr-2" />
          Studios
        </button>
        <button
          onClick={() => setActiveTab('crossfit')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === 'crossfit'
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Zap size={16} className="inline mr-2" />
          CrossFit
        </button>
        <button
          onClick={() => setActiveTab('pool')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === 'pool'
              ? 'bg-cyan-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Users size={16} className="inline mr-2" />
          Pools
        </button>
        <button
          onClick={() => setActiveTab('martial-arts')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
            activeTab === 'martial-arts'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Star size={16} className="inline mr-2" />
          Martial Arts
        </button>
      </div>
    </div>
  );
} 