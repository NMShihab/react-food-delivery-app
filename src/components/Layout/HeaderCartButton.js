import React from "react";
import CartIcon from "../Cart/CartIcon";
import style_classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  return (
    <button className={style_classes.button}>
      <span className={style_classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={style_classes.badge}>5</span>
    </button>
  );
};

export default HeaderCartButton;
