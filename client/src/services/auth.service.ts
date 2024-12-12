import { LoginCredentials, RegisterCredentials } from '../types/auth.js';
import { register as apiRegister, login as apiLogin, logout as apiLogout, getCurrentUser as apiGetCurrentUser } from './api.js';

export class AuthService {
  async login(credentials: LoginCredentials) {
    const { user, token } = await apiLogin(credentials.email, credentials.password);
    return { user, token };
  }

  async register(credentials: RegisterCredentials) {
    const { user, token } = await apiRegister(credentials.email, credentials.username, credentials.password);
    return { user, token };
  }

  async logout() {
    await apiLogout();
  }

  async getCurrentUser() {
    const user = await apiGetCurrentUser();
    return user;
  }
}

export const authService = new AuthService();
