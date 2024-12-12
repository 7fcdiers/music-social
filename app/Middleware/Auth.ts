import { HttpContext } from '@adonisjs/core/http'
import { AuthenticationException } from '@adonisjs/auth/build/standalone'

export default class AuthMiddleware {
  protected redirectTo = '/login'

  public async handle(
    { auth, response }: HttpContext,
    next: () => Promise<void>,
    customGuards: string[]
  ) {
    const guards = customGuards.length ? customGuards : [auth.name]
    
    for (const guard of guards) {
      if (await auth.use(guard).check()) {
        auth.defaultGuard = guard
        return next()
      }
    }

    throw new AuthenticationException(
      'Unauthorized access',
      'E_UNAUTHORIZED_ACCESS',
      this.redirectTo,
    )
  }
}