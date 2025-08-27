import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface DailyProgressChartProps {
  data: {
    workout: any[];
    diet: any[];
    sleep: any[];
  } | null;
  viewType?: 'week' | 'month';
  onViewTypeChange?: (viewType: 'week' | 'month') => void;
}

const DailyProgressChart: React.FC<DailyProgressChartProps> = ({ 
  data, 
  viewType = 'week',
  onViewTypeChange 
}) => {
  if (!data) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="h-64 lg:h-80 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <div className="text-4xl mb-2">📊</div>
            <p>No progress data available yet</p>
            <p className="text-sm">Start tracking your activities to see progress here</p>
          </div>
        </div>
      </div>
    );
  }

  // Process the data for the chart
  const processChartData = () => {
    const workoutData = data.workout || [];
    const dietData = data.diet || [];
    const sleepData = data.sleep || [];

    // Get the last 7 days or month of data
    const dataToShow = viewType === 'week' ? workoutData.slice(-7) : workoutData.slice(-30);
    
    return dataToShow.map((day: any, index: number) => {
      // Find corresponding diet and sleep data for the same date
      const dietDay = dietData.find((d: any) => d.date === day.date) || {};
      const sleepDay = sleepData.find((s: any) => s.date === day.date) || {};
      
      // Calculate workout percentage based on actual vs scheduled duration
      let workoutPercentage = 0;
      if (day.scheduled?.totalDuration && day.actual?.totalDuration !== null) {
        // If there's actual data, calculate adherence
        workoutPercentage = day.actual.totalDuration > 0 
          ? Math.min(Math.round((day.actual.totalDuration / day.scheduled.totalDuration) * 100), 100)
          : 0;
      } else if (day.scheduled?.totalDuration > 0) {
        // If no actual data but scheduled exists, show 0% (not completed)
        workoutPercentage = 0;
      }
      
      // Calculate diet percentage based on actual vs scheduled calories
      let caloriesPercentage = 0;
      if (dietDay.scheduled?.calories && dietDay.actual?.calories !== null) {
        // If there's actual data, calculate adherence
        caloriesPercentage = dietDay.actual.calories > 0 
          ? Math.min(Math.round((dietDay.actual.calories / dietDay.scheduled.calories) * 100), 100)
          : 0;
      } else if (dietDay.scheduled?.calories > 0) {
        // If no actual data but scheduled exists, show 0% (not completed)
        caloriesPercentage = 0;
      }
      
      // Calculate sleep percentage based on actual vs target hours
      let sleepPercentage = 0;
      if (sleepDay.currentHours && sleepDay.targetHours) {
        // Calculate sleep progress as percentage of target
        sleepPercentage = Math.min(Math.round((sleepDay.currentHours / sleepDay.targetHours) * 100), 100);
      }
      return {
        day: day.date || `Day ${index + 1}`,
        Workout: workoutPercentage,
        Calories: caloriesPercentage,
        Sleep: sleepPercentage,
      };
    });
  };

  const chartData = processChartData();

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Daily Progress Overview</h3>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">View:</span>
          <select 
            className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={viewType}
            onChange={(e) => onViewTypeChange?.(e.target.value as 'week' | 'month')}
          >
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
          </select>
        </div>
      </div>
      
      {chartData.length > 0 ? (
        <div className="h-64 lg:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
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
                domain={[0, 100]}
              />
              <Tooltip 
                formatter={(value: any, name: string) => [
                  `${value}%`, 
                  name
                ]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="circle"
              />
              <Bar 
                dataKey="Workout" 
                fill="#06B6D4" 
                radius={[2, 2, 0, 0]}
                name="Workout (%)"
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
};

export default DailyProgressChart;
