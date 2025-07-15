import React, { useState, useEffect } from 'react';
import { MapPin, Search, Star, Clock, Phone, Navigation, Filter, Heart, Users, Dumbbell, Zap } from 'lucide-react';
import FindGymHero from '../../Components/ui/FindGymHero';
// Type definitions
interface Gym {
  id: string;
  name: string;
  address: string;
  rating: number;
  reviews: number;
  distance: string;
  price: string;
  amenities: string[];
  openNow: boolean;
  hours: string;
  phone: string;
  lat: number;
  lng: number;
  image: string;
  category: 'gym' | 'studio' | 'crossfit' | 'pool' | 'martial-arts';
}

type GymCategory = 'all' | 'gym' | 'studio' | 'crossfit' | 'pool' | 'martial-arts';

const FindGyms: React.FC = () => {
  const [activeTab, setActiveTab] = useState<GymCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Sample gyms data
  const [gyms, setGyms] = useState<Gym[]>([
    {
      id: '1',
      name: 'FitLife Gym & Spa',
      address: '123 Main Street, Downtown',
      rating: 4.5,
      reviews: 234,
      distance: '0.5 mi',
      price: '$29/month',
      amenities: ['Cardio Equipment', 'Weight Training', 'Personal Trainers', 'Sauna', 'Parking'],
      openNow: true,
      hours: '5:00 AM - 11:00 PM',
      phone: '(555) 123-4567',
      lat: 40.7128,
      lng: -74.0060,
      image: '/api/placeholder/300/200',
      category: 'gym'
    },
    {
      id: '2',
      name: 'CrossFit Warriors',
      address: '456 Oak Avenue, Midtown',
      rating: 4.8,
      reviews: 156,
      distance: '0.8 mi',
      price: '$89/month',
      amenities: ['CrossFit Classes', 'Olympic Lifting', 'Functional Training', 'Community Events'],
      openNow: true,
      hours: '6:00 AM - 10:00 PM',
      phone: '(555) 234-5678',
      lat: 40.7589,
      lng: -73.9851,
      image: '/api/placeholder/300/200',
      category: 'crossfit'
    },
    {
      id: '3',
      name: 'Zen Yoga Studio',
      address: '789 Pine Street, Uptown',
      rating: 4.6,
      reviews: 89,
      distance: '1.2 mi',
      price: '$45/month',
      amenities: ['Yoga Classes', 'Meditation', 'Hot Yoga', 'Prenatal Classes', 'Massage'],
      openNow: false,
      hours: '7:00 AM - 9:00 PM',
      phone: '(555) 345-6789',
      lat: 40.7831,
      lng: -73.9712,
      image: '/api/placeholder/300/200',
      category: 'studio'
    },
    {
      id: '4',
      name: 'AquaFit Swimming Center',
      address: '321 River Road, Riverside',
      rating: 4.3,
      reviews: 167,
      distance: '1.5 mi',
      price: '$39/month',
      amenities: ['Olympic Pool', 'Lap Swimming', 'Water Aerobics', 'Swimming Lessons', 'Lifeguards'],
      openNow: true,
      hours: '5:30 AM - 10:00 PM',
      phone: '(555) 456-7890',
      lat: 40.7505,
      lng: -73.9934,
      image: '/api/placeholder/300/200',
      category: 'pool'
    },
    {
      id: '5',
      name: 'Dragon Martial Arts',
      address: '654 Elm Street, Eastside',
      rating: 4.7,
      reviews: 92,
      distance: '2.1 mi',
      price: '$55/month',
      amenities: ['Karate Classes', 'Kickboxing', 'Self Defense', 'Kids Classes', 'Tournaments'],
      openNow: true,
      hours: '4:00 PM - 10:00 PM',
      phone: '(555) 567-8901',
      lat: 40.7282,
      lng: -73.9942,
      image: '/api/placeholder/300/200',
      category: 'martial-arts'
    },
    {
      id: '6',
      name: 'Elite Fitness Club',
      address: '987 Broadway, Theater District',
      rating: 4.4,
      reviews: 298,
      distance: '1.8 mi',
      price: '$49/month',
      amenities: ['State-of-art Equipment', 'Group Classes', 'Personal Training', 'Juice Bar', 'Childcare'],
      openNow: true,
      hours: '24/7',
      phone: '(555) 678-9012',
      lat: 40.7580,
      lng: -73.9855,
      image: '/api/placeholder/300/200',
      category: 'gym'
    }
  ]);

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

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Error getting location:', error);
          // Default to NYC coordinates
          setUserLocation({ lat: 40.7128, lng: -74.0060 });
        }
      );
    } else {
      setUserLocation({ lat: 40.7128, lng: -74.0060 });
    }
  }, []);

  const filteredGyms = gyms.filter(gym => {
    const matchesCategory = activeTab === 'all' || gym.category === activeTab;
    const matchesSearch = gym.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         gym.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (gymId: string): void => {
    setFavorites(prev => 
      prev.includes(gymId) 
        ? prev.filter(id => id !== gymId)
        : [...prev, gymId]
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={14}
        className={index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  // Simple map placeholder component
  const MapComponent = () => (
    <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-cyan-100 opacity-50"></div>
      <div className="relative z-10 text-center">
        <MapPin size={48} className="text-orange-500 mx-auto mb-4" />
        <p className="text-gray-600 font-medium">Interactive Map</p>
        <p className="text-sm text-gray-500 mt-1">Showing nearby gyms</p>
        {userLocation && (
          <div className="mt-4 text-xs text-gray-500">
            Location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
          </div>
        )}
      </div>
      {/* Mock map pins */}
      <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-cyan-500 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
    </div>
  );

  return (
    <div className="flex w-full min-h-screen py-6 bg-orange-50">
      {/* Main Content Area */}
      <div className="flex-[10] p-4 lg:p-6">
        <div className="space-y-6">
          {/* Hero Section */}
          <FindGymHero />

          {/* Search and Filters */}
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

          {/* Map and Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Map Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">Map View</h3>
              <div className="h-96">
                <MapComponent />
              </div>
            </div>

            {/* Results Section */}
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
                          {renderStars(gym.rating)}
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
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
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
              {gyms
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 3)
                .map((gym) => (
                  <div key={gym.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-sm text-gray-800 mb-1">{gym.name}</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {renderStars(gym.rating)}
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
                    {gyms.filter(g => g.amenities.includes(amenity)).length}
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
                {userLocation ? 'Location detected' : 'Getting location...'}
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
    </div>
  );
};

export default FindGyms;