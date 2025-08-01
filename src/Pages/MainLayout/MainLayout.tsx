import SidePanel from "./SidePanel"
import { Outlet } from "react-router-dom";
import Header from "./Header"
const MainLayout = () => {
    return (
        <div className="flex w-full h-screen overflow-hidden">
            <div className="hidden sm:block flex-1 border-r-2 border-gray-200">
                <SidePanel />
            </div>
            <div className="flex-[7] flex flex-col bg-gray-200 ">
                <div className="flex-1 bg-white ">
                    <Header />
                </div>
                <div className="flex-[10] overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MainLayout