import React from 'react';

export default function ProfileStats() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Activity</h2>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-gray-900">0</div>
          <div className="text-sm text-gray-600">Reviews</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-gray-900">0</div>
          <div className="text-sm text-gray-600">Comments</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-gray-900">0</div>
          <div className="text-sm text-gray-600">Favorites</div>
        </div>
      </div>
    </div>
  );
}