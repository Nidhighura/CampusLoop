import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMapPin, FiMail, FiPhone, FiCheckCircle, FiPackage } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/users/${user.id}`);
      if (res.data.success) {
        setProfileData(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to load profile data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
     return (
       <div className="flex justify-center items-center min-h-[50vh]">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
       </div>
     );
  }

  if (!profileData) {
     return <div className="text-center py-20 text-gray-500">Profile could not be loaded.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 lg:py-12">
      
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
            My Profile
          </h2>
        </div>
      </div>

      <div className="bg-gray-900 shadow-sm overflow-hidden sm:rounded-xl border border-gray-800">
        <div className="px-4 py-5 sm:px-6 bg-gray-900 flex justify-between items-start border-b border-gray-800">
          <div>
            <h3 className="text-lg leading-6 font-medium text-white">Personal Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-400">Personal details and application status.</p>
          </div>
          {profileData.verified && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900/30 text-green-400 border border-green-800/50 shadow-sm">
              <FiCheckCircle className="mr-1.5" />
              Verified College Student
            </span>
          )}
        </div>
        <div className="px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-800">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-400 flex items-center">
                <FiUser className="mr-2 text-gray-500" /> Full name
              </dt>
              <dd className="mt-1 text-sm text-gray-100 sm:mt-0 sm:col-span-2 font-semibold">
                {profileData.name}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-400 flex items-center">
                <FiMail className="mr-2 text-gray-500" /> College Email
              </dt>
              <dd className="mt-1 text-sm text-gray-100 sm:mt-0 sm:col-span-2">
                {profileData.email}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-400 flex items-center">
                <FiPhone className="mr-2 text-gray-500" /> Phone number
              </dt>
              <dd className="mt-1 text-sm text-gray-100 sm:mt-0 sm:col-span-2">
                {profileData.phoneNumber}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-400 flex items-center">
                <FiMapPin className="mr-2 text-gray-500" /> College
              </dt>
              <dd className="mt-1 text-sm text-gray-100 sm:mt-0 sm:col-span-2">
                {profileData.collegeName}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="bg-gray-900 shadow-sm overflow-hidden sm:rounded-xl border border-gray-800 px-4 py-6 sm:px-6 flex items-center justify-between">
         <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-900/30 text-primary-400 mr-4 border border-primary-800/50">
              <FiPackage className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white">Manage Your Listings</h4>
              <p className="text-sm text-gray-400">View, edit, or delete items you are selling.</p>
            </div>
         </div>
         <Link to="/my-products" className="inline-flex items-center px-4 py-2 border border-gray-700 shadow-sm text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors">
            Go to My Products
         </Link>
      </div>

    </div>
  );
};

export default Profile;
