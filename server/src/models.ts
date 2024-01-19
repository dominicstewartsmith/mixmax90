const db = require("./db");
const Schema = db.Schema;

const artistSchema = new Schema({
  external_urls: {
    spotify: String,
  },
  href: String,
  id: String,
  name: String,
  type: String,
  uri: String,
});

const imageSchema = new Schema({
  height: Number,
  url: String,
  width: Number,
});

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