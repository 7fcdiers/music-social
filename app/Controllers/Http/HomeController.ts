import { HttpContext } from '@adonisjs/core/http'
import Album from '#app/Models/Album'
import CommunityNews from '#app/Models/CommunityNews'
import MusicApiService from '#app/Services/MusicApiService'

export default class HomeController {
  private musicApiService: MusicApiService

  constructor() {
    this.musicApiService = new MusicApiService()
  }

  public async index({ request, view }: HttpContext) {
    const page = request.input('page', 1)
    const genre = request.input('genre')
    const musicService = request.input('musicService', 'spotify')

    const newsQuery = CommunityNews.query()
      .preload('author')
      .preload('community')
      .orderBy('created_at', 'desc')
    
    const albumsQuery = Album.query()
      .preload('artist')
      .orderBy('release_date', 'desc')

    if (genre) {
      albumsQuery.where('genre', genre)
    }

    const [news, albums] = await Promise.all([
      newsQuery.paginate(page, 10),
      albumsQuery.paginate(page, 12)
    ])

    let topTracks
    try {
      if (musicService === 'spotify') {
        topTracks = await this.musicApiService.getSpotifyTopTracks()
      } else {
        topTracks = await this.musicApiService.getDeezerTopTracks()
      }
    } catch (error) {
      topTracks = []
    }

    return view.render('home', {
      news,
      albums,
      topTracks,
      currentMusicService: musicService,
      currentGenre: genre
    })
  }
}