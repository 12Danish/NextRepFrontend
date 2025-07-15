import React, { useState } from 'react';
import FindGymHero from '../../Components/ui/FindGymHero';
import MapSection from '../../Components/ui/MapSection';
import GymSearchFilters from '../../Components/ui/GymSearchFilters';
import FindGymResults from '../../Components/ui/FindGymResults';
import GymSidebar from '../../Components/ui/GymSidebar';
import type { Gym, GymCategory } from '../../types/gym';

const FindGyms: React.FC = () => {
  const [activeTab, setActiveTab] = useState<GymCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);

  const [gyms] = useState<Gym[]>([
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

  return (
    <div className="flex w-full min-h-screen py-6 bg-orange-50">
      {/* Main Content Area */}
      <div className="flex-[10] p-4 lg:p-6">
        <div className="space-y-6">
          {/* Hero Section */}
          <FindGymHero />

          {/* Search and Filters */}
          <GymSearchFilters
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {/* Map and Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MapSection />
            <FindGymResults
              filteredGyms={filteredGyms}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <GymSidebar
        filteredGyms={filteredGyms}
        allGyms={gyms}
        favorites={favorites}
      />
    </div>
  );
};

export default FindGyms;