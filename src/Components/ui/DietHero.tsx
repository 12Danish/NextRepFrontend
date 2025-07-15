export default function WorkoutHero() {
    return (
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <div className="flex-1 mb-4 lg:mb-0">
                <h1 className="text-2xl lg:text-4xl font-bold mb-3">Plan Your Diet Plan This Week</h1>
                <p className="text-orange-100 max-w-md text-sm lg:text-base">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam.
                </p>
              </div>
              <div className="w-full lg:w-48 h-32 lg:h-40 bg-orange-600 bg-opacity-30 rounded-xl flex items-center justify-center">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🍽️</span>
                </div>
              </div>
            </div>
          </div>
    )
}