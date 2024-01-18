import { useEffect, useState } from 'react'
// import { Route, Routes } from "react-router-dom";

import './App.css'
import Header from "./components/Header";
import Home from "./components/Home";
import Collection from "./components/Collection";
import Player from "./components/Player";
import apiService from './ApiService';

function App() {
  const [currentTracks, setCurrentTracks] = useState([]);

  useEffect(() => {
    async function loadData() {
      const tracks = await apiService.getCurrentTopTracks();
      setCurrentTracks(tracks);
    }
    // loadData();
  }, [])
  
  return (
    <main className='app-main'>
      
      <Header />
        <Home
          currentTracks={currentTracks}
          setCurrentTracks={setCurrentTracks}
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
