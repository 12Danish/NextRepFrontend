import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../Components/ui/Logo';
import { Label } from '../../Components/ui/label';
import { Input } from '../../Components/ui/input';
import PhoneNumberInput from '../../Components/ui/PhoneNumberInput';
import CountrySelect from '../../Components/ui/CountrySelect';
import DateOfBirthInput from '../../Components/ui/DateOfBirthInput';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    phone_num: '',
    dob: '',
    country: '',
    height: '',
    weight: ''
  });

  useEffect(() => {
    // Get user data from the authenticated session (cookie-based)
    const fetchUserData = async () => {
      try {
        // Add a small delay to ensure cookie is set after registration
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const response = await fetch(`${API_BASE_URL}/api/userDetails`, {
          method: 'GET',
          credentials: 'include', // Important for cookies
        });

        if (!response.ok) {
          if (response.status === 401) {
            // Unauthorized - redirect to signin
            navigate('/signin');
            return;
          }
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data.user);
        
        // Check if user already has all required fields filled
        if (data.user.phone_num && data.user.dob && data.user.country && data.user.height && data.user.weight) {
          navigate('/main/overview');
          return;
        }
        
      } catch (err) {
        console.error('Error fetching user data:', err);
        navigate('/signin');
      }
    };

    fetchUserData();
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
      const response = await fetch(`${API_BASE_URL}/api/userDetails/update`, {
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

      // Redirect to main overview page
      navigate('/main/overview');
      
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
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
              Welcome, {userData.username || userData.email}! Let's get to know you better.
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
              <Label htmlFor="phone_num" className="block text-gray-700 text-sm font-medium mb-2">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <PhoneNumberInput
                value={formData.phone_num}
                onChange={(value) => setFormData({ ...formData, phone_num: value })}
                placeholder="Enter your phone number"
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="dob" className="block text-gray-700 text-sm font-medium mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </Label>
              <DateOfBirthInput
                value={formData.dob}
                onChange={(value) => setFormData({ ...formData, dob: value })}
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="country" className="block text-gray-700 text-sm font-medium mb-2">
                Country <span className="text-red-500">*</span>
              </Label>
              <CountrySelect
                value={formData.country}
                onChange={(value) => setFormData({ ...formData, country: value })}
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="height" className="block text-gray-700 text-sm font-medium mb-2">
                Height (cm) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                placeholder="Enter height in cm"
                min="100"
                max="250"
                required
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="weight" className="block text-gray-700 text-sm font-medium mb-2">
                Weight (kg) <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
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

      {/* Right Side - Premium Features & CTA */}
      <div className="w-1/2 bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center p-8">
        <div className="text-center text-white max-w-md">
          <h2 className="text-4xl font-bold mb-6">
            Build Your Perfect Fitness Plan
          </h2>
          {/* Premium Features */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="border border-white/20 rounded-2xl p-3 text-center transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:scale-102">
              <span className="text-orange-100 text-sm font-medium">AI-powered workout recommendations</span>
            </div>
            <div className=" border border-white/20 rounded-2xl p-3 text-center transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:scale-102">
              <span className="text-orange-100 text-sm font-medium">Personalized nutrition guidance</span>
            </div>
            <div className="border border-white/20 rounded-2xl p-3 text-center transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:scale-102">
              <span className="text-orange-100 text-sm font-medium">Advanced progress analytics</span>
            </div>
            <div className="border border-white/20 rounded-2xl p-3 text-center transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:scale-102">
              <span className="text-orange-100 text-sm font-medium">Expert-led training programs</span>
            </div>
          </div>

          {/* CTA Button */}
          <button className="bg-white text-orange-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;