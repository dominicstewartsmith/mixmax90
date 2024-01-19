import { useEffect, useState } from 'react'
// import { Route, Routes } from "react-router-dom";

import './App.css'
import Header from "./components/Header";
import Home from "./components/Home";
import apiService from './ApiService';
import Collection from "./components/Collection";
import Player from "./components/Player";
import apiService from './ApiService';

function App() {
  const [currentTracks, setCurrentTracks] = useState([]);
  const [collectionsDB, setCollectionsDB] = useState([]);

  useEffect(() => {
    async function loadData() {
      const collections = await apiService.getCollections();
      setCollectionsDB(collections);
    }
    loadData();
  }, [])
  
  return (
    <main className='app-main'>
      
      <Header />
        <Home
          currentTracks={currentTracks}
          setCurrentTracks={setCurrentTracks}
          collectionsDB={collectionsDB}
        />
      {/* <Routes>
        <Route
          path="/"
          element={
            <Home
              currentTracks={currentTracks}
              setCurrentTracks={setCurrentTracks}
              getCurrentTopTracks={getCurrentTopTracks}
            />
          }
        />
        <Route path="/collection" element={<Collection />} />
      </Routes> */}
      {/* <Player /> */}
    </main>
  );
}

export default App
