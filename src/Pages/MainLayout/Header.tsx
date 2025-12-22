import WelcomeMessage from "../../Components/ui/WelcomeMessage";
import { Button } from "../../Components/ui/Button";
import { ThemeToggle } from "../../components/ui/ThemeToggle";
import { Menu, PanelLeftClose } from "lucide-react";

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarCollapsed?: boolean;
}

const Header = ({ onToggleSidebar, isSidebarCollapsed = false }: HeaderProps) => {
  return (
    <div className="flex justify-between px-8 py-4 items-center bg-background/50 backdrop-blur-sm border-b border-border">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="h-8 w-8 cursor-pointer"
          title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isSidebarCollapsed ? <Menu className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
        </Button>
        <WelcomeMessage />
      </div>
      
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
