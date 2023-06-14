import { useState, useRef, useEffect } from "react";
import { ReactComponent as Cart } from "../imgs/cart.svg";
import { useSelector, useDispatch } from "react-redux";
import { modifyItemAmount, removeItem } from "../Slice/cartSlice";
import useCheckOutsideClick from "../hooks/useCheckOutsideClick";

function CartButton() {
  const cart = useSelector((state) => state.cart);
  const [cartExpanded, setCartExpanded] = useState(false);
  const cartRef = useRef(null);
  const amountSelections = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  console.log("cart button updated");

  const dispatch = useDispatch();

  useEffect(() => {
    if (cartExpanded === false) {
      cartRef.current.classList.remove("cart-cost-container-expanded");
    } else {
      cartRef.current.classList.add("cart-cost-container-expanded");
    }
  }, [cartExpanded]);

  useCheckOutsideClick(cartRef, setCartExpanded);

  const handleAmountSelect = (event, item) => {
    const modifyAmount = { item: item, amount: event.target.value };
    dispatch(modifyItemAmount(modifyAmount));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  return (
    <div className="cart-cost-container" ref={cartRef}>
      <div
        className="cart-cost-header"
        onClick={() => setCartExpanded(!cartExpanded)}
      >
        <Cart className="cart-icon" />
        <p>{cart["total"] === 0 ? "" : `$${cart["total"]}`}</p>
      </div>
      <div className="cart-cost-info">
        {Object.keys(cart["items"]).length === 0 ? (
          <p>No items</p>
        ) : (
          Object.keys(cart["items"]).map((item, i) => {
            return (
              <div className="cart-item-container" key={i}>
                <div className="cart-amount-container">
                  <button
                    className="cart-item-remove-button"
                    onClick={() => handleRemoveItem(item)}
                  >
                    X
                  </button>
                  <select
                    name="amount"
                    id="amount-select"
                    onChange={(event) => handleAmountSelect(event, item)}
                  >
                    <option>{`${cart["items"][item]["amount"]}x `}</option>
                    {amountSelections.map((amount, index) => {
                      if (cart["items"][item]["amount"] !== amount) {
                        return (
                          <option value={amount} key={index}>
                            {amount}x
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
                <p>{item}</p>
                <p>
                  $
                  {(
                    Math.ceil(
                      cart["items"][item]["cost"] *
                        cart["items"][item]["amount"] *
                        100
                    ) / 100
                  ).toFixed(2)}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default CartButton;
