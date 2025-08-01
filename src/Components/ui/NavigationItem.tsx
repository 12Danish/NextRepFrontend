import { Link } from "react-router-dom";

interface NavigationItemProps {
  to: string;
  icon: string;
  label: string;
  iconSize?: string;
}

const NavigationItem = ({ to, icon, label, iconSize = "w-6 h-6" }: NavigationItemProps) => {
  return (
    <Link to={to}>
      <span className="hover:bg-orange-400 hover:text-white cursor-pointer text-gray-400 font-semibold border-b border-b-gray-200 px-4 py-4 text-center flex items-center">
        <img src={icon} className={`${iconSize} mr-2`} alt={label} />
        {label}
      </span>
    </Link>
  );
};

export default NavigationItem; 