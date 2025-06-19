import React from 'react';
import { Play, Clock, TrendingUp, Users } from 'lucide-react';

const WorkoutPlan = () => {
  const workoutSchedule = [
    { name: 'Stretch', time: 'At 08:00', duration: '10:00 Sets', type: 'warmup' },
    { name: 'Back Stretch', time: 'At 09:00', duration: '8/16 Round', type: 'strength' },
    { name: 'Yoga', time: 'At 10:00', duration: '04/20 min', type: 'flexibility' },
    { name: 'Yoga', time: 'At 11:00', duration: '20 min', type: 'flexibility' }
  ];

  const achievements = [
    { icon: '⏰', label: 'Hours', value: '15', color: 'bg-red-500' },
    { icon: '🔥', label: 'Kcal', value: '550', color: 'bg-orange-500' },
    { icon: '💪', label: 'Reps', value: '15', color: 'bg-red-600' },
    { icon: '🏋️', label: 'Sets', value: '5', color: 'bg-red-700' },
    { icon: '📊', label: 'Sets', value: '5', color: 'bg-red-800' }
  ];

  return (
    <div className="flex w-full min-h-full py-6 ">
      {/* Main Content Area */}
      <div className="flex-[10] p-4 lg:p-6 h-screen">
         <div className="space-y-6">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <div className="flex-1 mb-4 lg:mb-0">
                <h1 className="text-2xl lg:text-4xl font-bold mb-3">Start Your Workout From Today</h1>
                <p className="text-orange-100 max-w-md text-sm lg:text-base">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              <div className="w-full lg:w-48 h-32 lg:h-40 bg-orange-600 bg-opacity-30 rounded-xl flex items-center justify-center">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏃‍♀️</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Trainer Card */}
            <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-purple-300 rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold">Adrianna Lamb</h3>
                  <p className="text-purple-100 text-sm">Fitness Trainer</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-2xl font-bold mb-1">Legs</h4>
                <h4 className="text-xl font-semibold text-purple-100">Workout</h4>
              </div>

              <div className="flex gap-2">
                <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-3 py-1">
                  <Users size={14} />
                  <span className="text-sm">Lower Body</span>
                </div>
                <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-full px-3 py-1">
                  <TrendingUp size={14} />
                  <span className="text-sm">Beginner</span>
                </div>
              </div>

              <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500 bg-opacity-30 rounded-full transform translate-x-16 translate-y-16"></div>
            </div>

            {/* Workout Schedule */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Today's Workout</h3>

              <div className="space-y-4">
                {workoutSchedule.map((workout, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${workout.type === 'warmup' ? 'bg-orange-100' :
                          workout.type === 'strength' ? 'bg-blue-100' : 'bg-purple-100'
                        }`}>
                        <span className={`text-lg ${workout.type === 'warmup' ? 'text-orange-600' :
                            workout.type === 'strength' ? 'text-blue-600' : 'text-purple-600'
                          }`}>
                          {workout.type === 'warmup' ? '🤸' : workout.type === 'strength' ? '💪' : '🧘'}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{workout.name}</h4>
                        <p className="text-gray-500 text-sm">{workout.time}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${workout.type === 'warmup' ? 'bg-orange-100 text-orange-600' :
                          workout.type === 'strength' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                        }`}>
                        {workout.duration}
                      </span>
                      <button className={`w-8 h-8 rounded-full flex items-center justify-center ${workout.type === 'warmup' ? 'bg-orange-500 hover:bg-orange-600' :
                          workout.type === 'strength' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-purple-500 hover:bg-purple-600'
                        } text-white transition-colors`}>
                        <Play size={14} fill="currentColor" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Achievements</h3>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className={`${achievement.color} rounded-2xl p-6 text-white text-center`}>
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">{achievement.icon}</span>
                  </div>
                  <div className="text-sm font-medium mb-1">{achievement.label}</div>
                  <div className="text-2xl font-bold">{achievement.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Hidden on mobile */}
      <div className="hidden lg:block flex-[2] bg-white border-l border-gray-200 p-6 h-screen overflow-visible">
        <div className="space-y-6">
          {/* My Schedule Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">My Schedule</h3>
              <button className="text-orange-500 text-sm hover:text-orange-600">View All →</button>
            </div>

            <div className="space-y-4">
              {/* Monday */}
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Monday</h4>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 text-xs">🤸</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Stretch</div>
                    <div className="text-xs text-gray-500">At 08:00</div>
                  </div>
                  <div className="text-xs text-orange-500 font-medium">20 Sets</div>
                </div>
              </div>

              {/* Tuesday */}
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Tuesday</h4>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xs">💪</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Back Stretch</div>
                    <div className="text-xs text-gray-500">At 09:00</div>
                  </div>
                  <div className="text-xs text-blue-500 font-medium">10 Round</div>
                </div>
              </div>

              {/* Wednesday */}
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Wednesday</h4>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-xs">🧘</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Yoga</div>
                    <div className="text-xs text-gray-500">At 08:00</div>
                  </div>
                  <div className="text-xs text-purple-500 font-medium">20 min</div>
                </div>
              </div>

              {/* Thursday */}
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Thursday</h4>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-xs">🧘</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Yoga</div>
                    <div className="text-xs text-gray-500">At 08:00</div>
                  </div>
                  <div className="text-xs text-purple-500 font-medium">20 min</div>
                </div>
              </div>

              {/* Friday */}
              <div>
                <h4 className="text-sm font-medium text-gray-600 mb-2">Friday</h4>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-xs">🧘</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">Yoga</div>
                    <div className="text-xs text-gray-500">At 08:00</div>
                  </div>
                  <div className="text-xs text-purple-500 font-medium">20 min</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WorkoutPlan;