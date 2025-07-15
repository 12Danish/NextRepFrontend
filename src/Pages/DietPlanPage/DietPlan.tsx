import DietHero from "../../Components/ui/DietHero";
import FoodSchedule from "../../Components/ui/FoodSchedule";
import DietRightSidebar from "../../Components/ui/DietRightSidebar";
const DietPlan = () => {
    return (
    <div className="flex w-full min-h-screen bg-orange-50 py-6 ">
      {/* Main Content Area */}
      <div className="flex-[10]">
        <div className="p-4 lg:p-6 space-y-6 min-h-full">
          <DietHero />
          <FoodSchedule />
        </div>
      </div>
      <DietRightSidebar />
    </div>
  );
};

export default DietPlan;