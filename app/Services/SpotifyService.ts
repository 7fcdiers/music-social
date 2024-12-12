import SpotifyWebApi from 'spotify-web-api-node';
import env from '#start/env';
import { DateTime } from 'luxon';

export default class SpotifyService {
  private spotifyApi: SpotifyWebApi;

  constructor() {
    this.spotifyApi = new SpotifyWebApi({
      clientId: env.get('SPOTIFY_CLIENT_ID'),
      clientSecret: env.get('SPOTIFY_CLIENT_SECRET'),
    });
  }

  private async authenticate() {
    const data = await this.spotifyApi.clientCredentialsGrant();
    this.spotifyApi.setAccessToken(data.body.access_token);
  }

  public async getTopTracks() {
    await this.authenticate();
    const data = await this.spotifyApi.getPlaylistTracks(env.get('SPOTIFY_TOP_TRACKS_PLAYLIST_ID'));

    return data.body.items.map(item => ({
      title: item.track.name,
      artist: item.track.artists[0].name,
      albumTitle: item.track.album.name,
      albumCoverUrl: item.track.album.images[0]?.url,
      duration: Math.floor(item.track.duration_ms / 1000),
      spotifyId: item.track.id,
    }));
  }

  public async getArtistDetails(artistId: string) {
    await this.authenticate();
    const data = await this.spotifyApi.getArtist(artistId);

    return {
      name: data.body.name,
      imageUrl: data.body.images[0]?.url,
      spotifyId: data.body.id,
      genres: data.body.genres,
    };
  }

  public async getAlbumDetails(albumId: string) {
    await this.authenticate();
    const data = await this.spotifyApi.getAlbum(albumId);

    return {
      title: data.body.name,
      releaseDate: DateTime.fromISO(data.body.release_date),
      coverUrl: data.body.images[0]?.url,
      spotifyId: data.body.id,
      genre: data.body.genres[0] || 'Unknown',
    };
  }
}
