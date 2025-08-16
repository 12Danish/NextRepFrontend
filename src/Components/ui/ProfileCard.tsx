import { Camera } from 'lucide-react';
import ProfileStats from './ProfileStats';
import type { ProfileCardData } from '../../types/userInfo';

interface ProfileCardProps {
  profileData: ProfileCardData;
  isEditing: boolean;
  onInputChange: (field: string, value: string) => void;
}

const InitialsAvatar: React.FC<{ username?: string }> = ({ username }) => {
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const initials = getInitials(username);

  return (
    <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-orange-500 text-4xl font-bold">
      {initials}
    </div>
  );
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  profileData,
  isEditing,
  onInputChange
}) => {


  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-6 text-white">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <InitialsAvatar username={profileData.username} />
            {isEditing && (
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors">
                <Camera size={18} />
              </button>
            )}
          </div>
          <h2 className="text-2xl font-bold mb-1">
            {isEditing ? (
              <input
                type="text"
                value={profileData.username || ''}
                onChange={(e) => onInputChange('username', e.target.value)}
                className="bg-white bg-opacity-20 text-white placeholder-orange-200 border-0 rounded-lg px-3 py-1 text-center text-2xl font-bold"
                placeholder="Username"
              />
            ) : (
              profileData.username || 'User'
            )}
          </h2>
          <p className="text-orange-100 text-center">Fitness Enthusiast</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-6">
        <ProfileStats
          dateOfBirth={profileData.dob}
          weight={profileData.weight}
          height={profileData.height}
          className="mb-6"
        />
      </div>
    </div>
  );
};

export default ProfileCard; 