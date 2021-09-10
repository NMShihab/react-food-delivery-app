import React, { useContext, useState } from "react";
import style_classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart_contex";
import CartItem from "./CartItem";
import Checkout from "./CheckOut";

const Cart = (props) => {
  // const cartValue = [{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }];
  const [isOrder, setIsOrder] = useState(false);
  const CartCtx = useContext(CartContext);
  const hasItem = CartCtx.items.length > 0;
  const total = CartCtx.items.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );

  const cartItemRemoveHandler = (id) => {
    CartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    CartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={style_classes["cart-items"]}>
      {CartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const orderHandler = (e) => {
    e.preventDefault();
    setIsOrder(true);
  };

  const modalAction = (
    <div className={style_classes.actions}>
      <button
        className={style_classes["button--alt"]}
        onClick={props.onHideCart}
      >
        Close
      </button>
      {hasItem && (
        <button className={style_classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onHide={props.onHideCart}>
      {cartItems}
      <div className={style_classes.total}>
        <span>Total Amount</span>
        <span>{total.toFixed(2)}</span>
      </div>
      {isOrder && <Checkout onCancel={props.onHideCart} />}

      {!isOrder && modalAction}
    </Modal>
  );
};

export default Cart;
