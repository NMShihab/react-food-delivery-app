import React from "react";
import style_classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={style_classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
    </div>
  );
};

export default Input;
