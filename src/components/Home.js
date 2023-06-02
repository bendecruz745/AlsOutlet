import "../css/Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <div className="home-text-container">
        <p>
          Welcome to Al’s Outlet, (pronounced AL like Weird Al) home of the most{" "}
          <span style={{ textDecoration: "line-through" }}>generated</span>{" "}
          exotic food and drinks around! Hopefully the tantalizing photos
          convince you to get something to eat or drink! Our selection
          periodically expands, so be sure to check in every once in a while.
        </p>
        <Link to="/Menu">
          <h1 className="menu-neon-button">{`> Menu <`}</h1>
        </Link>
      </div>
    </div>
  );
}

export default Home;
