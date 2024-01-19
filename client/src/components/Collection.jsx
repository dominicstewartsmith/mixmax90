import React from 'react'
import Nav from './Nav'
import CollectionList from './CollectionList'

const Collection = ({ collectionsDB }) => {
  return (
    <main>
      <div className='collection-title'>Collection</div>
      <CollectionList collectionsDB={collectionsDB}/>
    </main>
  )
}

export default Collection