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

  let artistName: string = searchedArtist.replace(/\s+/g, "+");

  async function handleSearchClick() {
    let artistIdItems: ISearchResults = await apiService.getArtistId(
      artistName, currentToken
    );
    setSearchResults(artistIdItems.artists.items);
    setSearchedArtist("");
  }

  function clearSearchResults() {
    setSearchResults([])
  }

  return (
    <>
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
      <button onClick={handleSearchClick} type="submit" id="submitButton" data-cy="search-button">
        <BsSearchHeart />
      </button>
      </form>

      {searchResults &&
        <SearchResults searchResults={searchResults} currentToken={currentToken} clearSearchResults={clearSearchResults}/>
      }
    </>
  )
};

export default Search;
