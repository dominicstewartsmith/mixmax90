import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import apiService from "./ApiService";
import { ICollection } from "../types";

function App() {
  const [collectionsDB, setCollectionsDB] = useState<ICollection[]>([]);
  const [loadingError, setLoadingError] = useState<boolean>(false)

  useEffect(() => {
    async function loadData() {
      try {
        const collections = await apiService.getCollections();
        setCollectionsDB(collections);
      } catch (error) {
        setLoadingError(true)
        console.log(error)
      }
    }
    loadData();
  }, []);

  if (loadingError) return <h1>Error connecting to the server 😔</h1>

  return (
    <main className="app-main">
      <Header />
      <Home
        collectionsDB={collectionsDB}
      />
    </main>
  );
}

export default App;
