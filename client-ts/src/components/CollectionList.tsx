import { ICollection } from "../../types";
import CollectionListItem from "./CollectionListItem";

interface CollectionListComponents {
  collectionsDB: ICollection[];
}

const CollectionList = ({ collectionsDB }: CollectionListComponents) => {

  return (
    collectionsDB.map(artist => {
      return (
        <div className="collections-artist-container" key={artist._id}>
          <p className="collections-artist-name" data-cy="collection-artist-name">{artist.artistName}</p>
          <CollectionListItem playlists={artist.playlists} parentID={artist._id}/>
        </div>
      )
    })
  )
};

export default CollectionList;
