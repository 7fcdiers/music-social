import { HttpContext } from '@adonisjs/core/http'
import User from '#app/Models/User'
import RegisterValidator from '#app/Validators/RegisterValidator'

export default class AuthController {
  public async register({ request, response, auth }: HttpContext) {
    const data = await request.validate(RegisterValidator)
    const user = await User.create(data)
    const token = await auth.use('api').generate(user)
    return response.json({ user, token: token.token })
  }

  public async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const token = await auth.use('api').attempt(email, password)
    return response.json({ token: token.token, user: auth.user })
  }

  public async logout({ auth, response }: HttpContext) {
    await auth.use('api').revoke()
    return response.json({ message: 'Logged out successfully' })
  }

  public async me({ auth, response }: HttpContext) {
    return response.json({ user: auth.user })
  }
}
