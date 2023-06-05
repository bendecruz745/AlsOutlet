import { useState, useRef, useEffect } from "react";
import { ReactComponent as DownArrow } from "../imgs/down-arrow.svg";
import useCheckOutsideClick from "../hooks/useCheckOutsideClick";

function Filter() {
  const [filterExpanded, setFilterExpanded] = useState(false);
  const filterRef = useRef(null);

  useEffect(() => {
    if (filterExpanded === false) {
      filterRef.current.classList.remove("filter-container-expanded");
    } else {
      filterRef.current.classList.add("filter-container-expanded");
    }
  }, [filterExpanded]);

  useCheckOutsideClick(filterRef, setFilterExpanded);

  return (
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
  );
}

export default Filter;
