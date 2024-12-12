import axios from 'axios'

export default class MusicApiService {
  private spotifyApi
  private deezerApi

  constructor() {
    this.spotifyApi = axios.create({
      baseURL: 'https://api.spotify.com/v1',
    })

    this.deezerApi = axios.create({
      baseURL: 'https://api.deezer.com',
    })
  }

  public async getSpotifyTopTracks() {
    try {
      const response = await this.spotifyApi.get('/charts/tracks')
      return response.data
    } catch (error) {
      console.error('Error fetching Spotify top tracks:', error)
      throw error
    }
  }

  public async getDeezerTopTracks() {
    try {
      const response = await this.deezerApi.get('/chart/tracks')
      return response.data
    } catch (error) {
      console.error('Error fetching Deezer top tracks:', error)
      throw error
    }
  }
}