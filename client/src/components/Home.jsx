import React from 'react'
import { useState } from "react";
import Search from './Search'
import Collection from './Collection';
import Player from './Player';
// import SuggestionList from './SuggestionList';
// import MixList from './MixList'


const Home = ({topTracks, setTopTracks, currentTracks}) => {
  const [searchedArtist, setSearchedArtist] = useState("");

  return (
    <main className='home-main'>
      {/* <div>Home</div> */}
      <Search
        topTracks={topTracks}
        setTopTracks={setTopTracks}
        searchedArtist={searchedArtist}
        setSearchedArtist={setSearchedArtist}
        currentTracks={currentTracks}
      />
      <Collection />
      
      {/* <Player/> */}
    </main>
  );
};

export default Home