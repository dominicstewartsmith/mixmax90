import React from "react";
import { useState } from "react";
import { BsSearchHeart } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { TbReload } from "react-icons/tb";
import apiService from "../ApiService";

const Search = ({ searchedArtist, setSearchedArtist }) => {
  const [topTracks, setTopTracks] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState([]);
  const [artistId, setArtistId] = useState(null);
  const [showTopTracks, setShowTopTracks] = useState(false);
  const [heartColor, setHeartColor] = useState("#eee");

  let artistName = searchedArtist.replace(/\s+/g, "+");

  async function handleArtistClick(artistId) {
    setTopTracks([]); //Neccessary?

    setArtistId(artistId);
    const relatedArtists = await apiService.getRelatedArtists(artistId);

    const relatedArtistIds = relatedArtists.map((artist) => artist.id);
    const allTracks = await apiService.getAllTracks(relatedArtistIds);
    const randomTracks = getRandomTracksByArtist(allTracks);

    setTopTracks(randomTracks);

    await apiService.savePlaylist(randomTracks);
    setHeartColor("#eee"); //Reset heart colour

    setSelectedArtist([]);
    setShowTopTracks(true);
  }

  function getRandomTracksByArtist(tracks) {
    const uniqueArtists = new Set();
    const result = [];

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

    return result;
  }

  const heartClick = () => {

    // Update the color to red when clicked
    setHeartColor("red");

    // Your additional onClick logic goes here
    console.log("Heart clicked!");
  };

  async function handleSearchClick() {
    let artistIdItems = await apiService.getArtistId(artistName);

    console.log('1', artistIdItems)
    console.log('2', artistIdItems.artists.items)

    setSelectedArtist(artistIdItems.artists.items);
    setSearchedArtist("");
  }

  async function handleReloadClick() {
    setTopTracks([]);
    const relatedArtists = await apiService.getRelatedArtists(artistId);

    const relatedArtistIds = relatedArtists.map((artist) => artist.id);
    const allTracks = await apiService.getAllTracks(relatedArtistIds);
    const randomTracks = getRandomTracksByArtist(allTracks);

    setTopTracks(randomTracks);
    await apiService.savePlaylist(randomTracks);

    setSelectedArtist([]);
    setShowTopTracks(true);
  }

  async function handleReloadClick(artistId) {
    setTopTracks([]);
    await apiService.getRelatedArtists(artistId);
    setSelectArtist([]);
    setShowTopTracks(true);
  }

  return (
    <div>
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          size="50"
          name=""
          id="search"
          role="searchbox"
          placeholder=" Find music like..."
          value={searchedArtist}
          onChange={(e) => setSearchedArtist(e.target.value)}
        />
        <button onClick={handleSearchClick} type="submit" id="submitButton">
          <BsSearchHeart />
        </button>
      </form>

      <ul className="artist-search-ul">
        {selectedArtist.map((artist, index) => (
          <li
            className="artist-search-li"
            onClick={() => {
              handleArtistClick(artist.id);
            }}
            key={index}
          >
            <div className="artist-search-thumb-container">
              {artist.images[2] && (
                <img
                  className="artist-search-thumb-img"
                  src={artist.images[2].url}
                  alt=""
                />
              )}
            </div>
            <div className="artist-search-name">{artist.name}</div>
            {/* Id: {artist.id} */}
          </li>
        ))}
      </ul>

      {showTopTracks && (
        <ul className="top-tracks-ul">
          <div className="top-tracks-ul-title-container">
            <div
              className="top-tracks-ul-title-container-icon"
              onClick={handleReloadClick}
            >
              <TbReload />
            </div>
            <div className="top-tracks-title">Nice work!</div>
            <div
              className="top-tracks-ul-title-container-icon"
              id="heart"
              style={{ color: heartColor }}
              onClick={heartClick}
            >
              <GoHeart />
            </div>
          </div>
          {topTracks.map((track, index) => (
            <li className="top-tracks-li" key={index}>
              {/* { console.log('TRACK STRUCTURE',track)} */}
              <div className="top-tracks-thumb-container">
                {track.album.images[2] && (
                  <img
                    className="top-tracks-thumb-img"
                    src={track.album.images[2].url}
                    alt=""
                  />
                )}
              </div>
              <div className="track-details">
                <div className="track-details-track">{`${track.name}`}</div>
                <div className="track-details-artist">{`${track.artists[0].name}`}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
