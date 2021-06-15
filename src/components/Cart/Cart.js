import React from "react";
import style_classes from "./Cart.module.css";
import Modal from "../UI/Modal";

const Cart = (props) => {
  const cartValue = [{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }];

  const cartItems = (
    <ul>
      {cartValue.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );

  return (
    <Modal onHide={props.onHideCart}>
      {cartItems}
      <div className={style_classes.total}>
        <span>Total Amount</span>
        <span>40.46</span>
      </div>
      <div className={style_classes.actions}>
        <button
          className={style_classes["button--alt"]}
          onClick={props.onHideCart}
        >
          Close
        </button>
        <button className={style_classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
