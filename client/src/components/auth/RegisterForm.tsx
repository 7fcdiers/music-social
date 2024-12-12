import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.js';
import { validateEmail, validateUsername, validatePassword } from '../../utils/validation.js';
import FormInput from '../common/FormInput.js';
import ErrorAlert from '../common/ErrorAlert.js';

interface FormErrors {
  email?: string;
  username?: string;
  password?: string;
}

function RegisterForm() {
  const navigate = useNavigate();
  const { register, error: authError, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;

    const usernameError = validateUsername(username);
    if (usernameError) newErrors.username = usernameError;

    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await register(email, username, password);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        {authError && <ErrorAlert message={authError} onDismiss={clearError} />}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <FormInput
              id="email"
              name="email"
              type="email"
              label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
            />

            <FormInput
              id="username"
              name="username"
              type="text"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={errors.username}
              required
            />

            <FormInput
              id="password"
              name="password"
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary py-3"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;