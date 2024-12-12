import { HttpContext } from '@adonisjs/core/http'
import Community from '#app/Models/Community'
import CreateCommunityValidator from '#app/Validators/CreateCommunityValidator'

export default class CommunitiesController {
  public async index({ request, view }: HttpContext) {
    const page = request.input('page', 1)
    const communities = await Community.query()
      .withCount('members')
      .orderBy('created_at', 'desc')
      .paginate(page, 12)

    return view.render('communities/index', { communities })
  }

  public async show({ params, view }: HttpContext) {
    const community = await Community.query()
      .where('id', params.id)
      .preload('members')
      .preload('news', (query) => {
        query.preload('author').orderBy('created_at', 'desc')
      })
      .firstOrFail()

    return view.render('communities/show', { community })
  }

  public async store({ request, auth, response }: HttpContext) {
    const data = await request.validate(CreateCommunityValidator)
    const community = await Community.create(data)
    await community.related('members').attach([auth.user!.id])
    return response.redirect().toRoute('communities.show', { id: community.id })
  }

  public async join({ params, auth, response }: HttpContext) {
    const community = await Community.findOrFail(params.id)
    await community.related('members').attach([auth.user!.id])
    return response.redirect().back()
  }

  public async leave({ params, auth, response }: HttpContext) {
    const community = await Community.findOrFail(params.id)
    await community.related('members').detach([auth.user!.id])
    return response.redirect().back()
  }
}