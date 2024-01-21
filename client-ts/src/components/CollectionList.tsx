import { ICollection } from "../../types";
import CollectionListItem from "./CollectionListItem";

interface CollectionListComponents {
  collectionsDB: ICollection[];
}

const CollectionList = ({ collectionsDB }: CollectionListComponents) => {

  return (
    collectionsDB.map(artist => {
      return (
        <>
          <h1><p>{artist.artistName}</p></h1>
          <CollectionListItem playlists={artist.playlists} />
        </>
      )
    })
  )
};

export default CollectionList;
