export default function Goals (){
    return (
        <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Goals</h3>
          <button className="text-orange-500 text-sm hover:text-orange-600">View All →</button>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">Running on Track</span>
              <span className="text-xs text-orange-500 font-medium">05 Rounds</span>
            </div>
            <div className="text-xs text-gray-500">Saturday, April 10 | 08:00 AM</div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">Push Up</span>
              <span className="text-xs text-orange-500 font-medium">50 Reco...</span>
            </div>
            <div className="text-xs text-gray-500">Sunday, April 11 | 08:00 AM</div>
          </div>
        </div>
      </div>
    )
}