import React from "react";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import style_classes from "./Header.module.css";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={style_classes.header}>
        <h1>Meals</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={style_classes["main-image"]}>
        <img src={mealsImage} alt="Meal Cover page" />
      </div>
    </React.Fragment>
  );
};

export default Header;
