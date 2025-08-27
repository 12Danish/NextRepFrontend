import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "./Button"
import { ScrollArea } from "./ScrollArea"
import { Sheet, SheetContent, SheetTrigger } from "./Sheet"
import { Menu } from "lucide-react"
import Logo from "./Logo"
import UserActions from "./UserActions"
import NavigationItem from "./NavigationItem"
import overviewIcon from './assets/overviewIcon.svg';
import workoutIcon from './assets/workoutIcon.svg';
import dietIcon from './assets/dietIcon.svg';
import scheduleIcon from './assets/scheduleIcon.svg';
import goalIcon from './assets/goalIcon.svg';
import progressIcon from './assets/progressIcon.svg';
import locateIcon from './assets/locateIcon.svg';
import aiHelperIcon from './assets/aiHelperIcon.svg';
import { useLocation } from "react-router-dom"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean
}

export function Sidebar({ className, isCollapsed }: SidebarProps) {

  const location = useLocation();
  const navigationItems = [
    { to: "/main/overview", icon: overviewIcon, label: "Overview" },
    { to: "/main/workoutPlan", icon: workoutIcon, label: "Workout Plan" },
    { to: "/main/dietPlan", icon: dietIcon, label: "Diet Plan", iconSize: "w-8 h-8" },
    { to: "/main/tracker", icon: scheduleIcon, label: "Tracker" },
    { to: "/main/goals", icon: goalIcon, label: "Goals" },
    { to: "/main/progress", icon: progressIcon, label: "Progress" },
    { to: "/main/findGyms", icon: locateIcon, label: "Nearby Gyms" },
    { to: "fitnessPal", icon: aiHelperIcon, label: "Fitness Pal" }
  ];

  return (
    <div className={cn("w-full h-screen flex flex-col justify-between", className)}>
      <div>
        {/* Logo section */}
        <Logo isCollapsed={isCollapsed} />

        {/* Navigation Menu */}
        <div className="flex w-full h-full overflow-y-auto flex-col">
          {navigationItems.map((item, index) => (
            <NavigationItem
              key={index}
              to={item.to}
              icon={item.icon}
              label={item.label}
              iconSize={item.iconSize}
              isCollapsed={isCollapsed}
              isActive={location.pathname == item.to}
            />
          ))}
        </div>
      </div>

      {/* User Actions */}
      <UserActions isCollapsed={isCollapsed} />
    </div>
  )
}

interface SidebarSheetProps {
  children: React.ReactNode
}

export function SidebarSheet({ children }: SidebarSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[280px]">
        {children}
      </SheetContent>
    </Sheet>
  )
}
