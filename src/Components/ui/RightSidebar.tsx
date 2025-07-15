export default function RightSidebar() {
    return (
        <div className="hidden lg:block flex-[3] bg-white border-l border-gray-200 p-6 h-full ">
        <div className="space-y-6">
          {/* My Schedule Section */}
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

          {/* Goals Section */}
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

          {/* Premium Membership Card */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
            <div className="mb-3">
              <div className="text-sm font-medium mb-1">50% off on Premium Membership</div>
              <div className="text-xs text-purple-100">
                Join today and enjoy health and fitness experience like never before.
              </div>
            </div>
            <button className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              Upgrade
            </button>
          </div>
        </div>
      </div>
    )
}