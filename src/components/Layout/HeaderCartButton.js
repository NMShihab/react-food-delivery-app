import React, { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart_contex";
import style_classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const numOfCartItem = cartCtx.items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);
  return (
    <button className={style_classes.button} onClick={props.onClick}>
      <span className={style_classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={style_classes.badge}>{numOfCartItem}</span>
    </button>
  );
};

export default HeaderCartButton;
