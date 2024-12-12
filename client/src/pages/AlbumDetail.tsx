import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api.js';
import { Album, Track } from '../types/music.js';
import LoadingSpinner from '../components/common/LoadingSpinner.js';
import ErrorMessage from '../components/common/ErrorMessage.js';
import TrackList from '../components/music/TrackList.js';
import AlbumInfo from '../components/music/AlbumInfo.js';
import RatingSection from '../components/music/RatingSection.js';
import CommentSection from '../components/music/CommentSection.js';

export default function AlbumDetail() {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAlbumData();
  }, [id]);

  const fetchAlbumData = async () => {
    try {
      const response = await api.get(`/albums/${id}`);
      setAlbum(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load album details');
      console.error('Error fetching album details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRating = async (score: number) => {
    try {
      await api.post(`/albums/${id}/rate`, { score });
      fetchAlbumData();
    } catch (err) {
      setError('Failed to submit rating');
    }
  };

  const handleComment = async (content: string) => {
    try {
      await api.post(`/albums/${id}/comment`, { content });
      fetchAlbumData();
    } catch (err) {
      setError('Failed to submit comment');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!album) return <ErrorMessage message="Album not found" />;

  return (
    <div className="space-y-8">
      <AlbumInfo album={album} />

      {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tracks</h2>
            <TrackList tracks={album.tracks} />
          </section>
        </div>

        <div className="space-y-6">
          <RatingSection
            rating={album.averageRating}
            totalRatings={album.totalRatings}
            onRate={handleRating}
          />

          <CommentSection
            comments={album.comments}
            onComment={handleComment}
          />
        </div>
      </div>
    </div>
  );
}