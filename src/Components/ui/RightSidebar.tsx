import MySchedule from "./MySchedule";
import Goals from "./Goals";
import PremiumMembership from "./PremiumMembership";
export default function RightSidebar() {
    return (
        <div className="hidden lg:block flex-[3] bg-white border-l border-gray-200 p-6 h-full ">
        <div className="space-y-6">
          <MySchedule />
          <Goals />
          <PremiumMembership />
        </div>
      </div>
    )
}