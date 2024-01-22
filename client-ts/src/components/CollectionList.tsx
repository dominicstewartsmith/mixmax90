import { ICollection } from "../../types";
import CollectionListItem from "./CollectionListItem";

interface CollectionListComponents {
  collectionsDB: ICollection[];
}

const CollectionList = ({ collectionsDB }: CollectionListComponents) => {

  return (
    collectionsDB.map(artist => {
      return (
        <div className="collections-artist-container">
          <p className="collections-artist-name">{artist.artistName}</p>
          <CollectionListItem playlists={artist.playlists} />
        </div>
      )
    })
  )
};

export default CollectionList;
