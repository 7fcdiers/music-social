export interface LoginCredentials {
    email: string
    password: string
  }
  
  export interface RegisterData {
    email: string
    username: string
    password: string
  }
  
  export interface OAuthUser {
    id: string
    email: string
    name: string
    avatarUrl?: string
    provider: 'google' | 'facebook'
  }
  
  export interface AuthResponse {
    user: {
      id: number
      email: string
      username: string
      avatarUrl?: string
    }
    token: string
  }