export interface Gym {
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

export type GymCategory = 'all' | 'gym' | 'studio' | 'crossfit' | 'pool' | 'martial-arts'; 