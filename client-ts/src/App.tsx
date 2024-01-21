import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import apiService from "./ApiService";
import { ICollection } from "../types";

function App() {
  const [collectionsDB, setCollectionsDB] = useState<ICollection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingError, setLoadingError] = useState<boolean>(false);

  const loadData = async () => {
    try {
      const collections = await apiService.getCollections();
      setCollectionsDB(collections);
      setLoading(false);
    } catch (error) {
      setLoadingError(true);
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loadingError) return <h2>Error connecting to the server 😔</h2>;

  return (
    <>
      {!loading &&
        <main className="app-main">
          <Header />
          <Home collectionsDB={collectionsDB} />
        </main>
      }
    </>
  );
}

export default App;
