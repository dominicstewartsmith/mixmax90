import { useState, useContext } from "react";
import { BsSearchHeart } from "react-icons/bs";
import { GoHeart } from "react-icons/go";
import { TbReload } from "react-icons/tb";
import apiService from "../ApiService";
import { getRandomTracksByArtist, getTracksUpToNinetyMinutes } from "../helpers";
import {
  IArtist,
  ICollection,
  ISearchResult,
  ISearchResults,
  ITopTracks,
  ITrack,
  Token
} from "../../types";
import { DataContext } from '../App'

type SearchPropsType = {
  currentToken: Token
}
const Search = ({currentToken}: SearchPropsType) => {
  const contextValue = useContext(DataContext)

  if (!contextValue) {
    throw new Error('No context.');
  }
  const {handleUpdateDB} = contextValue;

  const [searchedArtist, setSearchedArtist] = useState<string>("");
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
    const relatedArtists: IArtist[] = await apiService.getRelatedArtists(artistId, currentToken);
    const relatedArtistIds: string[] = relatedArtists.map((artist: IArtist) => artist.id);
    const allTracks: ITopTracks[] = await apiService.getAllTracks(relatedArtistIds, currentToken);
    const randomTracks: ITrack[] = getTracksUpToNinetyMinutes(allTracks);
    // const randomTracks: ITrack[] = getRandomTracksByArtist(allTracks);
    // getRandomTracksByArtist(allTracks)

    setTopTracks(randomTracks);
    setHeartColor("#eee"); //Reset heart colour
    setSearchResults([]);
    setShowTopTracks(true);
  }

  const heartClick = async () => {
    //TODO make heart toggleable
    //TODO make heart add the songlist to the collection
    //TODO saved collections should be available to see immediately (currently only visible after refresh)
    setHeartClicked(true);
    setHeartColor("red");

    let payload: ICollection = {
      artistName: artistNameForDB,
      playlists: [{ tracks: topTracks }],
    };

    await apiService.savePlaylist(payload);
    handleUpdateDB();
  };

  async function handleSearchClick() {
    let artistIdItems: ISearchResults = await apiService.getArtistId(
      artistName, currentToken
    );
    setSearchResults(artistIdItems.artists.items);
    setSearchedArtist("");
  }

  async function handleReloadClick() {
    setTopTracks([]);
    setHeartColor("#eee"); //Reset heart colour
    const relatedArtists: IArtist[] = await apiService.getRelatedArtists(
      artistId, currentToken
    );

    const relatedArtistIds: string[] = relatedArtists.map(
      (artist) => artist.id
    );
    const allTracks: ITopTracks[] = await apiService.getAllTracks(
      relatedArtistIds, currentToken
    );
    const randomTracks: ITrack[] = getTracksUpToNinetyMinutes(allTracks);
    // getRandomTracksByArtist(allTracks)
    // const randomTracks: ITrack[] = getRandomTracksByArtist(allTracks);

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
            {/* //TODO Change this "Nice work!" to something else */}
            {/* <div className="top-tracks-title">Nice work!</div> */}
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
