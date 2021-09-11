import React, { useReducer } from "react";
import CartContext from "./cart_contex";

const defaultCart = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // const existItem = state.items.find((x) => x.id === action.item.id);
    // let updatedItem;
    // if (existItem) {
    //   updatedItem = state.items.map((x) =>
    //     x.id === existItem.id ? action.item : x
    //   );
    // } else {
    //   updatedItem = state.items.concat(action.item);
    // }
    const existCartItem = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existItem = state.items[existCartItem];

    let updatedItems;
    if (existItem) {
      const updatedItem = {
        ...existItem,
        amount: existItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existCartItem] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
    };
  }

  if (action.type === "REMOVE") {
    const existCartItem = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existItem = state.items[existCartItem];
    let updatedItems;
    if (existItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existItem, amount: existItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existCartItem] = updatedItem;
    }

    return {
      items: updatedItems,
    };
  }

  if (action.type === "CLEAR") {
    return defaultCart;
  }
  return defaultCart;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCart);

  const addItemHandler = (item) => {
    dispatchCartAction({
      type: "ADD",
      item: item,
    });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const clearCartItems = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContex = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearCart: clearCartItems,
  };

  return (
    <CartContext.Provider value={cartContex}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
