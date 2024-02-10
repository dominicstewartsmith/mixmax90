import { VscLibrary } from "react-icons/vsc";

//TODO make these button components clickable and take you to relevant routes

const Nav = () => {
  return (
    <>
      <nav>
        <ul className="nav">
          <li className="nav-item">
            {/* <Link to="/"> */}
            {/* <GoHome /> */}
            {/* <br />
              Home */}
            {/* </Link> */}
          </li>
          <li className="nav-item">
            {/* <Link to="/collection"> */}

            <a href="#playlists-anchor" style={{color: "#8ebf42", scrollBehavior: "smooth"}}><VscLibrary /></a>
            {/* <br />
              Collection */}
            {/* </Link> */}
          </li>
          <li className="nav-item">
            {/* <Link> */}
            {/* <VscAccount /> */}
            {/* </Link> */}
          </li>
        </ul>
      </nav>
      {/* <nav>
      <button>Sign up</button>
      <button>Log in</button>
    </nav> */}
    </>
  );
}

export default Nav