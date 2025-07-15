import MapComponent from "./MapComponent"
export default function MapSection(){
    return(
        <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">Map View</h3>
              <div className="h-96">
                <MapComponent />
              </div>
        </div>
    )
}