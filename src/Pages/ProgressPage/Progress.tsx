import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Target, Award, Calendar, Activity } from 'lucide-react';

const Progress = () => {
  // Dummy data for charts
  const weightData = [
    { month: 'Jan', weight: 75, target: 70 },
    { month: 'Feb', weight: 74, target: 70 },
    { month: 'Mar', weight: 72, target: 70 },
    { month: 'Apr', weight: 71, target: 70 },
    { month: 'May', weight: 70.5, target: 70 },
    { month: 'Jun', weight: 69.8, target: 70 }
  ];

  const workoutData = [
    { day: 'Mon', calories: 400, workouts: 2 },
    { day: 'Tue', calories: 300, workouts: 1 },
    { day: 'Wed', calories: 500, workouts: 3 },
    { day: 'Thu', calories: 450, workouts: 2 },
    { day: 'Fri', calories: 350, workouts: 1 },
    { day: 'Sat', calories: 600, workouts: 4 },
    { day: 'Sun', calories: 200, workouts: 1 }
  ];

  const bodyCompositionData = [
    { name: 'Muscle', value: 45, color: '#06B6D4' },
    { name: 'Fat', value: 18, color: '#F97316' },
    { name: 'Water', value: 32, color: '#3B82F6' },
    { name: 'Bone', value: 5, color: '#8B5CF6' }
  ];

  const progressStats = [
    { icon: '⚖️', label: 'Weight Lost', value: '5.2', unit: 'kg', change: '+2.1%', trend: 'up', color: 'bg-cyan-500' },
    { icon: '🔥', label: 'Calories Burned', value: '2,840', unit: 'kcal', change: '+15%', trend: 'up', color: 'bg-orange-500' },
    { icon: '💪', label: 'Muscle Gained', value: '2.8', unit: 'kg', change: '+8%', trend: 'up', color: 'bg-blue-500' },
    { icon: '📊', label: 'Body Fat', value: '18', unit: '%', change: '-3.2%', trend: 'down', color: 'bg-orange-400' }
  ];

  const recentWorkouts = [
    { date: '2024-06-19', exercise: 'Full Body Workout', duration: '45 min', calories: 520, intensity: 'High' },
    { date: '2024-06-18', exercise: 'Cardio Session', duration: '30 min', calories: 380, intensity: 'Medium' },
    { date: '2024-06-17', exercise: 'Strength Training', duration: '60 min', calories: 450, intensity: 'High' },
    { date: '2024-06-16', exercise: 'Yoga & Stretching', duration: '40 min', calories: 200, intensity: 'Low' },
    { date: '2024-06-15', exercise: 'HIIT Training', duration: '25 min', calories: 400, intensity: 'High' }
  ];

  const achievements = [
    { title: '30-Day Streak', description: 'Completed workouts for 30 consecutive days', date: '2024-06-15', icon: '🔥' },
    { title: 'Weight Goal Achieved', description: 'Reached target weight of 70kg', date: '2024-06-10', icon: '🎯' },
    { title: 'Personal Best', description: 'New record: 100 push-ups in one session', date: '2024-06-05', icon: '💪' }
  ];

  return (
    <div className="flex w-full min-h-screen py-6">
      {/* Main Content Area */}
      <div className="flex-[10] p-4 lg:p-6">
        <div className="space-y-6">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <div className="flex-1 mb-4 lg:mb-0">
                <h1 className="text-2xl lg:text-4xl font-bold mb-3">Track Your Progress Journey</h1>
                <p className="text-orange-100 max-w-md text-sm lg:text-base">
                  Monitor your fitness achievements, analyze trends, and celebrate milestones on your path to better health.
                </p>
              </div>
              <div className="w-full lg:w-48 h-32 lg:h-40 bg-orange-600 bg-opacity-30 rounded-xl flex items-center justify-center">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 w-48 h-full bg-orange-600 opacity-30 rounded-l-full transform translate-x-24"></div>
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {progressStats.map((stat, index) => (
              <div key={index} className={`${stat.color} rounded-2xl p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-xl">{stat.icon}</span>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-200' : 'text-red-200'}`}>
                    {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span>{stat.change}</span>
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value} <span className="text-lg font-normal">{stat.unit}</span></div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weight Progress Line Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Weight Progress</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: '8px' 
                    }} 
                  />
                  <Line type="monotone" dataKey="weight" stroke="#06B6D4" strokeWidth={3} dot={{ fill: '#06B6D4', strokeWidth: 2, r: 6 }} />
                  <Line type="monotone" dataKey="target" stroke="#F97316" strokeWidth={2} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Body Composition Pie Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Body Composition</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={bodyCompositionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {bodyCompositionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {bodyCompositionData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Workout Bar Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-sm lg:col-span-2">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Weekly Workout Activity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={workoutData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: '8px' 
                    }} 
                  />
                  <Bar dataKey="calories" fill="#F97316" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="workouts" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-sm text-gray-600">Calories Burned</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                  <span className="text-sm text-gray-600">Workouts Completed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Workouts Table */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Recent Workouts</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-2 font-medium text-gray-600">Date</th>
                    <th className="text-left py-4 px-2 font-medium text-gray-600">Exercise</th>
                    <th className="text-left py-4 px-2 font-medium text-gray-600">Duration</th>
                    <th className="text-left py-4 px-2 font-medium text-gray-600">Calories</th>
                    <th className="text-left py-4 px-2 font-medium text-gray-600">Intensity</th>
                  </tr>
                </thead>
                <tbody>
                  {recentWorkouts.map((workout, index) => (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-2 text-gray-600">{workout.date}</td>
                      <td className="py-4 px-2">
                        <div className="flex items-center gap-2">
                          <Activity size={16} className="text-cyan-500" />
                          <span className="font-medium text-gray-800">{workout.exercise}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-gray-600">{workout.duration}</td>
                      <td className="py-4 px-2">
                        <span className="text-orange-600 font-medium">{workout.calories}</span>
                      </td>
                      <td className="py-4 px-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          workout.intensity === 'High' ? 'bg-orange-100 text-orange-600' :
                          workout.intensity === 'Medium' ? 'bg-cyan-100 text-cyan-600' : 'bg-green-100 text-green-600'
                        }`}>
                          {workout.intensity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block flex-[3] bg-white border-l border-gray-200 p-6 h-full">
        <div className="space-y-6">
          {/* Achievements Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Recent Achievements</h3>
              <button className="text-orange-500 text-sm hover:text-orange-600 font-medium">View All →</button>
            </div>

            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">{achievement.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{achievement.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      <div className="flex items-center gap-1 text-xs text-orange-500">
                        <Calendar size={12} />
                        <span>{achievement.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-4 text-white">
            <div className="mb-3">
              <div className="text-sm font-medium mb-1">This Month's Summary</div>
              <div className="text-xs text-orange-100 mb-4">
                Great progress! You're on track to meet your goals.
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Workouts Completed</span>
                <span className="font-bold">24/30</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Calories Burned</span>
                <span className="font-bold">8,450</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Weight Progress</span>
                <span className="font-bold">-2.1kg</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-orange-400">
              <div className="flex items-center gap-2">
                <Target size={16} />
                <span className="text-sm">Goal Achievement: 80%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;