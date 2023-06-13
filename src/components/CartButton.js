import { useState, useRef, useEffect } from "react";
import { ReactComponent as Cart } from "../imgs/cart.svg";
import { useSelector, useDispatch } from "react-redux";
import { deductItem, removeItem } from "../Slice/cartSlice";
import useCheckOutsideClick from "../hooks/useCheckOutsideClick";

function CartButton() {
  const cart = useSelector((state) => state.cart);
  const [cartExpanded, setCartExpanded] = useState(false);
  const cartRef = useRef(null);

  useEffect(() => {
    if (cartExpanded === false) {
      cartRef.current.classList.remove("cart-cost-container-expanded");
    } else {
      cartRef.current.classList.add("cart-cost-container-expanded");
    }

    console.log(cart);
  }, [cartExpanded]);

  useCheckOutsideClick(cartRef, setCartExpanded);

  return (
    <div
      className="cart-cost-container"
      onClick={() => setCartExpanded(!cartExpanded)}
      ref={cartRef}
    >
      <div className="cart-cost-header">
        <Cart className="cart-icon" />
        <p>{cart["total"] === 0 ? "" : `$${cart["total"]}`}</p>
      </div>
      <div className="cart-cost-info">
        <p>
          {Object.keys(cart["items"]).length === 0
            ? "No items in Cart"
            : "yo theres items"}
        </p>
      </div>
    </div>
  );
}

export default CartButton;
