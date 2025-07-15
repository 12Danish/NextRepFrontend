import MySchedule from "./MySchedule";
import Goals from "./Goals";
export default function RightSidebar() {
    return (
        <div className="hidden lg:block flex-[3] bg-white border-l border-gray-200 p-6 h-full ">
        <div className="space-y-6">
          <MySchedule />
          <Goals />

          {/* Premium Membership Card */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
            <div className="mb-3">
              <div className="text-sm font-medium mb-1">50% off on Premium Membership</div>
              <div className="text-xs text-purple-100">
                Join today and enjoy health and fitness experience like never before.
              </div>
            </div>
            <button className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              Upgrade
            </button>
          </div>
        </div>
      </div>
    )
}