import BackgroudElements from "../../Components/ui/BackgroudElements"
import MainContent from "../../Components/ui/MainContent"

const HomePage = () => {
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