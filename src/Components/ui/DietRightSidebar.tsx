import DietWeekPlan from "./DietWeekPlan";
import DietNutritionSummary from "./DietNutritionSummary";

interface DietRightSidebarProps {
  existingMeals: { [key: string]: any[] };
}

export default function DietRightSidebar({ existingMeals }: DietRightSidebarProps) {
  return (
    <div className="hidden lg:block flex-[3] bg-white border-l border-gray-200 h-full">
      <div className="p-6 space-y-6">
        <DietWeekPlan existingMeals={existingMeals} />
        <DietNutritionSummary existingMeals={existingMeals} />
      </div>
    </div>
  );
}