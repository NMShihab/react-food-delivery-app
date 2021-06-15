import React from "react";
import style_classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={style_classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={style_classes.description}>{props.description}</div>
        <div className={style_classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm meal={props} />
      </div>
    </li>
  );
};

export default MealItem;
