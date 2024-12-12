import { schema, rules } from '@adonisjs/validator'
import { HttpContext } from '@adonisjs/core/http'

export default class CreateCommunityValidator {
  constructor(protected ctx: HttpContext) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(2),
      rules.unique({ table: 'communities', column: 'name' }),
    ]),
    description: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(10),
    ]),
    imageUrl: schema.string.optional({ trim: true }, [
      rules.url(),
    ]),
  })

  public messages = {
    'name.required': 'Community name is required',
    'name.unique': 'Community name already exists',
    'description.required': 'Community description is required',
    'imageUrl.url': 'Invalid image URL format',
  }
}