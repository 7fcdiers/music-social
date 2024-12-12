import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api.js';
import { Artist, Album, Track } from '../types/music.js';
import LoadingSpinner from '../components/common/LoadingSpinner.js';
import ErrorMessage from '../components/common/ErrorMessage.js';
import AlbumCard from '../components/music/AlbumCard.js';
import TrackList from '../components/music/TrackList.js';

export default function ArtistDetail() {
  const { id } = useParams<{ id: string }>();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchArtistData();
  }, [id]);

  const fetchArtistData = async () => {
    try {
      const [artistRes, albumsRes, tracksRes] = await Promise.all([
        api.get(`/artists/${id}`),
        api.get(`/artists/${id}/albums`),
        api.get(`/artists/${id}/top-tracks`),
      ]);

      setArtist(artistRes.data);
      setAlbums(albumsRes.data);
      setTopTracks(tracksRes.data);
      setError(null);
    } catch (err) {
      setError('Failed to load artist details');
      console.error('Error fetching artist details:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!artist) return <ErrorMessage message="Artist not found" />;

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-96">
        <img
          src={artist.imageUrl || '/default-artist.jpg'}
          alt={artist.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="text-5xl font-bold text-white mb-4">{artist.name}</h1>
          {artist.bio && (
            <p className="text-lg text-gray-200 max-w-3xl">{artist.bio}</p>
          )}
        </div>
      </div>

      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

      {/* Popular Albums */}
      <section>
        <h2 className="heading-2 mb-6">Popular Albums</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      {/* Top Tracks */}
      <section>
        <h2 className="heading-2 mb-6">Top Tracks</h2>
        <TrackList tracks={topTracks} />
      </section>
    </div>
  );
}