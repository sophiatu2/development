import React from "react";
import Collapsible from "react-collapsible";
import { useEffect, useState } from "react";
import "./Filters.css";

export default function ListItem({ operatorData, setFilteredItems }) {
  const categoriesArr = [
    { id: 1, name: "SAS" },
    { id: 2, name: "FBI SWAT" },
    { id: 3, name: "GIGN" },
    { id: 4, name: "Spetsnaz" },
    { id: 5, name: "GSG 9" },
    { id: 6, name: "JTF2" },
    { id: 7, name: "SEALs" },
    { id: 8, name: "BOPE" },
    { id: 9, name: "SAT" },
    { id: 10, name: "GEO" },
    { id: 11, name: "SDU" },
    { id: 12, name: "GROM" },
    { id: 13, name: "707th SMB" },
    { id: 14, name: "CBRN" },
    { id: 15, name: "G.I.S" },
    { id: 16, name: "GSUTR" },
  ];

  let filters = {};
  operatorData.map((item) => (filters[item.organization] = true));
  let defaultSelect = categoriesArr.map((li) => li.id);

  const [currFilters, setFilters] = useState(filters);
  const [isChecked, setIsChecked] = useState(defaultSelect);

  const changeFilters = (event, item) => {
    if (!event.target.checked) {
      removeChecked(item);
    } else {
      addChecked(item);
    }
  };

  function addChecked(item) {
    let filtersCopy = { ...currFilters };
    setIsChecked([...isChecked, item.id]);
    filtersCopy[item.name] = true;
    setFilters(filtersCopy);
  }

  function removeChecked(item) {
    let filtersCopy = { ...currFilters };
    setIsChecked(isChecked.filter((li) => li !== item.id));
    filtersCopy[item.name] = false;
    setFilters(filtersCopy);
  }

  function selectAll(event) {
    event.preventDefault();
    setIsChecked(defaultSelect);
    setFilters(filters);
  }

  function selectNone(event) {
    event.preventDefault();
    setIsChecked([]);
    let filtersCopy = {};
    operatorData.map((item) => (filtersCopy[item.organization] = false));
    setFilters(filtersCopy);
  }

  // Sorting
  const [sortBy, setSortBy] = useState("default");
  const changeSort = (newSort) => {
    console.log("Sorting by " + newSort);
    setSortBy(newSort);
  };

  // useEffect
  useEffect(() => {
    let original = [...operatorData];
    if (sortBy === "lowestprice") {
      original.sort((a, b) => a.price - b.price);
    } else if (sortBy === "highestprice") {
      original.sort((a, b) => b.price - a.price);
    } else if (sortBy === "organization") {
      original.sort((a, b) => a.organization.localeCompare(b.organization));
    } else {
      original.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredItems(original.filter((item) => currFilters[item.organization]));
  }, [operatorData, sortBy, currFilters, setFilteredItems]);

  return (
    <div>
      <Collapsible
        trigger={
          <div>
            Filter and Sort{" "}
            <img
              src={require("../assets/arrow.png")}
              alt="arrow"
              height="14px"
            />
          </div>
        }
        tabIndex={0}
        open={true}
      >
        <select
          onChange={(e) => {
            changeSort(e.target.value);
          }}
          className="sortby"
          aria-label="Sort By"
        >
          <option value="default">SortBy</option>
          <option value="organization">Organization</option>
          <option value="lowestprice">Lowest Price</option>
          <option value="highestprice">Highest Price</option>
        </select>
        <form>
          <button onClick={(event) => selectAll(event)}>Select All</button>
          <br />
          <button onClick={(event) => selectNone(event)}>Deselect All</button>
          <ul>
            {categoriesArr.map((item) => (
              <li key={item.id}>
                <label key={item.id}>
                  <input
                    key={item.id}
                    type="checkbox"
                    name={item.name}
                    id={item.id}
                    checked={isChecked.includes(item.id)}
                    onChange={(event) => changeFilters(event, item)}
                  />
                  {item.name}
                </label>
              </li>
            ))}
          </ul>
        </form>
      </Collapsible>
    </div>
  );
}
