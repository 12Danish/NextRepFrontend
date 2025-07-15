export default function BackgroudElements() {
    return (
        <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full blur-2xl opacity-20 animate-pulse bg-red-500"></div>
        <div className="absolute bottom-32 right-24 w-32 h-32 bg-pink-400 rounded-full blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 bg-yellow-500 rounded-full blur-lg opacity-25 animate-pulse delay-500"></div>
        <div className="absolute top-60 right-20 w-1 h-32 bg-gradient-to-b from-orange-400 to-transparent opacity-30 animate-pulse delay-300"></div>
        <div className="absolute bottom-60 left-32 w-1 h-40 bg-gradient-to-t from-pink-400 to-transparent opacity-25 animate-pulse delay-800"></div>
    </div>
    )
}