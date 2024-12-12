import { HttpContext } from '@adonisjs/core/http'
import Artist from '#app/Models/Artist'
import Album from '#app/Models/Album'
import Track from '#app/Models/Track'
import Community from '#app/Models/Community'

export default class SearchController {
  public async artists({ request, response }: HttpContext) {
    const { query, genre, sort = 'name' } = request.qs()
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)

    const artistsQuery = Artist.query()
      .if(query, (query) => {
        query.where('name', 'LIKE', `%${query}%`)
      })
      .if(genre, (query) => {
        query.whereHas('albums', (albumQuery) => {
          albumQuery.where('genre', genre)
        })
      })
      .orderBy(sort)

    const artists = await artistsQuery.paginate(page, limit)
    return response.json(artists)
  }

  public async albums({ request, response }: HttpContext) {
    const { query, genre, sort = 'releaseDate' } = request.qs()
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)

    const albumsQuery = Album.query()
      .preload('artist')
      .if(query, (query) => {
        query.where('title', 'LIKE', `%${query}%`)
      })
      .if(genre, (query) => {
        query.where('genre', genre)
      })
      .orderBy(sort, 'desc')

    const albums = await albumsQuery.paginate(page, limit)
    return response.json(albums)
  }

  public async tracks({ request, response }: HttpContext) {
    const { query, sort = 'title' } = request.qs()
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)

    const tracksQuery = Track.query()
      .preload('artist')
      .preload('album')
      .if(query, (query) => {
        query.where('title', 'LIKE', `%${query}%`)
      })
      .orderBy(sort)

    const tracks = await tracksQuery.paginate(page, limit)
    return response.json(tracks)
  }

  public async communities({ request, response }: HttpContext) {
    const { query, sort = 'name' } = request.qs()
    const page = request.input('page', 1)
    const limit = request.input('limit', 20)

    const communitiesQuery = Community.query()
      .withCount('members')
      .if(query, (query) => {
        query.where('name', 'LIKE', `%${query}%`)
          .orWhere('description', 'LIKE', `%${query}%`)
      })
      .orderBy(sort)

    const communities = await communitiesQuery.paginate(page, limit)
    return response.json(communities)
  }
}