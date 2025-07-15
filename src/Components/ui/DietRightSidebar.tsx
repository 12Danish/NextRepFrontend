import DietWeekPlan from "./DietWeekPlan";
export default function DietRightSidebar() {
  return (
    <div className="hidden lg:block flex-[3] bg-white border-l border-gray-200 h-full">
      <div className="p-6 space-y-6">
        <DietWeekPlan />
      </div>
    </div>
  );
}