import MySchedule from "./MySchedule";
import Goals from "./Goals";
import TodaySchedule from "./TodaySchedule";

interface TodaySchedule {
  workouts: any[];
  meals: any[];
  sleep: any;
}

interface GoalProgress {
  goals: {
    workout: any[];
    diet: any[];
    sleep: any[];
  };
  progress: {
    workout: any[];
    diet: any[];
    sleep: any[];
  };
}

interface RightSidebarProps {
  data: TodaySchedule | null;
  goalData: GoalProgress | null;
}

export default function RightSidebar({ data, goalData }: RightSidebarProps) {
    return (
        <div className="hidden lg:block flex-[3] bg-white border-l border-gray-200 p-6 h-full ">
        <div className="space-y-6">
          <TodaySchedule data={data} />
          <MySchedule goalData={goalData} />
          <Goals goalData={goalData} />
        </div>
      </div>
    )
}