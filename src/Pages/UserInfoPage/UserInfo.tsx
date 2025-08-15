import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext';
import UserInfoHeader from '../../Components/ui/UserInfoHeader';
import ProfileCard from '../../Components/ui/ProfileCard';
import PersonalInformationSection from '../../Components/ui/PersonalInformationSection';
import FitnessInformationSection from '../../Components/ui/FitnessInformationSection';
import ProgressOverviewSection from '../../Components/ui/ProgressOverviewSection';
import type { ProfileData, PersonalData, FitnessData, ProgressStats, UserComprehensiveInfo } from '../../types/userInfo';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const UserInfo: React.FC = () => {
  const { user, isAuthenticated } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserComprehensiveInfo | null>(null);
  const [tempData, setTempData] = useState<ProfileData | null>(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserData();
    }
  }, [isAuthenticated, user]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/userDetails/comprehensive`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        setTempData(data.user);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(userData?.user || null);
  };

  const handleSave = async () => {
    if (!tempData) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/userDetails/update`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: tempData.username,
          phone_num: tempData.phone_num,
          dob: tempData.dob,
          country: tempData.country,
          height: tempData.height,
          weight: tempData.weight,
        }),
      });

      if (response.ok) {
        await fetchUserData(); // Refresh data
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  };

  const handleCancel = () => {
    setTempData(userData?.user || null);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    if (!tempData) return;
    
    let processedValue: any = value;
    
    // Handle different field types
    if (field === 'height' || field === 'weight') {
      processedValue = value ? Number(value) : undefined;
    } else if (field === 'dob') {
      processedValue = value ? new Date(value) : undefined;
    }

    setTempData(prev => ({
      ...prev!,
      [field]: processedValue
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading user information...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!userData || !tempData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <p className="text-gray-600">No user data available</p>
          </div>
        </div>
      </div>
    );
  }

  const personalData: PersonalData = {
    username: tempData.username,
    email: tempData.email,
    phone_num: tempData.phone_num,
    dob: tempData.dob,
    country: tempData.country,
  };

  const fitnessData: FitnessData = {
    weight: tempData.weight,
    height: tempData.height,
  };

  const profileCardData = {
    username: tempData.username,
    dob: tempData.dob,
    weight: tempData.weight,
    height: tempData.height,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <UserInfoHeader
          isEditing={isEditing}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card and Fitness Info */}
          <div className="lg:col-span-1 space-y-8">
            <ProfileCard
              profileData={profileCardData}
              isEditing={isEditing}
              onInputChange={handleInputChange}
            />

            <FitnessInformationSection
              data={fitnessData}
              isEditing={isEditing}
              onInputChange={handleInputChange}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <PersonalInformationSection
              data={personalData}
              isEditing={isEditing}
              onInputChange={handleInputChange}
            />

            <ProgressOverviewSection stats={userData.fitnessStats} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;