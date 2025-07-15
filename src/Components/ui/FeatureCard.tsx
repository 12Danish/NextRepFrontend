interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    gradientFrom: string;
    gradientTo: string;
}

export default function FeatureCard({ title, description, icon, gradientFrom, gradientTo }: FeatureCardProps) {
    return (
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className={`w-12 h-12 bg-gradient-to-br from-${gradientFrom} to-${gradientTo} rounded-xl mb-4 mx-auto flex items-center justify-center`}>
                {icon}
            </div>
            <h3 className="text-white font-bold text-md sm:text-lg sm:mb-2 mb-1">{title}</h3>
            <p className="text-white/80 text-xs sm:text-sm">{description}</p>
        </div>
    )
} 