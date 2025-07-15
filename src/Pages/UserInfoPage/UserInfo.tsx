import React, { useState } from 'react';
import UserInfoHeader from '../../Components/ui/UserInfoHeader';
import ProfileCard from '../../Components/ui/ProfileCard';
import PersonalInformationSection from '../../Components/ui/PersonalInformationSection';
import FitnessInformationSection from '../../Components/ui/FitnessInformationSection';
import ProgressOverviewSection from '../../Components/ui/ProgressOverviewSection';
import type { ProfileData, PersonalData, FitnessData, ProgressStats } from '../../types/userInfo';

const UserInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    country: 'United States',
    city: 'San Francisco',
    dateOfBirth: '1990-05-15',
    weight: '70',
    height: '175',
    fitnessGoal: 'Build Muscle',
    activityLevel: 'Moderate',
    profilePic: '/api/placeholder/150/150'
  });

  const [tempData, setTempData] = useState<ProfileData>(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(profileData);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const personalData: PersonalData = {
    name: tempData.name,
    email: tempData.email,
    phone: tempData.phone,
    dateOfBirth: tempData.dateOfBirth,
    country: tempData.country,
    city: tempData.city
  };

  const fitnessData: FitnessData = {
    weight: tempData.weight,
    height: tempData.height,
    fitnessGoal: tempData.fitnessGoal,
    activityLevel: tempData.activityLevel
  };

  const profileCardData = {
    name: tempData.name,
    dateOfBirth: tempData.dateOfBirth,
    weight: tempData.weight,
    height: tempData.height,
    activityLevel: tempData.activityLevel
  };

  const progressStats: ProgressStats = {
    workouts: 24,
    goals: '8/10',
    streak: 7
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
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <ProfileCard
              profileData={profileCardData}
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

            <FitnessInformationSection
              data={fitnessData}
              isEditing={isEditing}
              onInputChange={handleInputChange}
            />

            <ProgressOverviewSection stats={progressStats} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;