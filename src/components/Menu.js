import "../css/Menu.css";
import { useEffect, useState, useRef } from "react";
import Filter from "./Filter";
import CartButton from "./CartButton";
import ItemCard from "./ItemCard";
import { TailSpin } from "react-loading-icons";

const url = process.env.REACT_APP_BASE_URL;

// const itemList = await fetch(mainsUrl).then((response) => response.json());

// console.log(itemList);

function Menu() {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const initialFetch = async () => {
      try {
        const response = await fetch(url + "/menu/Mains");
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setItemList(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    initialFetch();
  }, []);

  useEffect(() => {
    console.log("itemList updated");
    const menuScroller = document.getElementById("menuScroller");
    menuScroller.scrollTo({ top: 0, behavior: "smooth" });
  }, [itemList]);

  return (
    <div className="menu-container">
      <div className="menu-header-container">
        <CartButton />
        <Filter setItemList={setItemList} />
      </div>
      <div
        className={
          itemList.length % 2 === 0
            ? "menu-scroller-container menu-scroller-container-remove-after"
            : "menu-scroller-container"
        }
        id="menuScroller"
      >
        {itemList.length > 0 ? (
          itemList.map((item, i) => <ItemCard item={item} key={i} />)
        ) : (
          <TailSpin stroke="#e5cb7a" />
        )}
      </div>
    </div>
  );
}

export default Menu;
