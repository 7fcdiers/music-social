import React from 'react';
import { useAuthContext } from '../contexts/AuthContext.js';
import { Button } from '../components/common/Button.js';
import ProfileInfo from '../components/profile/ProfileInfo.js';
import ProfileStats from '../components/profile/ProfileStats.js';

export default function Profile() {
  const { user } = useAuthContext();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <ProfileInfo user={user} />
          <div className="mt-6 border-t pt-6">
            <ProfileStats />
          </div>
        </div>
      </div>
    </div>
  );
}