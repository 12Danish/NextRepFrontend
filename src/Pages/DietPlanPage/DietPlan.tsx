import React from 'react';

const DietPlan = () => {
  const foodSchedule = [
    { 
      icon: '🥩', 
      food: 'Meat', 
      meal: 'Break Fast', 
      calories: 'Receiving', 
      time: '08:00 AM', 
      carbs: '20 gm',
      bgColor: 'bg-red-100'
    },
    { 
      icon: '🍔', 
      food: 'Burger', 
      meal: 'Lunch', 
      calories: 'Receiving', 
      time: '01:00 AM', 
      carbs: '30 gm',
      bgColor: 'bg-orange-100'
    },
    { 
      icon: '🌯', 
      food: 'Burrito', 
      meal: 'Dinner', 
      calories: 'Receiving', 
      time: '01:00 PM', 
      carbs: '10 gm',
      bgColor: 'bg-yellow-100'
    },
    { 
      icon: '🍦', 
      food: 'Ice Cream', 
      meal: 'Lunch', 
      calories: 'Receiving', 
      time: '01:00 AM', 
      carbs: '30 gm',
      bgColor: 'bg-blue-100'
    },
    { 
      icon: '🍕', 
      food: 'Pizza Slice', 
      meal: 'Brunch', 
      calories: 'Receiving', 
      time: '11:00 AM', 
      carbs: '50 gm',
      bgColor: 'bg-orange-100'
    },
    { 
      icon: '🍪', 
      food: 'Cookies', 
      meal: 'Break Fast', 
      calories: 'Receiving', 
      time: '08:00 AM', 
      carbs: '30 gm',
      bgColor: 'bg-yellow-100'
    },
    { 
      icon: '🍟', 
      food: 'Fries', 
      meal: 'Lunch', 
      calories: 'Receiving', 
      time: '01:00 AM', 
      carbs: '30 gm',
      bgColor: 'bg-red-100'
    },
    { 
      icon: '🥓', 
      food: 'Egg & Bacon', 
      meal: 'Dinner', 
      calories: 'Receiving', 
      time: '10:00 PM', 
      carbs: '70 gm',
      bgColor: 'bg-orange-100'
    },
    { 
      icon: '🧁', 
      food: 'Cup Cake', 
      meal: 'Break Fast', 
      calories: 'Receiving', 
      time: '08:00 AM', 
      carbs: '40 gm',
      bgColor: 'bg-purple-100'
    },
    { 
      icon: '🌮', 
      food: 'Taco', 
      meal: 'Lunch', 
      calories: 'Receiving', 
      time: '01:00 AM', 
      carbs: '80 gm',
      bgColor: 'bg-yellow-100'
    }
  ];

  const weeklySchedule = [
    { day: 'Monday', meal: 'Pizza, Break Fast', time: '08:30 AM' },
    { day: 'Tuesday', meal: 'Chicken Lunch', time: '01:30 PM' },
    { day: 'Wednesday', meal: 'Ice Cream Dinner', time: '01:00 PM' },
    { day: 'Thursday', meal: 'Burger Lunch', time: '08:30 AM' },
    { day: 'Friday', meal: 'Free Dinner', time: '11:30 PM' },
    { day: 'Saturday', meal: 'Burrito Brunch', time: '11:00 PM' },
    { day: 'Sunday', meal: 'Egg & Bacon Break Fast', time: '08:30 AM' }
  ];

  return (
    <div className="flex w-full min-h-screen bg-orange-50 py-6 ">
      {/* Main Content Area */}
      <div className="flex-[10]">
        <div className="p-4 lg:p-6 space-y-6 min-h-full">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <div className="flex-1 mb-4 lg:mb-0">
                <h1 className="text-2xl lg:text-4xl font-bold mb-3">Plan Your Diet Plan This Week</h1>
                <p className="text-orange-100 max-w-md text-sm lg:text-base">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam.
                </p>
              </div>
              <div className="w-full lg:w-48 h-32 lg:h-40 bg-orange-600 bg-opacity-30 rounded-xl flex items-center justify-center">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🍽️</span>
                </div>
              </div>
            </div>
          </div>

          {/* Food Schedule Table */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-2 font-medium text-gray-600">Food</th>
                    <th className="text-left py-4 px-2 font-medium text-gray-600">Meal</th>
                    <th className="text-left py-4 px-2 font-medium text-gray-600">Calories</th>
                    <th className="text-left py-4 px-2 font-medium text-gray-600">Priorities</th>
                    <th className="text-left py-4 px-2 font-medium text-gray-600">Carbs</th>
                  </tr>
                </thead>
                <tbody>
                  {foodSchedule.map((item, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.bgColor}`}>
                            <span className="text-lg">{item.icon}</span>
                          </div>
                          <span className="font-medium text-gray-800">{item.food}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-gray-600">{item.meal}</td>
                      <td className="py-4 px-2">
                        <span className="text-green-600 font-medium">{item.calories}</span>
                      </td>
                      <td className="py-4 px-2 text-gray-600">{item.time}</td>
                      <td className="py-4 px-2 text-gray-600">{item.carbs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block flex-[3] bg-white border-l border-gray-200 ">
        <div className="p-6 space-y-6">
          {/* Week Plan Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Week Plan</h3>
              <button className="text-orange-500 text-sm hover:text-orange-600 font-medium">View All →</button>
            </div>

            <div className="space-y-4">
              {weeklySchedule.map((schedule, index) => (
                <div key={index}>
                  <h4 className="text-sm font-medium text-gray-600 mb-2">{schedule.day}</h4>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-800">{schedule.meal}</div>
                    </div>
                    <div className="text-xs text-orange-500 font-medium">{schedule.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

      

        </div>
      </div>
    </div>
  );
};

export default DietPlan;