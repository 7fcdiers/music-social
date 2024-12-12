import { schema, rules } from '@adonisjs/validator'
import { HttpContext } from '@adonisjs/core/http'

export default class CreateConcertValidator {
  constructor(protected ctx: HttpContext) {}

  public schema = schema.create({
    title: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(1)
    ]),
    description: schema.string({ trim: true }, [
      rules.required(),
      rules.minLength(10)
    ]),
    date: schema.date({}, [
      rules.required(),
      rules.after('today')
    ]),
    venue: schema.string({ trim: true }, [
      rules.required()
    ]),
    address: schema.string({ trim: true }, [
      rules.required()
    ]),
    latitude: schema.number([
      rules.required()
    ]),
    longitude: schema.number([
      rules.required()
    ]),
    ticketUrl: schema.string.optional({ trim: true }, [
      rules.url()
    ]),
    albumId: schema.number.optional([
      rules.exists({ table: 'albums', column: 'id' })
    ]),
    artistIds: schema.array().members(
      schema.number([
        rules.exists({ table: 'artists', column: 'id' })
      ])
    ),
    communityIds: schema.array.optional().members(
      schema.number([
        rules.exists({ table: 'communities', column: 'id' })
      ])
    )
  })

  public messages = {
    'title.required': 'Concert title is required',
    'description.required': 'Concert description is required',
    'date.required': 'Concert date is required',
    'date.after': 'Concert date must be in the future',
    'venue.required': 'Venue name is required',
    'address.required': 'Venue address is required',
    'latitude.required': 'Venue latitude is required',
    'longitude.required': 'Venue longitude is required',
    'ticketUrl.url': 'Invalid ticket URL format',
    'albumId.exists': 'Selected album does not exist',
    'artistIds.exists': 'One or more selected artists do not exist',
    'communityIds.exists': 'One or more selected communities do not exist'
  }
}