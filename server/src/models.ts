import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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

const artistSchema = new Schema<IArtist>({
  external_urls: {
    spotify: String,
  },
  href: String,
  id: String,
  name: String,
  type: String,
  uri: String,
});

interface IImage {
  height: Number;
  url: String;
  width: Number;
}

const imageSchema = new Schema<IImage>({
  height: Number,
  url: String,
  width: Number,
});

interface IAlbum {
  album_type: String;
  artists: [typeof artistSchema];
  external_urls: {
    spotify: String;
  };
  href: String;
  id: String;
  images: [typeof imageSchema];
  is_playable: Boolean;
  name: String;
  release_date: String;
  release_date_precision: String;
  total_tracks: Number;
  type: String;
  uri: String;
}

const albumSchema = new Schema<IAlbum>({
  album_type: String,
  artists: [artistSchema],
  external_urls: {
    spotify: String,
  },
  href: String,
  id: String,
  images: [imageSchema],
  is_playable: Boolean,
  name: String,
  release_date: String,
  release_date_precision: String,
  total_tracks: Number,
  type: String,
  uri: String,
});

interface ITrack {
  album: { albumSchema: IAlbum };
  artists: [typeof artistSchema];
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

const trackSchema = new Schema<ITrack>({
  album: { albumSchema },
  artists: [artistSchema],
  disc_number: Number,
  duration_ms: Number,
  explicit: Boolean,
  external_ids: {
    isrc: String,
  },
  external_urls: {
    spotify: String,
  },
  href: String,
  id: String,
  is_local: Boolean,
  is_playable: Boolean,
  name: String,
  popularity: Number,
  preview_url: String,
  track_number: Number,
  type: String,
  uri: String,
});

interface ITopTracks {
  tracks: [typeof trackSchema];
}

const topTracksSchema = new Schema<ITopTracks>({
  tracks: [trackSchema],
});

interface ICollection {
  artistName: String;
  playlists: [typeof topTracksSchema];
}

const collectionSchema = new Schema<ICollection>({
  artistName: String,
  playlists: [topTracksSchema],
});

interface IToken {
  token: string,
  time: number
}
const tokenSchema = new Schema<IToken>({
  token: String,
  time: Number
})

const TokenModel = mongoose.model("Token", tokenSchema);
const Collection = mongoose.model("Collection", collectionSchema);
export { Collection, IToken, TokenModel, ICollection, mongoose };
