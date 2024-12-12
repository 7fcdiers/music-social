export interface Concert {
  id: number;
  title: string;
  description: string;
  date: string;
  venue: string;
  address: string;
  latitude: number;
  longitude: number;
  ticketUrl: string | null;
  albumId: number | null;
  artists: Array<{
    id: number;
    name: string;
    imageUrl: string;
  }>;
  album?: {
    id: number;
    title: string;
    coverUrl: string;
  };
  ratings: Array<{
    id: number;
    score: number;
    userId: number;
  }>;
  comments: Array<{
    id: number;
    content: string;
    createdAt: string;
    user: {
      id: number;
      username: string;
      avatarUrl: string;
    };
  }>;
  communities: Array<{
    id: number;
    name: string;
  }>;
}