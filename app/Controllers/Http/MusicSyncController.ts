import { HttpContext } from '@adonisjs/core/http'
import MusicSyncService from '#app/Services/MusicSyncService'

export default class MusicSyncController {
  private musicSyncService: MusicSyncService

  constructor() {
    this.musicSyncService = new MusicSyncService()
  }

  public async syncSpotify({ response }: HttpContext) {
    try {
      await this.musicSyncService.syncTopTracks()
      return response.json({ message: 'Spotify sync completed successfully' })
    } catch (error) {
      return response.status(500).json({
        error: 'Failed to sync with Spotify',
        details: error.message
      })
    }
  }

  public async syncDeezer({ response }: HttpContext) {
    try {
      await this.musicSyncService.syncTopTracks()
      return response.json({ message: 'Deezer sync completed successfully' })
    } catch (error) {
      return response.status(500).json({
        error: 'Failed to sync with Deezer',
        details: error.message
      })
    }
  }
}