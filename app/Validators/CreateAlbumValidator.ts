import { schema, rules } from '@adonisjs/validator'
import { HttpContext } from '@adonisjs/core/http'

export default class CreateAlbumValidator {
  constructor(protected ctx: HttpContext) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(1),
    ]),
    releaseDate: schema.date({}, [
      rules.required(),
    ]),
    coverUrl: schema.string({ trim: true }, [
      rules.required(),
      rules.url(),
    ]),
    genre: schema.string({ trim: true }, [
      rules.required(),
    ]),
    artistId: schema.number([
      rules.required(),
      rules.exists({ table: 'artists', column: 'id' }),
    ]),
  })

  public messages = {
    'title.required': 'Album title is required',
    'releaseDate.required': 'Release date is required',
    'coverUrl.required': 'Album cover URL is required',
    'genre.required': 'Genre is required',
    'artistId.required': 'Artist is required',
    'artistId.exists': 'Selected artist does not exist',
  }
}