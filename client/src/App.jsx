import { useEffect, useState } from 'react'
// import { Route, Routes } from "react-router-dom";

import './App.css'
import Header from "./components/Header";
import Home from "./components/Home";
import apiService from './ApiService';
import Collection from "./components/Collection";
import Player from "./components/Player";

function App() {

  const [currentTracks, setCurrentTracks] = useState([]);

  // async function getCurrentTopTracks() {
  //    try {
  //      const response = await fetch("http://localhost:3000/toptracks");
  //      const tracks = await response.json();
  //      setCurrentTracks(tracks);      
  //    } catch (error) {
  //       console.error(err);
  //       res.status(500).send("Internal Server Error");  
  //    }
  // }

  useEffect(() => {
    async function fetchData() {
      const tracks = await apiService.getCurrentTopTracks();
      setCurrentTracks(tracks);
    }
    fetchData()
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
