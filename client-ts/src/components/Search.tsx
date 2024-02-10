import { useState } from "react";
import { BsSearchHeart } from "react-icons/bs";
import apiService from "../ApiService";
import {
  ISearchResult,
  ISearchResults,
  Token
} from "../../types";
import SearchResults from "./SearchResults";

type SearchPropsType = {
  currentToken: Token
}
const Search = ({currentToken}: SearchPropsType) => {
  const [searchedArtist, setSearchedArtist] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);

  let artistName: string = searchedArtist.replace(/\s+/g, "+");

  async function handleSearchClick() {
    let artistIdItems: ISearchResults = await apiService.getArtistId(
      artistName, currentToken
    );
    setSearchResults(artistIdItems.artists.items);
    setSearchedArtist("");
    setShowResults(true);
  }

  function clearSearchResults() {
    setSearchResults([])
  }

  return (
    <>
    {/* <button onClick={async () => {
      console.log(currentToken)
      const id: string = import.meta.env.VITE_APP_SPOTIFY_USER_ID;
      await apiService.getUserPlaylists(currentToken, id)
    }}
      >GET USER PLAYLISTS</button>
      <button onClick={async () => await apiService.saveToken(currentToken)}>SAVE TOKEN</button>
      <button onClick={async () => console.log(await apiService.retrieveToken())}>LOAD TOKEN</button>
      <button onClick={async () => await apiService.deleteToken()}>DELETE TOKEN</button> */}
      {/* <button onClick={() => {
        window.localStorage.setItem("token", currentToken.token)
        window.localStorage.setItem("issued", currentToken.time.toString())
      }}>Save Local</button>

      <button onClick={() => {
        let a = window.localStorage.getItem("token")
        let b = window.localStorage.getItem("issued")
        console.log(a,b)
      }}>Load Local</button>

      <button onClick={() => {
        window.localStorage.clear();
        console.log("token cleared:", window.localStorage.getItem("token"))
      }}>Delete Local</button> */}


      <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        name=""
        id="search"
        role="searchbox"
        placeholder=" Find music like..."
        value={searchedArtist}
        onChange={(e) => setSearchedArtist(e.target.value)}
        data-cy="search-bar"
        data-testid="search-bar"
      />
      <button onClick={handleSearchClick} type="submit" id="submitButton" data-cy="search-button" data-testid="search-button">
        <BsSearchHeart />
      </button>
      </form>

      {showResults &&
        <SearchResults searchResults={searchResults} currentToken={currentToken} clearSearchResults={clearSearchResults}/>
      }
    </>
  )
};

export default Search;
