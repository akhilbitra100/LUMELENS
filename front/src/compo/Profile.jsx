import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { User, Mail, Calendar, Shield, Loader, RefreshCw, AlertCircle } from 'lucide-react';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { user: authUser } = useContext(AuthContext);

  const fetchProfile = async () => {
    try {
      setIsRefreshing(true);
      // Get token directly from localStorage
      const token = localStorage.getItem('token');
      console.log("Token from localStorage:", token ? "Found" : "Not found");

      if (!token) {
        throw new Error("Authentication token not found");
      }

      // Check if authUser exists and has an ID property
      if (!authUser || (!authUser.id && !authUser.userId && !authUser._id)) {
        console.log("No valid user ID found in authUser");
        throw new Error("User ID not found");
      }

      // Try to find the user ID from different possible properties
      const userId = authUser.id || authUser.userId || authUser._id;
      console.log("Using userId:", userId);

      const response = await fetch(`http://localhost:4000/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("User data received:", data);

      // If we got here, we have valid data - set it and clear any errors
      setUser(data);
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      setUser(null);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [authUser]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-64">
        <Loader className="h-8 w-8 text-blue-500 animate-spin mb-4" />
        <p className="text-lg text-gray-700">Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
          <h2 className="text-xl font-bold text-red-700">Error loading profile</h2>
        </div>
        <p className="text-red-600 mb-4 p-2 bg-red-100 rounded">{error}</p>
        <div className="flex justify-between">
          <button
            onClick={fetchProfile}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </button>
          <button
            onClick={() => window.location.href = '/signin'}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-8 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md mx-auto">
        <AlertCircle className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
        <p className="text-lg text-yellow-700">No user data found.</p>
        <button
          onClick={fetchProfile}
          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 flex items-center mx-auto"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reload Profile
        </button>
      </div>
    );
  }

  // Calculate account age if createdAt exists
  const accountAge = user.createdAt ?
    Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24)) :
    null;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
        <button
          onClick={fetchProfile}
          disabled={isRefreshing}
          className={`p-2 rounded-full ${isRefreshing ? 'bg-gray-200' : 'bg-blue-100 hover:bg-blue-200'}`}
        >
          <RefreshCw className={`h-5 w-5 text-blue-600 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left section with avatar and name */}
        <div className="md:w-1/4 flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">{user.name ? user.name.charAt(0).toUpperCase() : '?'}</span>
          </div>
          <h2 className="text-xl font-semibold text-center">{user.name || "Anonymous User"}</h2>
        </div>

        {/* Right section with user details in a 2x2 grid */}
        <div className="md:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <User className="h-5 w-5 mr-3 text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Username</p>
              <p className="font-medium">{user.username || user.name || "Not set"}</p>
            </div>
          </div>

          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <Mail className="h-5 w-5 mr-3 text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">Email Address</p>
              <p className="font-medium">{user.email || "Not set"}</p>
            </div>
          </div>

          {authUser && authUser.role && (
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <Shield className="h-5 w-5 mr-3 text-blue-600" />
              <div>
                <p className="text-sm text-blue-800">Account Type</p>
                <p className="font-medium text-blue-900">{authUser.role}</p>
              </div>
            </div>
          )}

          {accountAge !== null && (
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 mr-3 text-gray-600" />
              <div>
                <p className="text-sm text-gray-600">Account Age</p>
                <p className="font-medium">{accountAge} days</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;