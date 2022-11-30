// TODO: create a component that displays a single bakery item
import React from "react";
import { useEffect, useState } from "react";
import "./ListItem.css";

export default function ListItem({
  item,
  addItem,
  removeItem,
  deselect,
  setDeselect,
}) {
  const [clicked, setClicked] = useState(false);
  const toggleClick = (event) => {
    console.log(clicked);
    if (clicked) {
      removeItem();
    } else {
      addItem();
      setDeselect(false);
    }
    setClicked(!clicked);
  };

  useEffect(() => {
    if (deselect) {
      setClicked(false);
    }
  }, [deselect]);

  return (
    <div className="item-wrapper">
      <div className="item">
        <img
          src={item.image}
          alt={item.name + " Profile Image"}
          className="profile"
        />
        <h2>{item.name}</h2>
        {/* <p>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p> */}
        <p>{item.organization}</p>
        <p className="cost">
          <img
            src={require("../assets/R6S-renown-icon.webp")}
            height="16px"
            alt="Renown Icon"
          />{" "}
          {item.price}
        </p>
        <img
          className="icon"
          src={item.badge}
          alt={item.name + " Badge Image"}
        />
        <input
          type="button"
          id="purchase"
          onClick={toggleClick}
          value={clicked ? "Remove from Team" : "Add To Team"}
        />
      </div>
    </div>
  );
}
