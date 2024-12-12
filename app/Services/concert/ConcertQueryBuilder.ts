import Concert from '#app/Models/Concert'
import { ConcertFilters, ConcertPaginationOptions } from './types.js'

export class ConcertQueryBuilder {
  public build(filters: ConcertFilters, options: ConcertPaginationOptions) {
    const query = Concert.query()
      .preload('artists')
      .preload('album')
      .preload('ratings')
      .preload('communities')

    this.applyDateFilters(query, filters)
    this.applyArtistFilter(query, filters)
    this.applyGenreFilter(query, filters)
    this.applyLocationFilter(query, filters)
    this.applySorting(query, options)

    return query
  }

  private applyDateFilters(query: any, filters: ConcertFilters) {
    if (filters.fromDate) {
      query.where('date', '>=', filters.fromDate.toSQL())
    }
    if (filters.toDate) {
      query.where('date', '<=', filters.toDate.toSQL())
    }
  }

  private applyArtistFilter(query: any, filters: ConcertFilters) {
    if (filters.artistId) {
      query.whereHas('artists', (artistQuery) => {
        artistQuery.where('id', filters.artistId!)
      })
    }
  }

  private applyGenreFilter(query: any, filters: ConcertFilters) {
    if (filters.genre) {
      query.whereHas('album', (albumQuery) => {
        albumQuery.where('genre', filters.genre!)
      })
    }
  }

  private applyLocationFilter(query: any, filters: ConcertFilters) {
    if (filters.location) {
      const { latitude, longitude, radius } = filters.location
      // Haversine formula for calculating distance
      query.whereRaw(`
        (6371 * acos(
          cos(radians(?)) * 
          cos(radians(latitude)) * 
          cos(radians(longitude) - radians(?)) + 
          sin(radians(?)) * 
          sin(radians(latitude))
        )) <= ?
      `, [latitude, longitude, latitude, radius])
    }
  }

  private applySorting(query: any, options: ConcertPaginationOptions) {
    const orderBy = options.orderBy || 'date'
    const order = options.order || 'asc'
    query.orderBy(orderBy, order)
  }
}