// Helper functions
import { ITrack, ITopTracks } from "../types";

export function getRandomTracksByArtist(tracks: ITopTracks[]) {
  //TODO Ensure this function does not include duplicate track names in the final result.
  const uniqueArtists = new Set();
  const result: ITrack[] = [];

  tracks.forEach((album) => {
    album.tracks.forEach((track) => {
      const artistId = track.artists[0].id;

      // Check if the artist ID is unique
      if (!uniqueArtists.has(artistId)) {
        // Add the artist ID to the set of unique artists
        uniqueArtists.add(artistId);

        // Randomly select a track for the artist
        const randomIndex = Math.floor(Math.random() * album.tracks.length);
        const randomTrack = album.tracks[randomIndex];

        // Add the random track to the result array
        result.push(randomTrack);
      }
    });
  });

  return result.slice(0, 30);
}

function rnd(limit: number) {
  return Math.floor(Math.random() * limit)
}

export function getTracksUpToNinetyMinutes(tracks: ITopTracks[]) {
  try {
    let target = 1000 * 60 * 90;
    let current = 0;
    const uniqueSongs = new Set<string>();
    const songList: ITrack[] = [];

    const tracksLen = tracks.length - 1;

    let maxAttempts: number = 0;
    tracks.forEach(artist => {
      maxAttempts += artist.tracks.length
    })

    while (current < target || maxAttempts == 0) {
      const a = rnd(tracksLen);
      const b = rnd(tracks[a].tracks.length - 1);
      const c = tracks[a].tracks[b];

      if (c.album.images?.length <= 3 && c?.preview_url) {
        if (!uniqueSongs.has(c.name)) {
          uniqueSongs.add(c.name)
          current += c.duration_ms;
          songList.push(c)
          maxAttempts--;
        }
      }
    }

    console.log(`${Math.floor(current / 1000 / 60)} minutes long`)
    return songList;
  } catch (error) {
    console.log(error);
    alert('Error fetching songs, please try again.')
    throw new Error('Error fetching songs, please try again.')
  }
}