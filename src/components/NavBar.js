import "../css/NavBar.css";
import downArrowImg from "../imgs/downarrow.png";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

function useCheckOutsideClick(ref, setNavBarExpanded) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */

    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setNavBarExpanded(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setNavBarExpanded]);
}

function NavBar() {
  const navBarRef = useRef(null);
  const [navBarExpanded, setNavBarExpanded] = useState(false);

  useCheckOutsideClick(navBarRef, setNavBarExpanded);

  useEffect(() => {
    if (navBarExpanded === false) {
      navBarRef.current.className = "navbar-container";
    } else {
      navBarRef.current.className = "navbar-container navbar-container-expand";
    }
  }, [navBarExpanded]);

  // const handleNavMenu = () => {
  //   console.log("ya clicked the nav button");
  //   navBarRef.current.className = "navbar-container navbar-container-expand";
  // };
  return (
    <div className="navbar-container" ref={navBarRef}>
      <div className="navbar-main-container">
        <div className="navbar-brand-container">
          <Link to="/" onClick={() => setNavBarExpanded(false)}>
            <h1>Al's Outlet</h1>
          </Link>
        </div>
        <div className="navbar-links-container">
          <img
            src={downArrowImg}
            alt=""
            className="navbar-menu-button"
            onClick={() => setNavBarExpanded(!navBarExpanded)}
          />
        </div>
      </div>
      <div
        className="navbar-dropdown-menu"
        onClick={() => setNavBarExpanded(!navBarExpanded)}
      >
        <Link to="/Menu">
          <h2>Menu</h2>
        </Link>
        <Link to="/Cart">
          <h2>Cart</h2>
        </Link>
        <Link to="/About">
          <h2>About</h2>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
