import Search from "./Search";
import Collection from "./Collection";
import { ICollection } from "../../types";

interface homeComponentProp {
    collectionsDB: ICollection[];
}

const Home = ({ collectionsDB }: homeComponentProp) => {

  return (
    <main className="home-main">
      <Search />
      <Collection collectionsDB={collectionsDB} />
    </main>
  );
};

export default Home;
