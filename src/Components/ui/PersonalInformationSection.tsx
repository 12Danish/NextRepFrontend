import React from 'react';
import { User, Mail, Phone, Calendar, MapPin } from 'lucide-react';
import type { PersonalData } from '../../types/userInfo';

interface PersonalInformationSectionProps {
  data: PersonalData;
  isEditing: boolean;
  onInputChange: (field: string, value: string) => void;
}

const PersonalInformationSection: React.FC<PersonalInformationSectionProps> = ({
  data,
  isEditing,
  onInputChange
}) => {
  return (
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
              value={data.name}
              onChange={(e) => onInputChange('name', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          ) : (
            <div className="p-3 bg-gray-50 rounded-lg">{data.name}</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          {isEditing ? (
            <input
              type="email"
              value={data.email}
              onChange={(e) => onInputChange('email', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          ) : (
            <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
              <Mail size={16} className="text-gray-500" />
              {data.email}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          {isEditing ? (
            <input
              type="tel"
              value={data.phone}
              onChange={(e) => onInputChange('phone', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          ) : (
            <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
              <Phone size={16} className="text-gray-500" />
              {data.phone}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
          {isEditing ? (
            <input
              type="date"
              value={data.dateOfBirth}
              onChange={(e) => onInputChange('dateOfBirth', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          ) : (
            <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
              <Calendar size={16} className="text-gray-500" />
              {new Date(data.dateOfBirth).toLocaleDateString()}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
          {isEditing ? (
            <input
              type="text"
              value={data.country}
              onChange={(e) => onInputChange('country', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          ) : (
            <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
              <MapPin size={16} className="text-gray-500" />
              {data.country}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          {isEditing ? (
            <input
              type="text"
              value={data.city}
              onChange={(e) => onInputChange('city', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          ) : (
            <div className="p-3 bg-gray-50 rounded-lg">{data.city}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInformationSection; 