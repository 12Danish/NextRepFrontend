export default function FoodSchedule() {
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
    return (
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
    )
}