import React from "react";

import Burger from '../../Burger/Burger';
// import Button from '../../UI/Button'
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css';
const CheckoutSummary = (props) => {
  return (
    <div className="checkoutsummary">
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>

          <Burger ingradients = {props.ingradients} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancel}>Cancel</Button>
      <Button btnType="Success" clicked={props.checkoutContinue}>Continue</Button>
    </div>
  );
};

export default CheckoutSummary;
