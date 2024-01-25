import CollectionList from './CollectionList'
import { ICollection } from "../../types";


interface CollectionComponentProp {
  collectionsDB: ICollection[];
}

const Collection = ({ collectionsDB }: CollectionComponentProp) => {
  if (collectionsDB.length == 0) return <p className='collection-title'>Save some playlists to see them here.</p>

  return (
    <main>
      <div className='collections-container'>
        <p className='collections-title'>Your Saved Collections</p>
        <CollectionList collectionsDB={collectionsDB} />
      </div>
    </main>
  )
}

export default Collection