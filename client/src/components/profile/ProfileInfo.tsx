import React from 'react';
import { User } from '../../types/auth.js';
import { Button } from '../common/Button.js';

interface ProfileInfoProps {
  user: User;
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <img
          src={user.avatarUrl || '/default-avatar.png'}
          alt={user.username}
          className="h-24 w-24 rounded-full object-cover"
        />
      </div>
      <div className="ml-6">
        <h1 className="text-2xl font-bold text-gray-900">{user.username}</h1>
        <p className="text-gray-600">{user.email}</p>
        <div className="mt-4">
          <Button variant="secondary">Edit Profile</Button>
        </div>
      </div>
    </div>
  );
}