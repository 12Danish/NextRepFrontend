import dietIcon from "./assets/dietIcon.svg"
import goalIcon from "./assets/goalIcon.svg"
import progressIcon from "./assets/progressIcon.svg"
import scheduleIcon from "./assets/scheduleIcon.svg"
import workoutIcon from "./assets/workoutIcon.svg"
import overviewIcon from './assets/overviewIcon.svg';
import aiHelperIcon from "./assets/aiHelperIcon.svg"
import logoutIcon from "./assets/logoutIcon.svg";
import personIcon from "./assets/personIcon.svg"
import locateIcon from "./assets/locateIcon.svg"
const SidePanel = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-between">
            <div>
                {/*Logo section */}
                <div className="bg-gradient-to-br from-orange-400/80 via-orange-500/80 to-pink-500/80 backdrop-blur-sm p-4 text-center items-center">
                    <h1 className="text-white font-black text-4xl tracking-tighter leading-none text-center">
                        Next<span className="text-amber-200">Rep</span>
                    </h1>
                </div>

                {/* Different options */}
                <div className="flex flex-col">
                    <span className="hover:bg-orange-400 hover:text-white cursor-pointer text-gray-400 font-semibold border-b-1 border-b-gray-200 px-4 py-4 text-center flex "> <img src={overviewIcon} className="w-6 h-6 mr-2" />Overview</span>
                    <span className="hover:bg-orange-400 hover:text-white cursor-pointer text-gray-400 font-semibold border-b-1 border-b-gray-200 px-4 py-4 text-center flex  "> <img src={workoutIcon} className="w-6 h-6 mr-2" />Workout Plan</span>
                    <span className="hover:bg-orange-400 hover:text-white cursor-pointer text-gray-400 font-semibold border-b-1 border-b-gray-200 px-4 py-4 text-center flex "> <img src={dietIcon} className="w-8 h-8 mr-2" />Diet Plan</span>
                    <span className="hover:bg-orange-400 hover:text-white cursor-pointer text-gray-400 font-semibold border-b-1 border-b-gray-200 px-4 py-4 text-center flex "> <img src={scheduleIcon} className="w-6 h-6 mr-2" />Tracker</span>
                    <span className="hover:bg-orange-400 hover:text-white cursor-pointer text-gray-400 font-semibold border-b-1 border-b-gray-200 px-4 py-4 text-center flex "><img src={goalIcon} className="w-6 h-6 mr-2" />Goals</span>
                    <span className="hover:bg-orange-400 hover:text-white cursor-pointer text-gray-400 font-semibold border-b-1 border-b-gray-200 px-4 py-4 text-center flex "><img src={progressIcon} className="w-6 h-6 mr-2" />Progress</span>
                    <span className="hover:bg-orange-400 hover:text-white cursor-pointer text-gray-400 font-semibold border-b-1 border-b-gray-200 px-4 py-4 text-center flex "><img src={locateIcon} className="w-6 h-6 mr-2" />Nearby Gyms</span>
                    <span className="hover:bg-orange-400 hover:text-white cursor-pointer text-gray-400 font-semibold border-b-1 border-b-gray-200 px-4 py-4 text-center flex "><img src={aiHelperIcon} className="w-6 h-6 mr-2" />Fitness Pal</span>
                </div>
            </div>

            <div className="flex flex-col">
                <span className="hover:bg-orange-400 hover:text-white cursor-pointer text-gray-400 font-semibold border-b-1 border-b-gray-200 px-4 py-4 text-center flex "> <img src={personIcon} className="w-6 h-6 mr-2" />My Info</span>
                <span className="hover:bg-orange-400 hover:text-white cursor-pointer text-gray-400 font-semibold border-b-1 border-b-gray-200 px-4 py-4 text-center flex "> <img src={logoutIcon} className="w-6 h-6 mr-2" />Logout</span>

            </div>
            { }

        </div>
    )
}

export default SidePanel
