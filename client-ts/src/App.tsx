import { useState, useEffect, createContext } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import apiService from "./ApiService";
import { Token, ICollection, ITrack } from "../types";
import { validateToken } from "./helpers";

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
    const previousToken: string = window.localStorage.getItem("token") || "";
    const previousTokenTime: number = Number(window.localStorage.getItem('issuedAt'));

    let token = { token: previousToken, time: previousTokenTime }

    if (previousToken.length) {
      if (validateToken(token)) {
        setCurrentToken(token);
      } else {
        const newToken = await apiService.getNewToken();
        window.localStorage.setItem("token", newToken.token);
        window.localStorage.setItem("issuedAt", newToken.time.toString());
        setCurrentToken(newToken);
      }
    } else {
      //No token currently saved
      const newToken = await apiService.getNewToken();
      window.localStorage.setItem("token", newToken.token);
      window.localStorage.setItem("issuedAt", newToken.time.toString());
      setCurrentToken(newToken);
    }
  };

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
    loadToken().then(() => {
      console.log('token loaded')
      loadData()
    }).catch(err => console.log(err))
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
