import { Link, useNavigate } from "react-router-dom";
import personIcon from './assets/personIcon.svg';
import logoutIcon from './assets/logoutIcon.svg';
import { useUser } from '../../contexts/UserContext';
import { useChatStore } from "../../chatState";
import { disconnectSocket } from "../../socketServices/handleConnectionDisconnection";
interface UserActionsProps {
  isCollapsed?: boolean;
}

const UserActions = ({ isCollapsed = false }: UserActionsProps) => {
  const { clearChat } = useChatStore()
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    disconnectSocket()
    await logout();
    navigate('/');
    clearChat()

  };

  return (
    <div className="flex flex-col">
      <Link to="/main/userInfo">
        <span className={`hover:bg-orange-400 hover:text-white cursor-pointer text-gray-400 font-semibold border-b-1 border-b-gray-200 px-4 py-4 text-center flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'
          }`}>
          <img src={personIcon} className={`w-6 h-6 ${isCollapsed ? '' : 'mr-2'}`} alt="My Info" />
          {!isCollapsed && "My Info"}
        </span>
      </Link>
      <span
        onClick={handleLogout}
        className={`hover:bg-orange-400 hover:text-white cursor-pointer text-gray-400 font-semibold border-b-1 border-b-gray-200 px-4 py-4 text-center flex items-center ${isCollapsed ? 'justify-center' : 'justify-start'
          }`}
      >
        <img src={logoutIcon} className={`w-6 h-6 ${isCollapsed ? '' : 'mr-2'}`} alt="Logout" />
        {!isCollapsed && "Logout"}
      </span>
    </div>
  );
};

export default UserActions; 