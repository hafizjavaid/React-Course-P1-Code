import React from "react";
import { Component } from "react";

import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
class Checkout extends Component {
  state = {
    ingradients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    },
    price: 0,
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingradients = {};
    let price = 0;

    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingradients[param[0]] = +param[1];
      }
    }
    console.log(ingradients);
    this.setState({ ingradients: ingradients, price: price });
  }
  continueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  cancelHandler = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <div>
        <CheckoutSummary
          ingradients={this.state.ingradients}
          checkoutCancel={this.cancelHandler}
          checkoutContinue={this.continueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={(props) => (
            <ContactData
              price={this.state.price}
              ingradients={this.state.ingradients}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}
export default Checkout;
