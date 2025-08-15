import { Link, useNavigate } from "react-router-dom";
import personIcon from './assets/personIcon.svg';
import logoutIcon from './assets/logoutIcon.svg';
import { useUser } from '../../contexts/UserContext';

const UserActions = () => {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col">
      <Link to="/main/userInfo">
        <span className="hover:bg-orange-400 hover:text-white cursor-pointer text-gray-400 font-semibold border-b-1 border-b-gray-200 px-4 py-4 text-center flex">
          <img src={personIcon} className="w-6 h-6 mr-2" alt="My Info" />
          My Info
        </span>
      </Link>
      <span 
        onClick={handleLogout}
        className="hover:bg-orange-400 hover:text-white cursor-pointer text-gray-400 font-semibold border-b-1 border-b-gray-200 px-4 py-4 text-center flex"
      >
        <img src={logoutIcon} className="w-6 h-6 mr-2" alt="Logout" />
        Logout
      </span>
    </div>
  );
};

export default UserActions; 