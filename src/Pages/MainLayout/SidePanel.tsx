import Logo from "../../Components/ui/Logo";
import NavigationMenu from "../../Components/ui/NavigationMenu";
import UserActions from "../../Components/ui/UserActions";

const SidePanel = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-between">
      <div>
        {/* Logo section */}
        <Logo />

        {/* Navigation Menu */}
        <NavigationMenu />
      </div>

      {/* User Actions */}
      <UserActions />
    </div>
  );
};

export default SidePanel
