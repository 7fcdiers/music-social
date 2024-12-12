import { HttpContext } from '@adonisjs/core/http'
import Track from '#app/Models/Track'
import Rating from '#app/Models/Rating'
import Comment from '#app/Models/Comment'
import CreateTrackValidator from '#app/Validators/CreateTrackValidator'
import CreateRatingValidator from '#app/Validators/CreateRatingValidator'
import CreateCommentValidator from '#app/Validators/CreateCommentValidator'

export default class TracksController {
  public async index({ request, view }: HttpContext) {
    const page = request.input('page', 1)
    const tracks = await Track.query()
      .preload('artist')
      .preload('album')
      .preload('ratings')
      .orderBy('created_at', 'desc')
      .paginate(page, 20)

    return view.render('tracks/index', { tracks })
  }

  public async show({ params, view }: HttpContext) {
    const track = await Track.query()
      .where('id', params.id)
      .preload('artist')
      .preload('album')
      .preload('ratings')
      .preload('comments', (query) => {
        query.preload('user').orderBy('created_at', 'desc')
      })
      .firstOrFail()

    return view.render('tracks/show', { track })
  }

  public async store({ request, response }: HttpContext) {
    const data = await request.validate(CreateTrackValidator)
    await Track.create(data)
    return response.redirect().back()
  }

  public async rate({ params, request, auth, response }: HttpContext) {
    const data = await request.validate(CreateRatingValidator)
    await Rating.create({
      ...data,
      userId: auth.user!.id,
      trackId: params.id,
    })
    return response.redirect().back()
  }

  public async comment({ params, request, auth, response }: HttpContext) {
    const data = await request.validate(CreateCommentValidator)
    await Comment.create({
      ...data,
      userId: auth.user!.id,
      trackId: params.id,
    })
    return response.redirect().back()
  }
}