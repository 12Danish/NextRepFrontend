import { useUser } from '../../contexts/UserContext';

export default function Hero() {
    const { user } = useUser();
    
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    const getTodayDate = () => {
        return new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">
                {getGreeting()}, {user?.username || 'User'}! 
              </h2>
              <p className="text-orange-100 max-w-md mb-2">
                {getTodayDate()}
              </p>
              <p className="text-orange-100 max-w-md">
                Track your progress and stay on top of your fitness goals today.
              </p>
            </div>
            <div className="absolute right-0 top-0 w-48 h-full bg-orange-600 opacity-30 rounded-l-full transform translate-x-24"></div>
        </div>
    )
}