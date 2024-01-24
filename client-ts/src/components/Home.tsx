import Search from "./Search";
import Collection from "./Collection";
import { ICollection, Token } from "../../types";


interface homeComponentProp {
    collectionsDB: ICollection[];
    currentToken: Token
}

const Home = ({ collectionsDB, currentToken}: homeComponentProp) => {
  return (
    <main className="home-main">
      <Search currentToken={currentToken} data-testid="search-bar"/>
      <Collection collectionsDB={collectionsDB} />
    </main>
  );
};

export default Home;
