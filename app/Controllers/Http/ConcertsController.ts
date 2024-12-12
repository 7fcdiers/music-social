import { HttpContext } from '@adonisjs/core/http'
import Concert from '#app/Models/Concert'
import CreateConcertValidator from '#app/Validators/CreateConcertValidator'
import Rating from '#app/Models/Rating'
import Comment from '#app/Models/Comment'

export default class ConcertsController {
  public async index({ request, view }: HttpContext) {
    const page = request.input('page', 1)
    const concerts = await Concert.query()
      .preload('artists')
      .preload('album')
      .preload('ratings')
      .orderBy('date', 'asc')
      .paginate(page, 12)

    return view.render('concerts/index', { concerts })
  }

  public async show({ params, view }: HttpContext) {
    const concert = await Concert.query()
      .where('id', params.id)
      .preload('artists')
      .preload('album')
      .preload('ratings')
      .preload('comments', (query) => {
        query.preload('user').orderBy('created_at', 'desc')
      })
      .preload('communities')
      .firstOrFail()

    return view.render('concerts/show', { concert })
  }

  public async store({ request, response }: HttpContext) {
    const data = await request.validate(CreateConcertValidator)
    const concert = await Concert.create(data)
    
    if (data.artistIds) {
      await concert.related('artists').attach(data.artistIds)
    }

    if (data.communityIds) {
      await concert.related('communities').attach(data.communityIds)
    }

    return response.redirect().toRoute('concerts.show', { id: concert.id })
  }

  public async rate({ params, request, auth, response }: HttpContext) {
    const data = await request.validate({
      schema: {
        score: 'required|number|range:1,5'
      }
    })

    await Rating.create({
      score: data.score,
      userId: auth.user!.id,
      concertId: params.id
    })

    return response.redirect().back()
  }

  public async comment({ params, request, auth, response }: HttpContext) {
    const data = await request.validate({
      schema: {
        content: 'required|string|min:1'
      }
    })

    await Comment.create({
      content: data.content,
      userId: auth.user!.id,
      concertId: params.id
    })

    return response.redirect().back()
  }

  public async addToCommunity({ params, request, response }: HttpContext) {
    const { communityId } = request.only(['communityId'])
    const concert = await Concert.findOrFail(params.id)
    await concert.related('communities').attach([communityId])
    return response.redirect().back()
  }
}