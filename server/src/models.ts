import db from "./db";
import { Schema, model, connect } from 'mongoose';
// const Schema = db.Schema;

interface IArtist {
  external_urls: {
    spotify: String,
  },
  href: String,
  id: String,
  name: String,
  type: String,
  uri: String,
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
  height: Number,
  url: String,
  width: Number,
}

const imageSchema = new Schema<IImage>({
  height: Number,
  url: String,
  width: Number,
});

interface IAlbum {
  album_type: String,
  artists: [typeof artistSchema],
  external_urls: {
    spotify: String,
  },
  href: String,
  id: String,
  images: [typeof imageSchema],
  is_playable: Boolean,
  name: String,
  release_date: String,
  release_date_precision: String,
  total_tracks: Number,
  type: String,
  uri: String,
}

const albumSchema = new Schema({
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
})

const trackSchema = new Schema({
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
})

const topTracksSchema = new Schema({
  tracks: [trackSchema]
})

const collectionSchema = new Schema({
  artistName: String,
  playlists: [topTracksSchema]
})

const Collection = db.model("Collection", collectionSchema);


module.exports = Collection;