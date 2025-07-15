import NavigationItem from './NavigationItem';
import overviewIcon from './assets/overviewIcon.svg';
import workoutIcon from './assets/workoutIcon.svg';
import dietIcon from './assets/dietIcon.svg';
import scheduleIcon from './assets/scheduleIcon.svg';
import goalIcon from './assets/goalIcon.svg';
import progressIcon from './assets/progressIcon.svg';
import locateIcon from './assets/locateIcon.svg';
import aiHelperIcon from './assets/aiHelperIcon.svg';

const NavigationMenu = () => {
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
    <div className="flex flex-col">
      <div className="flex w-full h-full overflow-y-auto flex-col">
        {navigationItems.map((item, index) => (
          <NavigationItem
            key={index}
            to={item.to}
            icon={item.icon}
            label={item.label}
            iconSize={item.iconSize}
          />
        ))}
      </div>
    </div>
  );
};

export default NavigationMenu; 