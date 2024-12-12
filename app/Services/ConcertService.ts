import Concert from '#app/Models/Concert'
import { DateTime } from 'luxon'

export default class ConcertService {
  public async getUpcomingConcerts(page: number = 1, limit: number = 12) {
    return Concert.query()
      .where('date', '>', DateTime.now().toSQL())
      .preload('artists')
      .preload('album')
      .preload('ratings')
      .orderBy('date', 'asc')
      .paginate(page, limit)
  }

  public async getConcertsByArtist(artistId: number, page: number = 1) {
    return Concert.query()
      .whereHas('artists', (query) => {
        query.where('artist_id', artistId)
      })
      .preload('artists')
      .preload('album')
      .orderBy('date', 'asc')
      .paginate(page, 12)
  }

  public async getConcertsByAlbum(albumId: number, page: number = 1) {
    return Concert.query()
      .where('album_id', albumId)
      .preload('artists')
      .preload('album')
      .orderBy('date', 'asc')
      .paginate(page, 12)
  }

  public async getAverageRating(concertId: number): Promise<number> {
    const concert = await Concert.query()
      .where('id', concertId)
      .preload('ratings')
      .firstOrFail()

    if (concert.ratings.length === 0) return 0

    const sum = concert.ratings.reduce((acc, rating) => acc + rating.score, 0)
    return sum / concert.ratings.length
  }
}