import WeekPlanItem from './WeekPlanItem';

export default function DietWeekPlan() {
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
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Week Plan</h3>
            <button className="text-orange-500 text-sm hover:text-orange-600 font-medium">View All →</button>
          </div>
          <div className="space-y-4">
            {weeklySchedule.map((schedule, index) => (
              <WeekPlanItem
                key={index}
                day={schedule.day}
                meal={schedule.meal}
                time={schedule.time}
              />
            ))}
          </div>
        </div>
    )
}