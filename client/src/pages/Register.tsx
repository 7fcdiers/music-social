import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button.js';
import { Input } from '../components/common/Input.js';
import { useAuth } from '../contexts/AuthContext.js';

export default function Register() {
  const navigate = useNavigate();
  const { register, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await register(formData.email, formData.username, formData.password);
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      console.log(error);
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
              <button
                onClick={clearError}
                className="ml-auto pl-3"
              >
                <span className="sr-only">Dismiss</span>
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <Input
            id="email"
            name="email"
            type="email"
            label="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            id="username"
            name="username"
            type="text"
            label="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div>
            <Button
              type="submit"
              className="w-full"
              isLoading={isLoading}
            >
              Create account
            </Button>
          </div>

          <div className="text-sm text-center">
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}