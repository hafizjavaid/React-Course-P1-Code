import React from "react";
import { Component } from "react";
import "./ContactData.css";
import axios from "../../../axios-orders";
// import Spinner

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };
  clickHandler = (event) => {
    event.preventDefault();
    console.log(this.props.ingradients);
    this.setState({ loading: true });
    // alert('You Continue');
    const order = {
      ingradients: this.props.ingradients,
      price: this.props.price,
      customer: {
        name: "Max",
        address: {
          street: "Test 1",
          zipCode: "3212",
          country: "Pakistan",
        },
        email: "test@gmail.com",
      },
      deliveryMethod: "Fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        setTimeout(() => {
          console.log("Loading ....");
        }, 1000);
        this.setState({ loading: false });
        console.log(response);
        this.props.history.push('/')
      })
      .catch((err) => {
        console.log(err);
        this.setState({ loading: false });
      });
  };
  render() {
    let form = (
      <form>
        <input
          className="input"
          type="text"
          name="name"
          placeholder="Your Name"
        ></input>
        <input
          className="input"
          type="email"
          name="email"
          placeholder="Your Mail"
        ></input>
        <input
          className="input"
          type="text"
          name="street"
          placeholder="Street"
        ></input>
        <input
          className="input"
          type="text"
          name="postalcode"
          placeholder="Postal Code"
        ></input>
        <Button btnType="Success" clicked={this.clickHandler}>
          Order
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className="contactdata">
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}
export default ContactData;
