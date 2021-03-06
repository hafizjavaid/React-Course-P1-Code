import React, { Component } from "react";

import Aux from "../../../hoc/Aux";

import Button from "../../UI/Button/Button";
class OrderSummary extends Component {
  render() {
    const ingradients = Object.keys(this.props.ingradients).map((igKey) => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
          {this.props.ingradients[igKey]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A declicious burger with the following ingradients</p>
        <ul>{ingradients}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
