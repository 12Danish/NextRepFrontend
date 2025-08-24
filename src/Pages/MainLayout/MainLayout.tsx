import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Sidebar } from "../../Components/ui/Sidebar";

const MainLayout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="flex w-full h-screen overflow-hidden">
            <div 
                className={`hidden sm:block border-r-2 border-gray-200 transition-all duration-300 ${
                    isSidebarCollapsed ? 'w-16' : 'w-72'
                }`}
                style={{ 
                    width: isSidebarCollapsed ? '64px' : '240px',
                    minWidth: isSidebarCollapsed ? '64px' : '240px'
                }}
            >
                <Sidebar 
                    isCollapsed={isSidebarCollapsed}
                />
            </div>
            <div className="flex-[7] flex flex-col bg-gray-200">
                <div className="flex-1 bg-white">
                    <Header onToggleSidebar={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />
                </div>
                <div className="flex-[10] overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;