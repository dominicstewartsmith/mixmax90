import CollectionList from './CollectionList'
import { ICollection, Token } from "../../types";


interface CollectionComponentProp {
  collectionsDB: ICollection[];
  currentToken: Token
}

const Collection = ({ collectionsDB, currentToken }: CollectionComponentProp) => {
  if (collectionsDB.length == 0) return <p className='collection-title'>Save some playlists to see them here.</p>

  return (
    <main>
      <div className='collections-container' id='playlists-anchor'>
        <p className='collections-title'>Your Saved Collections</p>
        <CollectionList currentToken={currentToken} collectionsDB={collectionsDB} />
      </div>
    </main>
  )
}

export default Collection