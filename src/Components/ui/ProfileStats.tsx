import React from 'react';

interface ProfileStatsProps {
  dateOfBirth?: Date;
  weight?: number;
  height?: number;
  className?: string;
}

const ProfileStats: React.FC<ProfileStatsProps> = ({
  dateOfBirth,
  weight,
  height,
  className = ''
}) => {
  const calculateAge = (birthDate?: Date) => {
    if (!birthDate) return 0;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const calculateBMI = (weight?: number, height?: number) => {
    if (!weight || !height) return 0;
    const h = height / 100; // Convert cm to m
    return Number((weight / (h * h)).toFixed(1));
  };

  return (
    <div className={`grid grid-cols-2 gap-4 ${className}`}>
      <div className="text-center p-4 bg-orange-50 rounded-xl">
        <div className="text-2xl font-bold text-orange-600">{calculateAge(dateOfBirth)}</div>
        <div className="text-sm text-gray-600">Years Old</div>
      </div>
      <div className="text-center p-4 bg-green-50 rounded-xl">
        <div className="text-2xl font-bold text-green-600">{calculateBMI(weight, height)}</div>
        <div className="text-sm text-gray-600">BMI</div>
      </div>
    </div>
  );
};

export default ProfileStats; 