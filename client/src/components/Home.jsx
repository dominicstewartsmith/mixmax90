import React from 'react'
import { useState } from "react";
import Search from './Search'
import Collection from './Collection';
import Player from './Player';
// import SuggestionList from './SuggestionList';
// import MixList from './MixList'


const Home = ({topTracks, setTopTracks, getCurrentTopTracks,currentTracks}) => {
  const [search, setSearch] = useState("");
  return (
    <main className='home-main'>
      {/* <div>Home</div> */}
      <Search
        topTracks={topTracks}
        setTopTracks={setTopTracks}
        search={search}
        setSearch={setSearch}
        getCurrentTopTracks={getCurrentTopTracks}
        currentTracks={currentTracks}
      />
      <Collection />
      
      {/* <Player/> */}
    </main>
  );
};

export default Home