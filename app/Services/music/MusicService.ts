import { Artist, Track } from '#app/Models/index'
import { DeezerService } from './DeezerService.js'
import { SpotifyService } from './SpotifyService.js'

export class MusicService {
  constructor(
    private deezerService: DeezerService,
    private spotifyService: SpotifyService
  ) {}

  public async searchTracks(query: string) {
    const [spotifyTracks, deezerTracks] = await Promise.all([
      this.spotifyService.searchTracks(query),
      this.deezerService.searchTracks(query)
    ])

    return this.mergeTracks(spotifyTracks, deezerTracks)
  }

  public async searchArtists(query: string) {
    const [spotifyArtists, deezerArtists] = await Promise.all([
      this.spotifyService.searchArtists(query),
      this.deezerService.searchArtists(query)
    ])

    return this.mergeArtists(spotifyArtists, deezerArtists)
  }

  private mergeTracks(spotifyTracks: Track[], deezerTracks: Track[]): Track[] {
    const mergedTracks = new Map<string, Track>()
    
    spotifyTracks.forEach(track => {
      mergedTracks.set(track.title.toLowerCase(), track)
    })

    deezerTracks.forEach(track => {
      const key = track.title.toLowerCase()
      if (mergedTracks.has(key)) {
        const existing = mergedTracks.get(key)!
        mergedTracks.set(key, {
          ...existing,
          deezerId: track.deezerId
        })
      } else {
        mergedTracks.set(key, track)
      }
    })

    return Array.from(mergedTracks.values())
  }

  private mergeArtists(spotifyArtists: Artist[], deezerArtists: Artist[]): Artist[] {
    const mergedArtists = new Map<string, Artist>()
    
    spotifyArtists.forEach(artist => {
      mergedArtists.set(artist.name.toLowerCase(), artist)
    })

    deezerArtists.forEach(artist => {
      const key = artist.name.toLowerCase()
      if (mergedArtists.has(key)) {
        const existing = mergedArtists.get(key)!
        mergedArtists.set(key, {
          ...existing,
          deezerId: artist.deezerId
        })
      } else {
        mergedArtists.set(key, artist)
      }
    })

    return Array.from(mergedArtists.values())
  }
}