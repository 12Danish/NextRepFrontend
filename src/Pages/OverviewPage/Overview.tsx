import Hero from '../../Components/ui/Hero';
import ActivityCards from '../../Components/ui/ActivitySection';
import GoalProgress from '../../Components/ui/GoalProgress';
import FoodLog from '../../Components/ui/FoodLog';
import RightSidebar from '../../Components/ui/RightSidebar';
const Overview = () => {
  return (
    
    <div className="flex w-full min-h-screen py-6">
      <div className="flex-[10] p-4 lg:p-6 ">
        <div className="space-y-6">
          <Hero />
          <ActivityCards />
          <GoalProgress />
          <FoodLog />
        </div>
      </div>
      <RightSidebar />
    </div>
  );
};

export default Overview;