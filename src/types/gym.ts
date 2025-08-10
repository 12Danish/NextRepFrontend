export interface Location {
  id: string;
  osmId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  type: 'gym' | 'studio' | 'crossfit' | 'pool' | 'martial-arts';
  amenities: string[];
  phone?: string;
  website?: string;
  openingHours?: string;
  distance?: string;
  distanceFormatted?: string;
}

export interface LocationWithDistance extends Omit<Location, 'distance' | 'distanceFormatted'> {
  distance: number;
  distanceFormatted: string;
}

export type LocationType = 'all' | 'gym' | 'studio' | 'crossfit' | 'pool' | 'martial-arts';

// Keep the old names for backward compatibility
export interface Gym {
  id: string;
  osmId: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  type: string;
  amenities: string[];
  phone?: string;
  website?: string;
  openingHours?: string;
  distance?: string;
  distanceFormatted?: string;
}

export interface GymWithDistance extends Omit<Gym, 'distance' | 'distanceFormatted'> {
  distance: number;
  distanceFormatted: string;
}

export type GymCategory = 'all' | 'gym' | 'studio' | 'crossfit' | 'pool' | 'martial-arts'; 