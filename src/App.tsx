import HomePage from "./Pages/HomePage/HomePage"
import MainLayout from "./Pages/MainLayout/MainLayout"
import Overview from "./Pages/OverviewPage/Overview";
import { Routes, Route } from "react-router-dom";
import Tracker from "./Pages/TrackerPage/Tracker";
import UserInfo from "./Pages/UserInfoPage/UserInfo";
import DietPlan from "./Pages/DietPlanPage/DietPlan";
import WorkoutPlan from "./Pages/WorkoutPlanPage/WorkoutPlan";
import FindGyms from "./Pages/FindGymsPage/FindGyms";
function App() {


  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={<MainLayout />}>
          <Route path="overview" element={<Overview />} />
          <Route path="tracker" element={<Tracker />} />
          <Route path="userInfo" element={<UserInfo />} />
          <Route path="dietPlan" element={<DietPlan />} />
          <Route path="workoutPlan" element={<WorkoutPlan />} />
          <Route path="findGyms" element={<FindGyms />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
