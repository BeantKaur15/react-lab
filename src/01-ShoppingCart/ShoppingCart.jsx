import React, { useEffect, useState } from "react";

const ShopItems = [
  {
    Id: 1,
    ItemName: "Item 1",
    Price: "100",
  },
  {
    Id: 2,
    ItemName: "Item 2",
    Price: "100",
  },
  {
    Id: 3,
    ItemName: "Item 3",
    Price: "100",
  },
  {
    Id: 4,
    ItemName: "Item 4",
    Price: "400",
  },
];

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (id) => {
    const index = ShopItems.findIndex((item) => item.Id === id); //shop array index
    const cartItemIndex = cartItems.findIndex((item) => item.Id === id); // cart  array index
    const shopItem = ShopItems[index];

    setCartItems((prevCartItems) => {
      let newCartItems = [];

      if (cartItemIndex === -1) {
        shopItem.Quanity = 1;
        newCartItems = [...prevCartItems, shopItem];
      } else {
        //         The main reason for using { ...prevCartItems[cartItemIndex] } is to create a shallow copy of the object, not to prevent React from running the function twice.
        // Let's understand the difference:
        // 1. React Strict Mode: In development, React may call state updater functions twice to help detect side effects.
        // 2. Original object: If you directly modify an object inside prevCartItems, you are changing the existing state object. This is called mutation.
        // 3. Object spread (...): It creates a new object with the same properties, so you can modify the copy without changing the original object.
        // 4. Important: Copying the object does not stop React from calling the function twice. It makes it possible to write your updater without mutating the existing state.
        // Remember: In React, your goal is not to prevent the updater from running twice in development. Your goal is to make sure it produces the correct result without changing the previous state.

        const cartItemNew = { ...prevCartItems[cartItemIndex] };

        newCartItems = [...prevCartItems];
        cartItemNew.Quanity += 1;
        newCartItems[cartItemIndex] = cartItemNew;
      }
      return newCartItems;
    });
  };

  // const handleRemoveItem = (id) => {
  //   setCartItems((prevCartItems) => {
  //       const cartItemIndex = cartItems.findIndex((item) => item.Id === id);
  //       if(cartItems[cartItemIndex] < 1)
  //       {

  //       }

  //   })
  // }
  return (
    <>
      <h1>Udbhav Bharti Shopping Mall</h1>
      <div className="itemsRow">
        {ShopItems.map((shopItem) => (
          <div className="itemCard" key={shopItem.Id}>
            <p>{shopItem.ItemName}</p>
            <p>Price: {shopItem.Price}</p>
            <button
              className="addBtn"
              onClick={() => handleAddToCart(shopItem.Id)}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
      <h2>Cart Items </h2>
      <div className="itemsRow">
        {cartItems.map((cartItem) => (
          <div className="itemCard" key={cartItem.Id}>
            <p>{cartItem.ItemName}</p>
            <p>Price: {cartItem.Price}</p>
            <p>Quanity: {cartItem.Quanity}</p>
            <button
              className="removeBtn"
              // onClick={() => handleRemoveItem(cartItem.Id)}
            >
              Remove Item
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
export default ShoppingCart;
