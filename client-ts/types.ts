interface IArtist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface ISearchResults {
  artists: {
    href: string,
    items: ISearchResult[],
    limit: number,
    next: string,
    offset: number,
    previous: string | null,
    total: number
  }
}

interface ISearchResult {
  external_urls: {
    spotify: string
  },
  followers: {
    href: string | null,
    total: number
  },
  genres: string[],
  href: string,
  id: string,
  images: IImage[],
  name: string,
  popularity: number,
  type: string,
  uri: string
}

interface IImage {
  height: number;
  url: string;
  width: number;
}

interface IAlbum {
  album_type: string;
  artists: IArtist[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: IImage[];
  is_playable: boolean;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

interface ITrack {
  album: { albumSchema: IAlbum };
  artists: IArtist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

interface ITopTracks {
  tracks: ITrack[];
}

interface ICollection {
  artistName: string;
  playlists: ITopTracks[];
}

export type {ICollection, IAlbum, IArtist, IImage, ITopTracks, ITrack, ISearchResult, ISearchResults};