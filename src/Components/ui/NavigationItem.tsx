import { Link } from "react-router-dom";

interface NavigationItemProps {
  to: string;
  icon: string;
  label: string;
  iconSize?: string;
  isCollapsed?: boolean;
  isActive?: boolean;
}

const NavigationItem = ({ to, icon, label, iconSize = "w-6 h-6", isCollapsed = false, isActive = false}: NavigationItemProps) => {
  return (
    <Link to={to}>
      <span className={`cursor-pointer font-semibold border-b border-b-gray-200 px-4 py-4 text-center flex items-center ${
        isCollapsed ? 'justify-center' : 'justify-start'
      } ${
        isActive 
          ? 'bg-orange-400 text-white' 
          : 'text-gray-400 hover:bg-orange-400 hover:text-white'
      }`}>
        <img src={icon} className={`${iconSize} ${isCollapsed ? '' : 'mr-2'}`} alt={label} />
        {!isCollapsed && label}
      </span>
    </Link>
  );
};

export default NavigationItem; 