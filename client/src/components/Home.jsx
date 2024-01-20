import React from "react";
import { useState } from "react";
import Search from "./Search";
import Collection from "./Collection";
import Player from "./Player";

const Home = ({ topTracks, setTopTracks, currentTracks, collectionsDB }) => {
  const [searchedArtist, setSearchedArtist] = useState("");

  return (
    <main className="home-main">
      <Search
        topTracks={topTracks}
        setTopTracks={setTopTracks}
        searchedArtist={searchedArtist}
        setSearchedArtist={setSearchedArtist}
        currentTracks={currentTracks}
      />
      <Collection collectionsDB={collectionsDB} />
    </main>
  );
};

export default Home;
