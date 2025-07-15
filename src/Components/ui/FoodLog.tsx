
export default function FoodLog() {

  const foodData = [
    { food: 'Burrito', meal: 'Pizza Burger', calories: 'Receiving', priorities: '01:00 AM', carbs: '20 gm' },
    { food: 'Burger', meal: 'Pizza Burger', calories: 'Receiving', priorities: '01:00 AM', carbs: '20 gm' }
  ];

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Food</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Meal</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Calories</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Priorities</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Carbs</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {foodData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <span className="text-orange-600 text-sm">🌯</span>
                          </div>
                          <span className="text-gray-900 font-medium">{item.food}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{item.meal}</td>
                      <td className="px-6 py-4 text-gray-600">{item.calories}</td>
                      <td className="px-6 py-4 text-gray-600">{item.priorities}</td>
                      <td className="px-6 py-4 text-gray-600">{item.carbs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
    )
}