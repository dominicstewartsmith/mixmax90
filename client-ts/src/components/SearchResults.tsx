import { DataContext } from '../App'
import { useState, useContext } from "react";
import { getTracksUpToNinetyMinutes } from "../helpers";
import apiService from "../ApiService";

import {
  IArtist,
  ISearchResult,
  ITopTracks,
  ITrack,
  Token
} from "../../types";
import PlaylistResults from './PlaylistResults'

type SearchResultsPropsType = {
  searchResults: ISearchResult[],
  currentToken: Token,
  clearSearchResults: () => void
}

export default function SearchResults({ searchResults, currentToken, clearSearchResults }: SearchResultsPropsType) {
  const [artistId, setArtistId] = useState<string>("");
  const [artistNameForDB, setArtistNameForDB] = useState<string>("");
  const [heartColor, setHeartColor] = useState<string>("#eee");

  const contextValue = useContext(DataContext)

  if (!contextValue) {
    throw new Error('No context.');
  }

  const { topTracks, setTopTracks, showTopTracks, setShowTopTracks } = contextValue;

  function resetHeartColor(color: string | undefined) {
    color ? setHeartColor(color) : setHeartColor('#eee')
  }

  async function handleArtistClick(artistId: string, name: string) {
    setTopTracks([]); //Neccessary?
    setArtistNameForDB(name);

    setArtistId(artistId);
    const relatedArtists: IArtist[] = await apiService.getRelatedArtists(artistId, currentToken);
    const relatedArtistIds: string[] = relatedArtists.map((artist: IArtist) => artist.id);
    const allTracks: ITopTracks[] = await apiService.getAllTracks(relatedArtistIds, currentToken);
    const randomTracks: ITrack[] = getTracksUpToNinetyMinutes(allTracks);

    setTopTracks(randomTracks);
    setHeartColor("#eee"); //Reset heart colour
    clearSearchResults();
    setShowTopTracks(true);
  }

  return (
    <div>
      <ul className="artist-search-ul" data-cy="artist-search-list">
        {searchResults.map((artist, index) => (
          <li
            className="artist-search-li"
            data-cy="artist-search-item"
            data-testid="artist-search-item"
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
        <>
          <PlaylistResults heartColor={heartColor} resetHeartColor={resetHeartColor} currentToken={currentToken} artistNameForDB={artistNameForDB} topTracks={topTracks} artistId={artistId} clearSearchResults={clearSearchResults} />
        </>
      )}
    </div>
  );
}