import { HttpContext } from '@adonisjs/core/http'
import Album from '#app/Models/Album'
import Comment from '#app/Models/Comment'
import Rating from '#app/Models/Rating'
import CreateAlbumValidator from '#app/Validators/CreateAlbumValidator'
import CreateCommentValidator from '#app/Validators/CreateCommentValidator'
import CreateRatingValidator from '#app/Validators/CreateRatingValidator'

export default class AlbumsController {
  public async index({ request, view }: HttpContext) {
    const page = request.input('page', 1)
    const genre = request.input('genre')

    const query = Album.query()
      .preload('artist')
      .preload('ratings')
      .orderBy('releaseDate', 'desc')

    if (genre) {
      query.where('genre', genre)
    }

    const albums = await query.paginate(page, 12)
    return view.render('albums/index', { albums, currentGenre: genre })
  }

  public async show({ params, view }: HttpContext) {
    const album = await Album.query()
      .where('id', params.id)
      .preload('artist')
      .preload('tracks')
      .preload('ratings')
      .preload('comments', (query) => {
        query.preload('user').orderBy('created_at', 'desc')
      })
      .firstOrFail()

    return view.render('albums/show', { album })
  }

  public async store({ request, response }: HttpContext) {
    const data = await request.validate(CreateAlbumValidator)
    await Album.create(data)
    return response.redirect().back()
  }

  public async rate({ params, request, auth, response }: HttpContext) {
    const data = await request.validate(CreateRatingValidator)
    await Rating.create({
      ...data,
      userId: auth.user!.id,
      albumId: params.id,
    })
    return response.redirect().back()
  }

  public async comment({ params, request, auth, response }: HttpContext) {
    const data = await request.validate(CreateCommentValidator)
    await Comment.create({
      ...data,
      userId: auth.user!.id,
      albumId: params.id,
    })
    return response.redirect().back()
  }
}
