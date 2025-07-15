import FoodItem from './FoodItem';

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
              <FoodItem
                key={index}
                icon={item.icon}
                food={item.food}
                meal={item.meal}
                calories={item.calories}
                time={item.time}
                carbs={item.carbs}
                bgColor={item.bgColor}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}