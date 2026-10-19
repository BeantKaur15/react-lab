import React, { useState } from "react";

const shopItems = [
  {
    id: 1,
    item: "item1",
    price: 100,
  },
  {
    id: 2,
    item: "item2",
    price: 100,
  },
  {
    id: 3,
    item: "item3",
    price: 100,
  },
  {
    id: 4,
    item: "item4",
    price: 100,
  },
];

const ShopCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddCartBtn = (id) => {
    const getShopCartIndex = shopItems.findIndex((item) => item.id === id);
    const shopItem = shopItems[getShopCartIndex];

    const getCartindex = cartItems.findIndex((item) => item.id === id);

    setCartItems((prevCartItems) => {
      let newCartItems = [];
      if (getCartindex === -1) {
        shopItem.quanity = 1;
        newCartItems = [...prevCartItems, shopItem];
      } else {
        const existingCartItem = { ...prevCartItems[getCartindex] };

        existingCartItem.quanity++;
        newCartItems = [...prevCartItems];
        newCartItems[getCartindex] = existingCartItem;
      }
      return newCartItems;
    });
  };

  const handleRemoveCartBtn = (id) => {
    const getCartindex = cartItems.findIndex((item) => item.id === id);
    const clickedCartItem = cartItems[getCartindex];
    setCartItems((prevCartItems) => {
      let updatedCartItems = [];

      if (clickedCartItem.quanity > 1) {
        const moreQuantityCartItem = { ...prevCartItems[getCartindex] };
        moreQuantityCartItem.quanity--;
        updatedCartItems = [...prevCartItems];
        updatedCartItems[getCartindex] = moreQuantityCartItem;
      } else {
        updatedCartItems = prevCartItems.filter((item) => item.id !== id);
      }
      return updatedCartItems;
    });
  };

  const totalCartItems = cartItems.reduce(
    (totalItems, cartItem) => totalItems + cartItem.quanity,
    0,
  );

  const totalCartAmount = cartItems.reduce(
    (total, cartItem) => total + cartItem.quanity * cartItem.price,
    0,
  );

  return (
    <>
      <h1> Shopping Mall</h1>
      <div className="itemsRow">
        {shopItems.map((shopItem) => (
          <div className="itemCard" key={shopItem.id}>
            <p>item : {shopItem.item}</p>
            <p>price: {shopItem.price}</p>
            <button
              className="addBtn"
              onClick={() => handleAddCartBtn(shopItem.id)}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
      <h1>Cart Items added</h1>
      <div className="itemsRow">
        {cartItems.map((cartItem) => (
          <div className="itemCard" key={cartItem.id}>
            <p>Item: {cartItem.item}</p>
            <p> Price: {cartItem.price}</p>
            <p>Quantity: {cartItem.quanity}</p>
            <button
              className="removeBtn"
              onClick={() => handleRemoveCartBtn(cartItem.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <h2>Total price of items:{totalCartAmount}</h2>

      <h2> total cart Items Quantity: {totalCartItems}</h2>
    </>
  );
};

export default ShopCart;
