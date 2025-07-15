import Hero from '../../Components/Hero';
import ActivityCards from '../../Components/ui/ActivitySection';
import GoalProgress from '../../Components/ui/GoalProgress';
const Overview = () => {

  const foodData = [
    { food: 'Burrito', meal: 'Pizza Burger', calories: 'Receiving', priorities: '01:00 AM', carbs: '20 gm' },
    { food: 'Burger', meal: 'Pizza Burger', calories: 'Receiving', priorities: '01:00 AM', carbs: '20 gm' }
  ];

  return (
    
    <div className="flex w-full min-h-screen py-6">
      {/* Main Content Area */}
      <div className="flex-[10] p-4 lg:p-6 ">
        <div className="space-y-6">
          <Hero />
          <ActivityCards />
          <GoalProgress />
          {/* Food Log Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Food</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Meal</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Calories</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Priorities</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Carbs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {foodData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <span className="text-orange-600 text-sm">🌯</span>
                          </div>
                          <span className="text-gray-900 font-medium">{item.food}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{item.meal}</td>
                      <td className="px-6 py-4 text-gray-600">{item.calories}</td>
                      <td className="px-6 py-4 text-gray-600">{item.priorities}</td>
                      <td className="px-6 py-4 text-gray-600">{item.carbs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Hidden on mobile */}
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
    </div>
  );
};

export default Overview;