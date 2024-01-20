import { SetStateAction, Dispatch } from "react";
import { useState } from "react";
import { BsSearchHeart } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { TbReload } from "react-icons/tb";
import apiService from "../ApiService";
import {
  IArtist,
  ICollection,
  ISearchResult,
  ISearchResults,
  ITopTracks,
  ITrack,
} from "../../types";

interface SearchComponentProps {
  searchedArtist: string;
  setSearchedArtist: Dispatch<SetStateAction<string>>;
}

const Search = ({
  searchedArtist,
  setSearchedArtist,
}: SearchComponentProps) => {
  const [topTracks, setTopTracks] = useState<ITrack[]>([]);
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
  const [artistId, setArtistId] = useState<string>("");
  const [showTopTracks, setShowTopTracks] = useState<boolean>(false);
  const [heartClicked, setHeartClicked] = useState<boolean>(false);
  const [heartColor, setHeartColor] = useState<string>("#eee");
  const [artistNameForDB, setArtistNameForDB] = useState<string>("");

  let artistName: string = searchedArtist.replace(/\s+/g, "+");

  async function handleArtistClick(artistId: string, name: string) {
    setTopTracks([]); //Neccessary?
    setArtistNameForDB(name);

    setArtistId(artistId);
    const relatedArtists: IArtist[] = await apiService.getRelatedArtists(
      artistId
    );
    const relatedArtistIds: string[] = relatedArtists.map(
      (artist: IArtist) => artist.id
    );
    const allTracks: ITopTracks[] = await apiService.getAllTracks(
      relatedArtistIds
    );
    const randomTracks: ITrack[] = getRandomTracksByArtist(allTracks);

    setTopTracks(randomTracks);

    setHeartColor("#eee"); //Reset heart colour

    setSearchResults([]);
    setShowTopTracks(true);
  }

  function getRandomTracksByArtist(tracks: ITopTracks[]) {
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

    return result;
  }

  const heartClick = async () => {
    //TODO make heart toggleable
    //TODO make heart add the songlist to the collection
    setHeartClicked(true);
    setHeartColor("red");

    let payload: ICollection = {
      artistName: artistNameForDB,
      playlists: [{ tracks: topTracks }],
    };

    await apiService.savePlaylist(payload);
  };

  async function handleSearchClick() {
    let artistIdItems: ISearchResults = await apiService.getArtistId(
      artistName
    );
    setSearchResults(artistIdItems.artists.items);
    setSearchedArtist("");
  }

  async function handleReloadClick() {
    setTopTracks([]);
    const relatedArtists: IArtist[] = await apiService.getRelatedArtists(
      artistId
    );

    const relatedArtistIds: string[] = relatedArtists.map(
      (artist) => artist.id
    );
    const allTracks: ITopTracks[] = await apiService.getAllTracks(
      relatedArtistIds
    );
    const randomTracks: ITrack[] = getRandomTracksByArtist(allTracks);

    setTopTracks(randomTracks);

    setSearchResults([]);
    setShowTopTracks(true);
  }

  return (
    <div>
      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          // size="50" // Perhaps changes size ???
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
        {searchResults.map((artist, index) => (
          <li
            className="artist-search-li"
            onClick={() => {
              handleArtistClick(artist.id, artist.name);
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
