import React from 'react';
import type { GymCategory } from '../../types/gym';

interface GymSearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: GymCategory;
  setActiveTab: (category: GymCategory) => void;
  onSearch: () => void;
}

const GymSearchFilters: React.FC<GymSearchFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab,
  onSearch
}) => {
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search for gyms, studios, pools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </form>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2">
          {(['all', 'gym', 'studio', 'crossfit', 'pool', 'martial-arts'] as GymCategory[]).map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all' && 'All'}
              {category === 'gym' && 'Gyms'}
              {category === 'studio' && 'Studios'}
              {category === 'crossfit' && 'CrossFit'}
              {category === 'pool' && 'Pools'}
              {category === 'martial-arts' && 'Martial Arts'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GymSearchFilters; 