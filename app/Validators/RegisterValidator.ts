import { HttpContext } from '@adonisjs/core/http'
import { rules, schema } from '@adonisjs/validator'

export default class RegisterValidator {
  constructor(protected ctx: HttpContext) {}

  public schema = schema.create({
    email: schema.string({}, [
      rules.email(),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    username: schema.string({}, [
      rules.minLength(3),
      rules.maxLength(30),
      rules.unique({ table: 'users', column: 'username' }),
    ]),
    password: schema.string({}, [
      rules.minLength(8),
    ]),
  })

  public messages = {
    'email.required': 'Email is required',
    'email.email': 'Email is invalid',
    'email.unique': 'Email is already registered',
    'username.required': 'Username is required',
    'username.minLength': 'Username must be at least 3 characters long',
    'username.maxLength': 'Username must be less than 30 characters',
    'username.unique': 'Username is already taken',
    'password.required': 'Password is required',
    'password.minLength': 'Password must be at least 8 characters long',
  }
}
