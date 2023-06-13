import { useState, useRef, useEffect } from "react";
import { ReactComponent as DownArrow } from "../imgs/down-arrow.svg";
import useCheckOutsideClick from "../hooks/useCheckOutsideClick";

const url = process.env.REACT_APP_BASE_URL;

function Filter({ setItemList }) {
  const [filterExpanded, setFilterExpanded] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Mains");
  const filterRef = useRef(null);
  const filterList = ["Mains", "Sides", "Drinks"];

  useEffect(() => {
    if (filterExpanded === false) {
      filterRef.current.classList.remove("filter-container-expanded");
    } else {
      filterRef.current.classList.add("filter-container-expanded");
    }
  }, [filterExpanded]);

  useCheckOutsideClick(filterRef, setFilterExpanded);

  const handleFilterChange = async (item) => {
    setSelectedFilter(item);
    setItemList([]);

    try {
      const response = await fetch(url + `/menu/${item}`);
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      setItemList(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="filter-container"
      onClick={() => setFilterExpanded(!filterExpanded)}
      ref={filterRef}
    >
      <div className="selected-filter">
        <p>{selectedFilter}</p>
        <DownArrow />
      </div>
      {filterList.map((item, i) => {
        if (item !== selectedFilter) {
          return (
            <p
              className="filter-dropdown-link"
              key={i}
              onClick={() => handleFilterChange(item)}
            >
              {item}
            </p>
          );
        }
      })}
    </div>
  );
}

export default Filter;
