import "../css/Menu.css";
import { ReactComponent as Cart } from "../imgs/cart.svg";
import { ReactComponent as DownArrow } from "../imgs/down-arrow.svg";
import { useRef, useEffect, useState } from "react";

function useCheckOutsideClick(ref, expanded) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        expanded(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, expanded]);
}

function Menu() {
  const filterRef = useRef(null);
  const cartRef = useRef(null);
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [cartExpanded, setCartExpanded] = useState(false);

  useEffect(() => {
    if (filterExpanded === false) {
      filterRef.current.classList.remove("filter-container-expanded");
    } else {
      filterRef.current.classList.add("filter-container-expanded");
    }
  }, [filterExpanded]);

  useEffect(() => {
    if (cartExpanded === false) {
      cartRef.current.classList.remove("cart-cost-container-expanded");
    } else {
      cartRef.current.classList.add("cart-cost-container-expanded");
    }
  }, [cartExpanded]);

  useCheckOutsideClick(filterRef, setFilterExpanded);
  useCheckOutsideClick(cartRef, setCartExpanded);

  return (
    <div className="menu-container">
      <div className="menu-header-container">
        <div
          className="cart-cost-container"
          onClick={() => setCartExpanded(!cartExpanded)}
          ref={cartRef}
        >
          <div className="cart-cost-header">
            <Cart className="cart-icon" />
            <p>$19.99</p>
          </div>
          <div className="cart-cost-info">
            <p> HALLO</p>
          </div>
        </div>
        <div
          className="filter-container"
          onClick={() => setFilterExpanded(!filterExpanded)}
          ref={filterRef}
        >
          <div className="selected-filter">
            <p>Mains</p>
            <DownArrow />
          </div>
          <p className="filter-dropdown-link">DWAHUODWUH</p>
        </div>
      </div>
    </div>
  );
}

export default Menu;
