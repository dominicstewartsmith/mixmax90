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
          <h3><p>{artist.artistName}</p></h3>
          <CollectionListItem playlists={artist.playlists}/>
        </>
      )
    })
  )
};

export default CollectionList;
