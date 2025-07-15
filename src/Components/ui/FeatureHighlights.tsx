import FeatureCard from './FeatureCard'

export default function FeatureHighlights() {
    const features = [
        {
            title: "Smart Training",
            description: "AI-powered workouts tailored to your fitness level",
            icon: <div className="w-6 h-6 bg-white rounded-full"></div>,
            gradientFrom: "amber-300",
            gradientTo: "orange-400"
        },
        {
            title: "Progress Tracking",
            description: "Real-time analytics and performance insights",
            icon: (
                <>
                    <div className="w-3 h-6 bg-white rounded-full"></div>
                    <div className="w-3 h-4 bg-white rounded-full ml-1"></div>
                </>
            ),
            gradientFrom: "pink-300",
            gradientTo: "orange-400"
        },
        {
            title: "Nutrition Guide",
            description: "Personalized meal plans and dietary recommendations",
            icon: (
                <>
                    <div className="w-6 h-2 bg-white rounded-full"></div>
                    <div className="w-2 h-6 bg-white rounded-full ml-1"></div>
                </>
            ),
            gradientFrom: "orange-300",
            gradientTo: "amber-400"
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 sm:gap-8 py-6">
            {features.map((feature, index) => (
                <FeatureCard
                    key={index}
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                    gradientFrom={feature.gradientFrom}
                    gradientTo={feature.gradientTo}
                />
            ))}
        </div>
    )
}