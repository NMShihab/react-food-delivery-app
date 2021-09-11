import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isNotFiveChars = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postal: true,
    city: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const name = nameInputRef.current.value;
    const street = streetInputRef.current.value;
    const postal = postalInputRef.current.value;
    const city = cityInputRef.current.value;

    const nameIsValid = !isEmpty(name);
    const streetIsValid = !isEmpty(street);
    const postalIsValid = !isNotFiveChars(postal);
    const cityIsValid = !isEmpty(city);

    setFormValidity({
      name: nameIsValid,
      street: streetIsValid,
      postal: postalIsValid,
      city: cityIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && postalIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onSubmitOrder({ name, street, postal, city });
  };

  const nameControlClass = `${classes.control} ${
    formValidity.name ? "" : classes.invalid
  }`;
  const streetControlClass = `${classes.control} ${
    formValidity.street ? "" : classes.invalid
  }`;
  const postalControlClass = `${classes.control} ${
    formValidity.postal ? "" : classes.invalid
  }`;
  const cityControlClass = `${classes.control} ${
    formValidity.city ? "" : classes.invalid
  }`;

  return (
    <div className={classes.div}>
      <form className={classes.form} onSubmit={confirmHandler}>
        <div className={nameControlClass}>
          <label htmlFor="name">Your Name</label>
          <input type="text" id="name" ref={nameInputRef} />
          {!formValidity.name && <p>Please enter a valid name </p>}
        </div>
        <div className={streetControlClass}>
          <label htmlFor="street">Street</label>
          <input type="text" id="street" ref={streetInputRef} />
          {!formValidity.street && <p>Please enter a valid street </p>}
        </div>
        <div className={postalControlClass}>
          <label htmlFor="postal">Postal Code</label>
          <input type="text" id="postal" ref={postalInputRef} />
          {!formValidity.postal && <p>Please enter a valid postal </p>}
        </div>
        <div className={cityControlClass}>
          <label htmlFor="city">City</label>
          <input type="text" id="city" ref={cityInputRef} />
          {!formValidity.city && <p>Please enter a valid city </p>}
        </div>
        <div className={classes.actions}>
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button className={classes.submit}>Confirm</button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
