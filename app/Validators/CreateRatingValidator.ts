import { schema, rules } from '@adonisjs/validator'
import { HttpContext } from '@adonisjs/core/http'

export default class CreateRatingValidator {
  constructor(protected ctx: HttpContext) {}

  public schema = schema.create({
    score: schema.number([
      rules.required(),
      rules.range(1, 5),
    ]),
  })

  public messages = {
    'score.required': 'Rating score is required',
    'score.range': 'Rating must be between 1 and 5',
  }
}