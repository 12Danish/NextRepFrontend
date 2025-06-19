import React, { useState } from 'react';
import {
  User,
  Mail,
  MapPin,
  Phone,
  Calendar,
  Weight,
  Ruler,
  Target,
  Activity,
  Edit3,
  Save,
  X,
  Camera,
  Dumbbell,
  Settings,
  Award,
  TrendingUp,
  Heart
} from 'lucide-react';

const UserInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
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

  const [tempData, setTempData] = useState(profileData);

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

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const calculateBMI = (weight: string, height: string) => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // Convert cm to m
    if (w && h) {
      return (w / (h * h)).toFixed(1);
    }
    return '0';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">User Profile</h1>
              <p className="text-gray-600">Manage your fitness journey details</p>
            </div>
            <div className="flex gap-3">
              {!isEditing ? (
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Edit3 size={18} />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Save size={18} />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-6 text-white">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center overflow-hidden">
                      <User size={60} className="text-white" />
                    </div>
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
                        value={tempData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="bg-white bg-opacity-20 text-white placeholder-orange-200 border-0 rounded-lg px-3 py-1 text-center text-2xl font-bold"
                        placeholder="Full Name"
                      />
                    ) : (
                      profileData.name
                    )}
                  </h2>
                  <p className="text-orange-100 text-center">Fitness Enthusiast</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-orange-50 rounded-xl">
                    <div className="text-2xl font-bold text-orange-600">{calculateAge(profileData.dateOfBirth)}</div>
                    <div className="text-sm text-gray-600">Years Old</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-600">{calculateBMI(profileData.weight, profileData.height)}</div>
                    <div className="text-sm text-gray-600">BMI</div>
                  </div>
                </div>

                {/* Fitness Level */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Fitness Level</span>
                    <span className="text-sm text-orange-600 font-medium">{profileData.activityLevel}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>

                {/* Achievement Badge */}
                <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                      <Award size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-purple-800">Consistency Champion</div>
                      <div className="text-sm text-purple-600">7 day streak!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User size={20} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg">{profileData.name}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={tempData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                      <Mail size={16} className="text-gray-500" />
                      {profileData.email}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={tempData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                      <Phone size={16} className="text-gray-500" />
                      {profileData.phone}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={tempData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                      <Calendar size={16} className="text-gray-500" />
                      {new Date(profileData.dateOfBirth).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                      <MapPin size={16} className="text-gray-500" />
                      {profileData.country}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={tempData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg">{profileData.city}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Fitness Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Dumbbell size={20} className="text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Fitness Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={tempData.weight}
                      onChange={(e) => handleInputChange('weight', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                      <Weight size={16} className="text-gray-500" />
                      {profileData.weight} kg
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                  {isEditing ? (
                    <input
                      type="number"
                      value={tempData.height}
                      onChange={(e) => handleInputChange('height', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                      <Ruler size={16} className="text-gray-500" />
                      {profileData.height} cm
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fitness Goal</label>
                  {isEditing ? (
                    <select
                      value={tempData.fitnessGoal}
                      onChange={(e) => handleInputChange('fitnessGoal', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Build Muscle">Build Muscle</option>
                      <option value="Lose Weight">Lose Weight</option>
                      <option value="Improve Endurance">Improve Endurance</option>
                      <option value="General Fitness">General Fitness</option>
                      <option value="Athletic Performance">Athletic Performance</option>
                    </select>
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                      <Target size={16} className="text-gray-500" />
                      {profileData.fitnessGoal}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
                  {isEditing ? (
                    <select
                      value={tempData.activityLevel}
                      onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Sedentary">Sedentary</option>
                      <option value="Light">Light</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Active">Active</option>
                      <option value="Very Active">Very Active</option>
                    </select>
                  ) : (
                    <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                      <Activity size={16} className="text-gray-500" />
                      {profileData.activityLevel}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Overview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp size={20} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Progress Overview</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Activity size={16} className="text-white" />
                    </div>
                    <span className="font-semibold text-blue-800">Workouts</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-1">24</div>
                  <div className="text-sm text-blue-600">This month</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <Target size={16} className="text-white" />
                    </div>
                    <span className="font-semibold text-purple-800">Goals</span>
                  </div>
                  <div className="text-3xl font-bold text-purple-600 mb-1">8/10</div>
                  <div className="text-sm text-purple-600">Achieved</div>
                </div>

                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                      <Heart size={16} className="text-white" />
                    </div>
                    <span className="font-semibold text-pink-800">Streak</span>
                  </div>
                  <div className="text-3xl font-bold text-pink-600 mb-1">7</div>
                  <div className="text-sm text-pink-600">Days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;