import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import apiService from "./ApiService";
import { ICollection } from "../types";

function App() {
  const [collectionsDB, setCollectionsDB] = useState<ICollection[]>([]);

  useEffect(() => {
    async function loadData() {
      const collections = await apiService.getCollections();
      setCollectionsDB(collections);
    }
    loadData();
  }, []);

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
