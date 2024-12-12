import { AuthenticationException } from '@adonisjs/auth/build/standalone'
import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import { HttpContext } from '@adonisjs/core/http'
import User from '#app/Models/User'
import { AuthResponse, LoginCredentials, OAuthUser, RegisterData } from './types.js'

export class AuthService {
  constructor(private auth: AuthContract) {}

  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const token = await this.auth.use('api').attempt(credentials.email, credentials.password)
      return {
        token: token.token,
        user: this.auth.user!
      }
    } catch (error) {
      throw new AuthenticationException(
        'Invalid credentials',
        'E_INVALID_AUTH_PASSWORD'
      )
    }
  }

  public async register(data: RegisterData): Promise<AuthResponse> {
    const existingUser = await User.findBy('email', data.email)
    if (existingUser) {
      throw new AuthenticationException(
        'Email already in use',
        'E_DUPLICATE_EMAIL'
      )
    }

    const user = await User.create(data)
    const token = await this.auth.use('api').generate(user)
    
    return {
      token: token.token,
      user
    }
  }

  public async handleOAuthCallback(
    ally: HttpContext['ally'],
    provider: 'google' | 'facebook'
  ): Promise<AuthResponse> {
    try {
      const socialUser = await ally.use(provider).user()
      const oauthUser: OAuthUser = {
        id: socialUser.id,
        email: socialUser.email!,
        name: socialUser.name,
        avatarUrl: socialUser.avatarUrl,
        provider
      }

      const user = await this.findOrCreateOAuthUser(oauthUser)
      const token = await this.auth.use('api').generate(user)

      return {
        token: token.token,
        user
      }
    } catch (error) {
      throw new AuthenticationException(
        'OAuth authentication failed',
        'E_OAUTH_ERROR'
      )
    }
  }

  private async findOrCreateOAuthUser(oauthUser: OAuthUser): Promise<User> {
    let user = await User.findBy('email', oauthUser.email)

    if (!user) {
      user = await User.create({
        email: oauthUser.email,
        username: oauthUser.name,
        provider: oauthUser.provider,
        providerId: oauthUser.id,
        avatarUrl: oauthUser.avatarUrl
      })
    } else if (!user.providerId) {
      user.provider = oauthUser.provider
      user.providerId = oauthUser.id
      await user.save()
    }

    return user
  }
}