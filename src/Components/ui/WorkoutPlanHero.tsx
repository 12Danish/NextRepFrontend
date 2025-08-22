export default function WorkoutPlanHero() {
  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
        <div className="flex-1 mb-4 lg:mb-0">
          <h1 className="text-2xl lg:text-4xl font-bold mb-3">Start Your Workout From Today</h1>
          <p className="text-orange-100 max-w-md text-sm lg:text-base">
            Create personalized workout routines tailored to your fitness level and goals. 
          </p>
        </div>
        <div className="w-full lg:w-48 h-32 lg:h-40 bg-orange-600 bg-opacity-30 rounded-xl flex items-center justify-center">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-2xl">🏃‍♀️</span>
          </div>
        </div>
      </div>
    </div>
  );
} 