import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts';

export default function GoalProgress() {
  const chartData = [
    { day: 'Mon', Workout: 80, Calories: 60, Steps: 90 },
    { day: 'Tue', Workout: 65, Calories: 45, Steps: 75 },
    { day: 'Wed', Workout: 90, Calories: 80, Steps: 85 },
    { day: 'Thu', Workout: 70, Calories: 90, Steps: 95 },
    { day: 'Fri', Workout: 85, Calories: 70, Steps: 80 },
    { day: 'Sat', Workout: 95, Calories: 85, Steps: 100 },
    { day: 'Sun', Workout: 60, Calories: 55, Steps: 70 }
  ];
    return (
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

    )
}