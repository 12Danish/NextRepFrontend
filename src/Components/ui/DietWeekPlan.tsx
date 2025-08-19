import WeekPlanItem from './WeekPlanItem';

interface DietWeekPlanProps {
  existingMeals: { [key: string]: any[] };
}

export default function DietWeekPlan({ existingMeals }: DietWeekPlanProps) {
  // Get current week's meals
  const getCurrentWeekMeals = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start from Sunday
    
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weeklyMeals: any[] = [];
    
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + i);
      const dateKey = currentDate.toISOString().split('T')[0];
      
      const dayMeals = existingMeals[dateKey] || [];
      const dayName = weekDays[i];
      
      if (dayMeals.length > 0) {
        // Show first meal of the day
        const firstMeal = dayMeals[0];
        weeklyMeals.push({
          day: dayName,
          meal: firstMeal.foodName,
          time: new Date(firstMeal.mealDateAndTime).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }),
          mealType: firstMeal.meal,
          hasMultipleMeals: dayMeals.length > 1
        });
      } else {
        // No meals planned for this day
        weeklyMeals.push({
          day: dayName,
          meal: 'No meals planned',
          time: '--',
          mealType: null,
          hasMultipleMeals: false
        });
      }
    }
    
    return weeklyMeals;
  };

  const weeklySchedule = getCurrentWeekMeals();
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">This Week's Plan</h3>
        <button className="text-orange-500 text-sm hover:text-orange-600 font-medium">View All →</button>
      </div>
      
      {Object.keys(existingMeals).length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 text-sm mb-2">No meals planned this week</div>
          <div className="text-gray-300 text-xs">Start planning your meals to see them here</div>
        </div>
      ) : (
        <div className="space-y-4">
          {weeklySchedule.map((schedule, index) => (
            <WeekPlanItem
              key={index}
              day={schedule.day}
              meal={schedule.meal}
              time={schedule.time}
              mealType={schedule.mealType}
              hasMultipleMeals={schedule.hasMultipleMeals}
            />
          ))}
        </div>
      )}
    </div>
  );
}