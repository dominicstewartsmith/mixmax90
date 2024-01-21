import React, { useState } from "react";
import CollectionListItem from "./CollectionListItem";


const CollectionList = ({ collectionsDB }) => {
  const [displayedSongs, setDisplayedSongs] = useState([]);
  const [displayedPlaylists, setDisplayedPlaylists] = useState([]);

  let artistList;

  // buttons for artist
  if (collectionsDB.length > 0) {
    artistList = collectionsDB.map((artist) => {
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
  function handleArtistClick(artist) {
    let artistPlaylists = artist.playlists.map((playlist, index) => {
      return (
        <details onClick={() => handlePlaylistClick(playlist)}>
          <summary>{index + 1}</summary>
        </details>
      );
    });
    setDisplayedPlaylists(artistPlaylists);
  }

  //display the songs
  function handlePlaylistClick(playlist) {
    let playlistSongs = playlist.tracks.map((song) => {
      return (
        <p>{song.name}</p>
      )
    });
    setDisplayedPlaylists(playlistSongs);
  }

  return (
    <>
      {artistList}
      {displayedPlaylists}
      {displayedSongs}
      <CollectionListItem />
    </>
  );
};

export default CollectionList;
