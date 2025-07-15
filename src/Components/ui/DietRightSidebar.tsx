export default function DietRightSidebar() {
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
        <div className="hidden lg:block flex-[3] bg-white border-l border-gray-200 h-full">
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
    )
}