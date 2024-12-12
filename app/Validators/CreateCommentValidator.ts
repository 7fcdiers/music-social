import { schema, rules } from '@adonisjs/validator'
import { HttpContext } from '@adonisjs/core/http'

export default class CreateCommentValidator {
  constructor(protected ctx: HttpContext) {}

  public schema = schema.create({
    content: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(1),
    ]),
  })

  public messages = {
    'content.required': 'Comment content is required',
    'content.minLength': 'Comment cannot be empty',
  }
}