import "../css/Menu.css";
import { useEffect, useState } from "react";
import Filter from "./Filter";
import CartButton from "./CartButton";
import ItemCard from "./ItemCard";

const url = process.env.REACT_APP_BASE_URL;

// const itemList = await fetch(mainsUrl).then((response) => response.json());

// console.log(itemList);

function Menu() {
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    console.log("initial run of menu");
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

  console.log("hello");

  return (
    <div className="menu-container">
      <div className="menu-header-container">
        <CartButton />
        <Filter />
      </div>
      <div className="menu-scroller-container">
        {itemList.length > 0 ? (
          itemList.map((item, i) => <ItemCard item={item} key={i} />)
        ) : (
          <div>Nothing to show</div>
        )}
      </div>
    </div>
  );
}

export default Menu;
