import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../Components/ui/Logo';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface NewUserData {
  userId: string;
  email: string;
  username: string;
}

const DetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [newUserData, setNewUserData] = useState<NewUserData | null>(null);
  
  const [formData, setFormData] = useState({
    phone_num: '',
    dob: '',
    country: '',
    height: '',
    weight: ''
  });

  useEffect(() => {
    // Get user data from localStorage
    const storedData = localStorage.getItem('newUserData');
    if (!storedData) {
      // No user data, redirect back to signin
      navigate('/signin');
      return;
    }
    
    try {
      const userData = JSON.parse(storedData);
      setNewUserData(userData);
    } catch (err) {
      console.error('Error parsing user data:', err);
      navigate('/signin');
    }
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.phone_num || !formData.dob || !formData.country || !formData.height || !formData.weight) {
        throw new Error('Please fill in all required fields');
      }

      // Validate height and weight are numbers
      if (isNaN(Number(formData.height)) || isNaN(Number(formData.weight))) {
        throw new Error('Height and weight must be valid numbers');
      }

      // Call the update user details API
      const response = await fetch(`${API_BASE_URL}/api/userDetails`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_num: formData.phone_num,
          dob: new Date(formData.dob).toISOString(),
          country: formData.country,
          height: Number(formData.height),
          weight: Number(formData.weight)
        }),
        credentials: 'include', // Important for cookies
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user details');
      }

      const data = await response.json();
      console.log('User details updated successfully:', data);

      // Clear stored user data
      localStorage.removeItem('newUserData');

      // Redirect to main overview page
      navigate('/main/overview');
      
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!newUserData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Logo />
            <p className="text-gray-600 mt-4 text-lg">
              Complete Your Profile
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Welcome, {newUserData.username}! Let's get to know you better.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone_num"
                value={formData.phone_num}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-200"
                placeholder="Enter your phone number"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 transition-all duration-200"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 transition-all duration-200"
                required
                disabled={loading}
              >
                <option value="">Select your country</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Australia">Australia</option>
                <option value="Japan">Japan</option>
                <option value="India">India</option>
                <option value="Brazil">Brazil</option>
                <option value="Mexico">Mexico</option>
                <option value="South Africa">South Africa</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Height (cm) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-200"
                placeholder="Enter height in cm"
                min="100"
                max="250"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Weight (kg) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-200"
                placeholder="Enter weight in kg"
                min="30"
                max="300"
                required
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full cursor-pointer bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 px-4 rounded-lg font-semibold shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating Profile...' : 'Complete Profile'}
            </button>
          </form>

          {/* Back to Signin */}
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/signin')}
              className="text-orange-500 hover:text-orange-600 text-sm transition-colors duration-200"
            >
              ← Back to Sign In
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Simple CTA & Features */}
      <div className="w-1/2 bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center p-8">
        <div className="text-center text-white max-w-md">
          <h2 className="text-4xl font-bold mb-6">
            Personalize Your Experience
          </h2>
          
          <p className="text-xl mb-8 text-orange-100">
            Help us create a tailored fitness journey just for you
          </p>

          {/* App Features */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-orange-100">Customized workout recommendations</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-orange-100">Personalized nutrition plans</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-orange-100">Progress tracking based on your goals</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-orange-100">Tailored fitness insights</span>
            </div>
          </div>

          {/* CTA Button */}
          <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
            Almost There!
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;