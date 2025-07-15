export default function GetStarted() {
    return (
        <button className="group relative bg-white text-orange-600 font-bold px-10 py-3 rounded-full hover:bg-gradient-to-r hover:from-white hover:to-orange-50 transition-all duration-300 shadow-xl hover:shadow-2xl border-2 border-white/50 hover:scale-105 text-lg cursor-pointer">
                <span className="relative z-10">Get Started Today</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-pink-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </button>
    )
}