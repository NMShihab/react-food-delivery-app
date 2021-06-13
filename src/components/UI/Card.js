import React from "react";
import style_classes from "./Card.module.css";

const Card = (props) => {
  return <div className={style_classes.card}>{props.children}</div>;
};

export default Card;
