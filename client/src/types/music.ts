export interface Artist {
  id: number;
  name: string;
  imageUrl: string;
  bio?: string;
  spotifyId?: string;
  deezerId?: string;
}

export interface Album {
  id: number;
  title: string;
  releaseDate: Date;
  coverUrl: string;
  genre: string;
  artist: Artist;
  tracks: Track[];
  averageRating: number;
  totalRatings: number;
  comments: Comment[];
  spotifyId?: string;
  deezerId?: string;
}

export interface Track {
  id: number;
  title: string;
  duration: number;
  previewUrl: string;
  artist: Artist;
  album?: Album;
  spotifyId?: string;
  deezerId?: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  user: {
    id: number;
    name: string;
    avatarUrl: string;
  };
}