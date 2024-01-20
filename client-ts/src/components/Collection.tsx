import CollectionList from './CollectionList'
import { ICollection } from "../../types";


interface CollectionComponentProp {
  collectionsDB: ICollection[];
}

const Collection = ({ collectionsDB }: CollectionComponentProp) => {
  return (
    <main>
      <div className='collection-title'>Collection</div>
      <CollectionList collectionsDB={collectionsDB}/>
    </main>
  )
}

export default Collection