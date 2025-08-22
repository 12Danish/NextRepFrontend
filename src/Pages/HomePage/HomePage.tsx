import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import BackgroudElements from "../../Components/ui/BackgroudElements"
import MainContent from "../../Components/ui/MainContent"

const HomePage = () => {
    const { user, isAuthenticated, loading } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && user && !loading) {
            // Check if user has completed profile details
            const isNewUser = !user.phone_num || !user.dob || !user.country || !user.height || !user.weight;
            
            if (isNewUser) {
                navigate('/details');
            } else {
                navigate('/main/overview');
            }
        }
    }, [isAuthenticated, user, loading, navigate]);

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div className="bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 w-full h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 w-full h-screen overflow-hidden relative">
            <BackgroudElements />
            <div className="flex justify-center items-center h-screen relative z-10 ">
                <MainContent />
            </div>
        </div>
    )
}
export default HomePage