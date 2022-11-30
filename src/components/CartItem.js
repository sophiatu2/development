// TODO: create a component that displays a single bakery item
import React from "react";
import "./CartItem.css";

export default function CartItem({ name, price }) {
  return (
    <div className="cart">
      <p>{name} </p>
      <p>
        <img
          src={require("../assets/R6S-renown-icon.webp")}
          height="16px"
          alt="Renown icon"
        />
        {price}
      </p>
    </div>
  );
}
