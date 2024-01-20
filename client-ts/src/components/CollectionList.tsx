import React, { useState } from "react";
import { ICollection, ITopTracks, ITrack } from "../../types";

interface CollectionListComponents {
  collectionsDB: ICollection[]
}

const CollectionList = ({ collectionsDB }: CollectionListComponents) => {
  const [displayedSongs, setDisplayedSongs] = useState<React.ReactElement[]>([]);
  const [displayedPlaylists, setDisplayedPlaylists] = useState<React.ReactElement[]>([]);

  //TODO Double check these types
  let artistList: React.ReactElement[] = [];
  // let artistList: React.JSX.Element[];
  // let artistList: React.ReactElement<ICollection[]>;

  // buttons for artist
  if (collectionsDB.length > 0) {
    artistList = collectionsDB.map((artist: ICollection) => {
      return (
        <div
          className="artist-search-li"
          onClick={() => handleArtistClick(artist)}
        >
          {artist.artistName}
        </div>
      );
    });
  }

  // buttons for playlists
  function handleArtistClick(artist: ICollection) {
    let artistPlaylists: React.ReactElement[] = artist.playlists.map((playlist: ITopTracks, index: number) => {
      return (
        <details onClick={() => handlePlaylistClick(playlist)}>
          <summary>{index + 1}</summary>
        </details>
      );
    });
    setDisplayedPlaylists(artistPlaylists);
  }

  //display the songs
  function handlePlaylistClick(playlist: ITopTracks) {
    let playlistSongs: React.ReactElement[] = playlist.tracks.map((song: ITrack) => {
      return (
        <p>{song.name}</p>
      )
    });
    setDisplayedSongs(playlistSongs);
  }

  return (
    <>
      {artistList}
      {displayedPlaylists}
      {displayedSongs}
    </>
  );
};

export default CollectionList;
