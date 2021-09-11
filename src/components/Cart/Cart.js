import React, { useContext, useState } from "react";
import style_classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart_contex";
import CartItem from "./CartItem";
import Checkout from "./CheckOut";

const Cart = (props) => {
  // const cartValue = [{ id: "c1", name: "Sushi", amount: 2, price: 12.99 }];
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
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

  const submitOrder = (userData) => {
    setIsSubmiting(true);
    fetch(
      "https://dummy-project-f7186-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: CartCtx.items,
        }),
      }
    );

    setIsSubmiting(false);
    setDidSubmit(true);

    CartCtx.clearCart();
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

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={style_classes.total}>
        <span>Total Amount</span>
        <span>{total.toFixed(2)}</span>
      </div>
      {isOrder && (
        <Checkout onSubmitOrder={submitOrder} onCancel={props.onHideCart} />
      )}

      {!isOrder && modalAction}
    </React.Fragment>
  );

  const successMessage = (
    <React.Fragment>
      <p>The order is submitted successfully</p>
      <div className={style_classes.actions}>
        <button className={style_classes.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  const submitingMessage = <p>Order is submitting.....</p>;

  return (
    <Modal onHide={props.onHideCart}>
      {!isSubmiting && !didSubmit && cartModalContent}
      {isSubmiting && submitingMessage}
      {didSubmit && successMessage}
    </Modal>
  );
};

export default Cart;
