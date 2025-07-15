import { Link } from "react-router-dom"
import GetStarted from "../../Components/ui/GetStarted"
import FeatureHighlights from "../../Components/ui/FeatureHighlights"

const HomePage = () => {
    return (
        <div className="bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 w-full h-screen overflow-hidden relative">
            {/* Advanced background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating geometric shapes */}
                <div className="absolute top-20 left-20 w-40 h-40 rounded-full blur-2xl opacity-20 animate-pulse bg-red-500"></div>
                <div className="absolute bottom-32 right-24 w-32 h-32 bg-pink-400 rounded-full blur-xl opacity-30 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-10 w-24 h-24 bg-yellow-500 rounded-full blur-lg opacity-25 animate-pulse delay-500"></div>

                {/* Abstract lines */}
                <div className="absolute top-60 right-20 w-1 h-32 bg-gradient-to-b from-orange-400 to-transparent opacity-30 animate-pulse delay-300"></div>
                <div className="absolute bottom-60 left-32 w-1 h-40 bg-gradient-to-t from-pink-400 to-transparent opacity-25 animate-pulse delay-800"></div>
            </div>

            <div className="flex justify-center items-center h-screen relative z-10 ">
                {/* Main content - centered */}
                <div className="flex items-center justify-center h-full w-full max-w-6xl p-8 ">
                    <div className="w-full h-full rounded-3xl bg-white/15 backdrop-blur-xl flex shadow-2xl border border-white/20 overflow-hidden relative">
                        {/* Glassmorphism overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/80 via-orange-500/80 to-pink-500/80 backdrop-blur-sm "></div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col justify-center items-center text-center w-full ">
                            <div className="lg:space-y-4 sm:space-y-8 space-y-2 max-w-4xl  ">
                                {/* Main heading */}
                                <div className="sm:space-y-4  space-y-2 ">
                                    <h1 className="text-white font-black text-4xl lg:text-8xl xl:text-9xl tracking-tighter leading-none mt-4">
                                        Next<span className="text-amber-200">Rep</span>
                                    </h1>
                                    <p className="text-white/90 text-sm sm:text-md lg:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
                                        Transform your fitness journey with AI-powered personal training that adapts to your goals
                                    </p>
                                </div>

                                {/* Feature highlights */}
                                <FeatureHighlights />

                                {/* CTA Section */}
                                <div className="gap-1 flex flex-col items-center justify-center">
                                    <Link to="/main/overview">
                                        <GetStarted />
                                    </Link>
                                    <p className="text-white/70 text-sm">
                                        Join thousands of users already transforming their fitness
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage