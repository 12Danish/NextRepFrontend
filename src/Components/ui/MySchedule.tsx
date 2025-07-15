export default function MySchedule() {
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">My Schedule</h3>
              <button className="text-orange-500 text-sm hover:text-orange-600">View All →</button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 text-xs">🏃</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">Stretch</div>
                  <div className="text-xs text-gray-500">At 08:00</div>
                </div>
                <div className="text-xs text-orange-500 font-medium">20 Reco...</div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-xs">🏃</span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">Back Stretch</div>
                  <div className="text-xs text-gray-500">At 09:00</div>
                </div>
                <div className="text-xs text-blue-500 font-medium">10 Round</div>
              </div>
            </div>
          </div>
    )
}