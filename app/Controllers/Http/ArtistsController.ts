import { HttpContext } from '@adonisjs/core/http'
import Artist from '#app/Models/Artist'
import CreateArtistValidator from '#app/Validators/CreateArtistValidator'

export default class ArtistsController {
  public async index({ request, view }: HttpContext) {
    const page = request.input('page', 1)
    const artists = await Artist.query()
      .preload('albums')
      .orderBy('name', 'asc')
      .paginate(page, 12)

    return view.render('artists/index', { artists })
  }

  public async show({ params, view }: HttpContext) {
    const artist = await Artist.query()
      .where('id', params.id)
      .preload('albums')
      .preload('tracks')
      .firstOrFail()

    return view.render('artists/show', { artist })
  }

  public async store({ request, response }: HttpContext) {
    const data = await request.validate(CreateArtistValidator)
    await Artist.create(data)
    return response.redirect().back()
  }

  public async update({ params, request, response }: HttpContext) {
    const artist = await Artist.findOrFail(params.id)
    const data = await request.validate(CreateArtistValidator)
    await artist.merge(data).save()
    return response.redirect().back()
  }

  public async destroy({ params, response }: HttpContext) {
    const artist = await Artist.findOrFail(params.id)
    await artist.delete()
    return response.redirect().back()
  }
}