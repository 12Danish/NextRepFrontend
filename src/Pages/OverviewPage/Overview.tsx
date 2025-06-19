import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';

const Overview = () => {
  // Sample data for the chart
  const chartData = [
    { day: 'Mon', Workout: 80, Calories: 60, Steps: 90 },
    { day: 'Tue', Workout: 65, Calories: 45, Steps: 75 },
    { day: 'Wed', Workout: 90, Calories: 80, Steps: 85 },
    { day: 'Thu', Workout: 70, Calories: 90, Steps: 95 },
    { day: 'Fri', Workout: 85, Calories: 70, Steps: 80 },
    { day: 'Sat', Workout: 95, Calories: 85, Steps: 100 },
    { day: 'Sun', Workout: 60, Calories: 55, Steps: 70 }
  ];

  const foodData = [
    { food: 'Burrito', meal: 'Pizza Burger', calories: 'Receiving', priorities: '01:00 AM', carbs: '20 gm' },
    { food: 'Burger', meal: 'Pizza Burger', calories: 'Receiving', priorities: '01:00 AM', carbs: '20 gm' }
  ];

  return (
    
    <div className="flex w-full min-h-screen py-6">
      {/* Main Content Area */}
      <div className="flex-[10] p-4 lg:p-6 ">
        <div className="space-y-6">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">Track Your Daily Activities</h2>
              <p className="text-orange-100 max-w-md">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
              </p>
            </div>
            <div className="absolute right-0 top-0 w-48 h-full bg-orange-600 opacity-30 rounded-l-full transform translate-x-24"></div>
          </div>

          {/* Activity Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {/* Workout Card */}
            <div className="bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold">00</div>
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded"></div>
                </div>
              </div>
              <div>
                <div className="font-semibold text-lg">Workout</div>
                <div className="text-cyan-100 text-sm">4 hrs</div>
              </div>
            </div>

            {/* Calories Card */}
            <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold">🔥</div>
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded"></div>
                </div>
              </div>
              <div>
                <div className="font-semibold text-lg">Calories</div>
                <div className="text-orange-100 text-sm">1,200 Cal</div>
              </div>
            </div>

            {/* Steps Card */}
            <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold">👥</div>
                <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded"></div>
                </div>
              </div>
              <div>
                <div className="font-semibold text-lg">Steps</div>
                <div className="text-purple-100 text-sm">20,000 Steps</div>
              </div>
            </div>
          </div>

          {/* Goal Progress Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Goal Progress</h3>
              <select className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            
            <div className="h-64 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barCategoryGap="20%">
                  <XAxis 
                    dataKey="day" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="circle"
                  />
                  <Bar 
                    dataKey="Workout" 
                    fill="#06B6D4" 
                    radius={[2, 2, 0, 0]}
                    name="Workout"
                  />
                  <Bar 
                    dataKey="Calories" 
                    fill="#F97316" 
                    radius={[2, 2, 0, 0]}
                    name="Calories"
                  />
                  <Bar 
                    dataKey="Steps" 
                    fill="#8B5CF6" 
                    radius={[2, 2, 0, 0]}
                    name="Steps"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

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