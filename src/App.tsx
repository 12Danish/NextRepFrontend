import HomePage from "./Pages/HomePage/HomePage"
import MainLayout from "./Pages/MainLayout/MainLayout"
import Overview from "./Pages/OverviewPage/Overview";
import { Routes, Route } from "react-router-dom";
import Tracker from "./Pages/TrackerPage/Tracker";
import UserInfo from "./Pages/UserInfoPage/UserInfo";
import DietPlan from "./Pages/DietPlanPage/DietPlan";
import WorkoutPlan from "./Pages/WorkoutPlanPage/WorkoutPlan";
import FindGyms from "./Pages/FindGymsPage/FindGyms";
import Goals from "./Pages/GoalsPage/Goals";
import FitnessPal from "./Pages/FitnessPalPage/FitnessPal";
import Progress from "./Pages/ProgressPage/Progress";
import SigninPage from "./Pages/SigninPage/SigninPage";
import DetailsPage from "./Pages/DetailsPage/DetailsPage";
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
          <Route path="goals" element={<Goals />} />
          <Route path="fitnessPal" element={<FitnessPal />} />
          <Route path="progress" element={<Progress />} />
        </Route>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/details" element={<DetailsPage />} />
      </Routes>
    </div>
  )
}

export default App
