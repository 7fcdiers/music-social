import { HttpContext } from '@adonisjs/core/http'

export default class Guest {
  public async handle(
    { auth, response }: HttpContext,
    next: () => Promise<void>
  ) {
    if (await auth.check()) {
      return response.redirect().back()
    }
    await next()
  }
}