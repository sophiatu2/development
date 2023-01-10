import "./App.css";
import { useState } from "react";
import operatorData from "./assets/operators.json";
import ListItem from "./components/ListItem";
import CartItem from "./components/CartItem";
import Filters from "./components/Filters";

operatorData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
  item.badge = process.env.PUBLIC_URL + "/" + item.badge;
});

function App() {
  // Adding and removing from cart
  const [deselect, setDeselect] = useState(false);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  function addToCart(item) {
    setCart([...cart, [item.name, item.price]]);
    setTotal(total + item.price);
  }

  function removeFromCart(item) {
    setCart(cart.filter((li) => li[0] !== item.name));
    setTotal(total - item.price);
  }

  // Clear Cart
  function clearCart() {
    setCart([]);
    setTotal(0);
    setDeselect(true);
  }

  const [filteredItems, setFilteredItems] = useState(operatorData);

  return (
    <div className="App">
      <div className="sidebar">
        <Filters
          operatorData={operatorData}
          setFilteredItems={setFilteredItems}
        />
        <hr />
        <h3>
          Total:{"  "}
          <img
            src={require("./assets/R6S-renown-icon.webp")}
            height="20px"
            alt="Renown Icon"
          />
          {"  "}
          {total}
        </h3>
        <div className="cart-wrapper">
          {cart.map((tuple, index) => (
            <CartItem key={index} name={tuple[0]} price={tuple[1]} />
          ))}
        </div>
        <button onClick={clearCart}>Clear Cart</button>
      </div>
      <div className="main">
        <div className="header">
          <img
            src={require("./assets/r6-logo.png")}
            width="50%"
            objectfit="contain"
            alt="Rainbow Six Siege Logo"
          />
          <p>
            API used from{" "}
            <a href="https://github.com/DaltonHart/R6-Tactics">
              https://github.com/DaltonHart/R6-Tactics
            </a>
          </p>
          <p>Data as of Operation Grim Sky</p>
        </div>
        <div className="list-container">
          {filteredItems.map((item, index) => (
            <ListItem
              key={index}
              item={item}
              addItem={() => addToCart(item)}
              removeItem={() => removeFromCart(item)}
              deselect={deselect}
              setDeselect={setDeselect}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
