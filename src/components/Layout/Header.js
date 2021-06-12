import React from "react";
import mealsImage from "../../assets/meals.jpg";
import style_classes from "./Header.module.css";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={style_classes.header}>
        <h1>Meals</h1>
        <button>Cart</button>
      </header>
      <div className={style_classes["main-image"]}>
        <img src={mealsImage} />
      </div>
    </React.Fragment>
  );
};

export default Header;
