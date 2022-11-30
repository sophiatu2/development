// TODO: create a component that displays a single bakery item
import React from "react";
import { useState } from "react";
import "./ListItem.css";

export default function ListItem({ item, addItem, removeItem }) {
  const [checked, setChecked] = useState(false);

  const toggleCheck = (event) => {
    setChecked(!checked);
    if (event.target.checked) {
      addItem();
    } else {
      removeItem();
    }
  };

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
        <nobr style={{ marginTop: "8px" }}>
          <input
            type="checkbox"
            id="purchase"
            checked={checked}
            onChange={toggleCheck}
          />
          <p> Add To Team</p>
        </nobr>
      </div>
    </div>
  );
}
