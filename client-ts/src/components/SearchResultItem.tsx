import { ISearchResult } from "../../types";

interface SearchResultItemPropsType {
    handleArtistClick: (a: string, b:string) => void;
    artist: ISearchResult;
}

export default function SearchResultItem({handleArtistClick, artist}: SearchResultItemPropsType) {
    return (
    <li
      className="artist-search-li"
      data-cy="artist-search-item"
      data-testid="artist-search-item"
      onClick={() => {
        handleArtistClick(artist.id, artist.name);
      }}
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
  );
}
