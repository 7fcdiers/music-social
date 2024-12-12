import React from 'react';

export function SocialLogin() {
  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
  };

  const handleFacebookLogin = () => {
    window.location.href = '/api/auth/facebook';
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <img
            className="h-5 w-5 mr-2"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
          />
          Google
        </button>

        <button
          onClick={handleFacebookLogin}
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <img
            className="h-5 w-5 mr-2"
            src="https://www.svgrepo.com/show/475647/facebook-color.svg"
            alt="Facebook logo"
          />
          Facebook
        </button>
      </div>
    </div>
  );
}