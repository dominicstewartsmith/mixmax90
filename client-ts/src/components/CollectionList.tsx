import { ICollection, Token } from "../../types";
import CollectionListItem from "./CollectionListItem";

interface CollectionListComponents {
  collectionsDB: ICollection[];
  currentToken: Token
}

const CollectionList = ({ collectionsDB, currentToken }: CollectionListComponents) => {

  return (
    collectionsDB.map(artist => {
      return (
        <div className="collections-artist-container" key={artist._id}>
          <p className="collections-artist-name" data-cy="collection-artist-name">{artist.artistName}</p>
          <CollectionListItem currentToken={currentToken} artistName={artist.artistName} playlists={artist.playlists} parentID={artist._id}/>
        </div>
      )
    })
  )
};

export default CollectionList;
