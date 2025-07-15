import Search from "../../Components/ui/Search";
import WelcomeMessage from "../../Components/ui/WelcomeMessage";

const Header = () => {
  return (
    <div className="flex justify-between px-8 py-4 items-center">
      <WelcomeMessage />
      <div className="flex-6 flex items-center justify-end">
        <Search />
      </div>
    </div>
  );
};

export default Header
