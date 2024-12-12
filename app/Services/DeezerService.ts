import axios from 'axios'
import env from '#start/env/index'
import { DateTime } from 'luxon'

export default class DeezerService {
  private api = axios.create({
    baseURL: 'https://api.deezer.com',
  })

  public async getTopTracks() {
    try {
      const response = await this.api.get('/chart/tracks')
      return response.data.data.map((track: any) => ({
        title: track.title,
        duration: track.duration,
        deezerId: track.id.toString(),
        artist: {
          name: track.artist.name,
          deezerId: track.artist.id.toString(),
        },
        album: {
          title: track.album.title,
          coverUrl: track.album.cover_xl,
          deezerId: track.album.id.toString(),
        },
      }))
    } catch (error) {
      console.error('Error fetching Deezer top tracks:', error)
      throw error
    }
  }

  public async searchArtist(query: string) {
    try {
      const response = await this.api.get(`/search/artist?q=${query}`)
      return response.data.data.map((artist: any) => ({
        name: artist.name,
        imageUrl: artist.picture_xl,
        deezerId: artist.id.toString(),
      }))
    } catch (error) {
      console.error('Error searching Deezer artists:', error)
      throw error
    }
  }

  public async getArtistDetails(artistId: string) {
    try {
      const response = await this.api.get(`/artist/${artistId}`)
      return {
        name: response.data.name,
        imageUrl: response.data.picture_xl,
        deezerId: response.data.id.toString(),
      }
    } catch (error) {
      console.error('Error fetching Deezer artist details:', error)
      throw error
    }
  }
}