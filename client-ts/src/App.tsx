import { useState, useEffect, createContext } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import apiService from "./ApiService";
import { Token, ICollection, ITrack } from "../types";

type MyContextType = {
  handleUpdateDB: () => void;
  topTracks: ITrack[];
  setTopTracks: (tracks: ITrack[]) => void;
  showTopTracks: boolean;
  setShowTopTracks: (statement: boolean) => void;
}

export const DataContext = createContext<MyContextType>({} as MyContextType);

function App() {
  const [collectionsDB, setCollectionsDB] = useState<ICollection[]>([]);
  const [currentToken, setCurrentToken] = useState<Token>({ token: '', time: Date.now() })
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const [topTracks, setTopTracks] = useState<ITrack[]>([]);
  const [showTopTracks, setShowTopTracks] = useState<boolean>(false);

  const handleUpdateDB = async () => {
    console.log('🟢 Re-loading database.')
    const collections = await apiService.getCollections();
    setCollectionsDB(collections);
  }

  const loadToken = async () => {
    const newToken = await apiService.getToken();
    setCurrentToken(newToken);
  }

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
    loadToken();
  }, []);

  if (loadingError) return <h2>Error connecting to the server 😔</h2>;

  return (
    <>
      {!loading &&
        <main className="app-main">
          <DataContext.Provider value={{ handleUpdateDB, topTracks, setTopTracks, showTopTracks, setShowTopTracks }}>
            <Header />
            <Home collectionsDB={collectionsDB} currentToken={currentToken} />
          </DataContext.Provider>
        </main>
      }
    </>
  );
}

export default App;
