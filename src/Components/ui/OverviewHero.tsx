export default function Hero() {
    return (
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">Track Your Daily Activities</h2>
              <p className="text-orange-100 max-w-md">
                Monitor your workouts, nutrition, and progress all in one place. 
              </p>
            </div>
            <div className="absolute right-0 top-0 w-48 h-full bg-orange-600 opacity-30 rounded-l-full transform translate-x-24"></div>
        </div>
    )
}