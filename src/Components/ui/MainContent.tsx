import { Link, useNavigate } from "react-router-dom"
import GetStarted from "../../Components/ui/GetStarted"
import FeatureHighlights from "../../Components/ui/FeatureHighlights"
import { useUser } from '../../contexts/UserContext';

export default function MainContent() {
    const { user } = useUser();
    const navigate = useNavigate();
    
    const handleGetStarted = () => {
        if (!user) {
            navigate('/signin');
        } else {
            navigate('/main/overview');
        }
    }

    return (
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
                                    <GetStarted onClick={handleGetStarted} />
                                    <p className="text-white/70 text-sm">
                                        Join thousands of users already transforming their fitness
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    )
}