'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext'; // Assuming you have an AuthContext

interface UserProfile {
  uid: string;
  email: string;
  displayName: string | null;
  // Add other user-related fields here if available (e.g., photoURL, etc.)
}

const AccountPage = () => {
  const { user, loading } = useAuth(); // Using user instead of currentUser to match AuthContextType
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!loading && user) {
      // In a real application, you would fetch more detailed user data from a database
      // For now, we'll use data directly from currentUser (e.g., Firebase Auth user)
      setUserProfile({
        uid: user.uid,
        email: user.email || 'N/A',
        displayName: user.displayName || 'N/A',
      });
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        Loading user data...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>Please sign in to view your account details.</p>
        {/* You might want to add a link to your sign-in page here */}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
        <div className="space-y-3">
          <p className="text-gray-700"><span className="font-medium">User ID:</span> {userProfile?.uid}</p>
          <p className="text-gray-700"><span className="font-medium">Email:</span> {userProfile?.email}</p>
          <p className="text-gray-700"><span className="font-medium">Display Name:</span> {userProfile?.displayName}</p>
          {/* Add more profile fields as needed */}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Past Orders (Mock)</h2>
        <p className="text-gray-600">No past orders to display yet.</p>
        {/* In a real application, you would fetch and display user's past orders here */}
      </div>
    </div>
  );
};

export default AccountPage; 