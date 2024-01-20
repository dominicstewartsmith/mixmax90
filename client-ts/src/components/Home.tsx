import { useState } from "react";
import Search from "./Search";
import Collection from "./Collection";
import { ICollection } from "../../types";

interface homeComponentProp {
    collectionsDB: ICollection[];
}

const Home = ({ collectionsDB }: homeComponentProp) => {
  const [searchedArtist, setSearchedArtist] = useState<string>("");

  return (
    <main className="home-main">
      <Search
        searchedArtist={searchedArtist}
        setSearchedArtist={setSearchedArtist}
      />
      <Collection collectionsDB={collectionsDB} />
    </main>
  );
};

export default Home;
