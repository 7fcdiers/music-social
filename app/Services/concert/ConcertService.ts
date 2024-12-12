import Concert from '#app/Models/Concert'
import { DateTime } from 'luxon'
import { LocationService } from '../location/LocationService.js'
import { ConcertQueryBuilder } from './ConcertQueryBuilder.js'
import { ConcertFilters, ConcertPaginationOptions, CreateConcertData } from './types.js'

export class ConcertService {
  constructor(
    private locationService: LocationService,
    private queryBuilder: ConcertQueryBuilder
  ) {}

  public async createConcert(data: CreateConcertData) {
    const { latitude, longitude } = await this.locationService.geocodeAddress(data.address)
    
    const concert = await Concert.create({
      ...data,
      latitude,
      longitude
    })

    await concert.related('artists').attach(data.artistIds)
    
    return concert
  }

  public async getConcerts(
    filters: ConcertFilters = {},
    options: ConcertPaginationOptions = {}
  ) {
    const query = this.queryBuilder.build(filters, options)
    return query.paginate(options.page || 1, options.limit || 12)
  }

  public async getUpcomingConcerts(options: ConcertPaginationOptions = {}) {
    return this.getConcerts(
      { fromDate: DateTime.now() },
      { ...options, orderBy: 'date', order: 'asc' }
    )
  }

  public async addToCommunityConcert(concertId: number, communityId: number) {
    const concert = await Concert.findOrFail(concertId)
    await concert.related('communities').attach([communityId])
    return concert
  }
}