import React, { useState } from 'react';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getUserProfile from '@wasp/queries/getUserProfile';
import getLoyaltyPoints from '@wasp/queries/getLoyaltyPoints';
import updateUserProfile from '@wasp/actions/updateUserProfile';
import redeemLoyaltyPoints from '@wasp/actions/redeemLoyaltyPoints';

export function UserProfile() {
  const { data: userProfile, isLoading: profileLoading, error: profileError } = useQuery(getUserProfile);
  const { data: loyaltyPoints, isLoading: pointsLoading, error: pointsError } = useQuery(getLoyaltyPoints);
  const updateUserProfileFn = useAction(updateUserProfile);
  const redeemLoyaltyPointsFn = useAction(redeemLoyaltyPoints);
  const [newUsername, setNewUsername] = useState(userProfile?.username || '');
  const [newPassword, setNewPassword] = useState('');
  const [pointsToRedeem, setPointsToRedeem] = useState(0);

  const handleUpdateProfile = () => {
    updateUserProfileFn({ id: userProfile?.id, username: newUsername, password: newPassword });
  };

  const handleRedeemPoints = () => {
    redeemLoyaltyPointsFn({ points: pointsToRedeem });
  };

  if (profileLoading || pointsLoading) return 'Loading...';
  if (profileError || pointsError) return 'Error: ' + (profileError || pointsError);

  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-4">User Profile</h2>

      <div className="mb-4">
        <label htmlFor="username" className="block mb-1">
          Username:
        </label>
        <input
          type="text"
          id="username"
          className="border rounded py-2 px-3 w-full"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block mb-1">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className="border rounded py-2 px-3 w-full"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <button
        onClick={handleUpdateProfile}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update Profile
      </button>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Loyalty Points</h2>

      <p className="mb-4">
        Current Points: {loyaltyPoints}
      </p>

      <div className="mb-4">
        <label htmlFor="pointsToRedeem" className="block mb-1">
          Points to Redeem:
        </label>
        <input
          type="number"
          id="pointsToRedeem"
          className="border rounded py-2 px-3 w-full"
          value={pointsToRedeem}
          onChange={(e) => setPointsToRedeem(parseInt(e.target.value))}
        />
      </div>

      <button
        onClick={handleRedeemPoints}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Redeem Points
      </button>
    </div>
  );
}