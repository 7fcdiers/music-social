import { schema, rules } from '@adonisjs/validator'
import { HttpContext } from '@adonisjs/core/http'

export default class CreateTrackValidator {
  constructor(protected ctx: HttpContext) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(1),
    ]),
    duration: schema.number([
      rules.required(),
      rules.unsigned(),
    ]),
    artistId: schema.number([
      rules.required(),
      rules.exists({ table: 'artists', column: 'id' }),
    ]),
    albumId: schema.number.optional([
      rules.exists({ table: 'albums', column: 'id' }),
    ]),
    spotifyId: schema.string.optional({ trim: true }),
    deezerId: schema.string.optional({ trim: true }),
  })

  public messages = {
    'title.required': 'Track title is required',
    'duration.required': 'Track duration is required',
    'artistId.required': 'Artist is required',
    'artistId.exists': 'Selected artist does not exist',
    'albumId.exists': 'Selected album does not exist',
  }
}