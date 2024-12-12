export const APP_NAME = 'Music Social';
export const APP_DESCRIPTION = 'Connect with other music lovers and share your favorite tunes.';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333/api';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
} as const;

export const AUTH_ERROR_MESSAGES = {
  NETWORK_ERROR: 'Unable to connect to the server. Please check your internet connection.',
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_IN_USE: 'This email is already registered',
  USERNAME_IN_USE: 'This username is already taken',
  VALIDATION_ERROR: 'Please check your input and try again',
  DEFAULT: 'An unexpected error occurred',
};