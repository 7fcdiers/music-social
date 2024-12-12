import SpotifyService from './SpotifyService.js'
import DeezerService from './DeezerService.js'
import Artist from '#app/Models/Artist'
import Album from '#app/Models/Album'
import Track from '#app/Models/Track'
import { DateTime } from 'luxon'
import logger from '@adonisjs/core/services/logger'

export default class MusicSyncService {
  private spotifyService: SpotifyService
  private deezerService: DeezerService

  constructor() {
    this.spotifyService = new SpotifyService()
    this.deezerService = new DeezerService()
  }

  public async syncTopTracks() {
    try {
      logger.info('Starting music sync process')
      
      // Fetch data from both services
      const [spotifyTracks, deezerTracks] = await Promise.all([
        this.spotifyService.getTopTracks(),
        this.deezerService.getTopTracks(),
      ])

      // Process artists first
      const artistsMap = new Map()
      
      // Process Spotify artists
      for (const track of spotifyTracks) {
        const artistKey = track.artist.name.toLowerCase()
        if (!artistsMap.has(artistKey)) {
          artistsMap.set(artistKey, {
            name: track.artist.name,
            spotifyId: track.artist.spotifyId,
            imageUrl: track.artist.imageUrl,
          })
        }
      }

      // Process Deezer artists
      for (const track of deezerTracks) {
        const artistKey = track.artist.name.toLowerCase()
        const existingArtist = artistsMap.get(artistKey)
        
        if (existingArtist) {
          existingArtist.deezerId = track.artist.deezerId
        } else {
          artistsMap.set(artistKey, {
            name: track.artist.name,
            deezerId: track.artist.deezerId,
            imageUrl: track.artist.imageUrl,
          })
        }
      }

      // Sync artists to database
      for (const [_, artistData] of artistsMap) {
        const artist = await Artist.firstOrCreate(
          { name: artistData.name },
          {
            ...artistData,
            bio: '', // Fetch bio in a separate process
          }
        )

        if (artistData.spotifyId) {
          artist.spotifyId = artistData.spotifyId
        }
        if (artistData.deezerId) {
          artist.deezerId = artistData.deezerId
        }
        if (artistData.imageUrl) {
          artist.imageUrl = artistData.imageUrl
        }
        
        await artist.save()
      }

      logger.info('Music sync completed successfully')
    } catch (error) {
      logger.error('Error during music sync:', error)
      throw error
    }
  }
}