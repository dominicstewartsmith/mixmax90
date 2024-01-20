interface IArtist {
  external_urls: {
    spotify: String;
  };
  href: String;
  id: String;
  name: String;
  type: String;
  uri: String;
}

interface IImage {
  height: Number;
  url: String;
  width: Number;
}

interface IAlbum {
  album_type: String;
  artists: [IArtist];
  external_urls: {
    spotify: String;
  };
  href: String;
  id: String;
  images: [IImage];
  is_playable: Boolean;
  name: String;
  release_date: String;
  release_date_precision: String;
  total_tracks: Number;
  type: String;
  uri: String;
}

interface ITrack {
  album: { albumSchema: IAlbum };
  artists: [IArtist];
  disc_number: Number;
  duration_ms: Number;
  explicit: Boolean;
  external_ids: {
    isrc: String;
  };
  external_urls: {
    spotify: String;
  };
  href: String;
  id: String;
  is_local: Boolean;
  is_playable: Boolean;
  name: String;
  popularity: Number;
  preview_url: String;
  track_number: Number;
  type: String;
  uri: String;
}

interface ITopTracks {
  tracks: [ITrack];
}

interface ICollection {
  artistName: String;
  playlists: [ITopTracks];
}

export type {ICollection, IAlbum, IArtist, IImage, ITopTracks, ITrack};