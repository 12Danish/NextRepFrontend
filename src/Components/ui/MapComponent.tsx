import { useEffect, useState } from "react";
import { MapPin } from "lucide-react"
export default function MapComponent(){
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

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
    return(
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
    )
}