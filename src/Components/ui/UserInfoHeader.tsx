import React from 'react';
import { Edit3, Save, X } from 'lucide-react';

interface UserInfoHeaderProps {
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

const UserInfoHeader: React.FC<UserInfoHeaderProps> = ({
  isEditing,
  onEdit,
  onSave,
  onCancel
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">User Profile</h1>
          <p className="text-gray-600">Manage your fitness journey details</p>
        </div>
        <div className="flex gap-3">
          {!isEditing ? (
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <Edit3 size={18} />
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={onSave}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Save size={18} />
                Save
              </button>
              <button
                onClick={onCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfoHeader; 