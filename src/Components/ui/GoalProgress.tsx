import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface GoalProgress {
  goals: {
    workout: any[];
    diet: any[];
    sleep: any[];
  };
  progress: {
    workout: any[];
    diet: any[];
    sleep: any[];
  };
}

interface GoalProgressProps {
  data: GoalProgress | null;
}

export default function GoalProgress({ data }: GoalProgressProps) {
  if (!data) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Goal Progress</h3>
          <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-64 lg:h-80 bg-gray-100 rounded animate-pulse"></div>
      </div>
    );
  }

  // Process the data for the chart
  const processChartData = () => {
    const workoutData = data.progress.workout || [];
    const dietData = data.progress.diet || [];
    const sleepData = data.progress.sleep || [];

    // Get the last 7 days of data
    const last7Days = workoutData.slice(-7);
    
    return last7Days.map((day: any, index: number) => {
      const dietDay = dietData[index] || {};
      const sleepDay = sleepData[index] || {};
      
      return {
        day: day.date || `Day ${index + 1}`,
        Workout: day.totalCompletedMinutes ? Math.round((day.totalCompletedMinutes / 60) * 100) / 100 : 0,
        Calories: dietDay.totalCalories ? Math.round((dietDay.totalCalories / 2000) * 100) : 0, // Assuming 2000 cal goal
        Sleep: sleepDay.duration ? Math.round((sleepDay.duration / 8) * 100) : 0, // Assuming 8 hours goal
      };
    });
  };

  const chartData = processChartData();

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Goal Progress</h3>
        <select className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>
      
      {chartData.length > 0 ? (
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
              <Tooltip 
                formatter={(value: any, name: string) => [
                  name === 'Workout' ? `${value} hrs` : 
                  name === 'Calories' ? `${value}%` : 
                  `${value}%`, 
                  name
                ]}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
              <Bar 
                dataKey="Workout" 
                fill="#06B6D4" 
                radius={[2, 2, 0, 0]}
                name="Workout (hrs)"
              />
              <Bar 
                dataKey="Calories" 
                fill="#F97316" 
                radius={[2, 2, 0, 0]}
                name="Calories (%)"
              />
              <Bar 
                dataKey="Sleep" 
                fill="#8B5CF6" 
                radius={[2, 2, 0, 0]}
                name="Sleep (%)"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-64 lg:h-80 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <p>No progress data available yet</p>
            <p className="text-sm">Start tracking your activities to see progress here</p>
          </div>
        </div>
      )}
    </div>
  );
}
 