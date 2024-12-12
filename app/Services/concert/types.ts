import { DateTime } from 'luxon'

export interface CreateConcertData {
  title: string
  description: string
  date: DateTime
  venue: string
  address: string
  artistIds: number[]
  albumId?: number
  ticketUrl?: string
}

export interface ConcertFilters {
  fromDate?: DateTime
  toDate?: DateTime
  artistId?: number
  genre?: string
  location?: {
    latitude: number
    longitude: number
    radius: number // in kilometers
  }
}

export interface ConcertPaginationOptions {
  page?: number
  limit?: number
  orderBy?: 'date' | 'title' | 'venue'
  order?: 'asc' | 'desc'
}