import { schema, rules } from '@adonisjs/validator'
import { HttpContext } from '@adonisjs/core/http'

export default class CreateArtistValidator {
  constructor(protected ctx: HttpContext) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(2),
    ]),
    bio: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(10),
    ]),
    imageUrl: schema.string({ trim: true }, [
      rules.required(),
      rules.url(),
    ]),
  })

  public messages = {
    'name.required': 'Artist name is required',
    'bio.required': 'Artist bio is required',
    'imageUrl.required': 'Artist image URL is required',
    'imageUrl.url': 'Invalid image URL format',
  }
}