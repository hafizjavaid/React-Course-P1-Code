import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";

import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";

import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};
class BurgerBuilder extends Component {
  state = {
    ingradients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("https://axios2-b928a.firebaseio.com/ingradients.json")
      .then((response) => {
        this.setState({ ingradients: response.data });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: true });
      });
  }

  addIngredientHandler = (type) => {
    const count = this.state.ingradients[type] + 1;
    const updatedIngradientss = {
      ...this.state.ingradients,
    };
    updatedIngradientss[type] = count;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingradients: updatedIngradientss });
    this.updatePurchasable(updatedIngradientss);
  };

  removeIngradient = (type) => {
    const count = this.state.ingradients[type] - 1;
    if (count < 0) {
      return;
    }
    const updatedIngradientss = {
      ...this.state.ingradients,
    };
    updatedIngradientss[type] = count;
    const priceSub = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceSub;
    if (newPrice <= 0) {
      return;
    }
    this.setState({ totalPrice: newPrice, ingradients: updatedIngradientss });
    this.updatePurchasable(updatedIngradientss);
  };

  updatePurchasable = (ingradients) => {
    // My Own Methode to sum the values of an object
    const sum = Object.values(ingradients).reduce((sum, ele) => {
      return sum + ele;
    }, 0);
    console.log(sum);
    this.setState({ purchasable: sum > 0 });
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  modalClose = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinue = () => {
    const querParams = [];

    for (let i in this.state.ingradients) {
      querParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingradients[i])
      );
      console.log(querParams);
      console.log(querParams.join('&'));

    }
    querParams.push('price=' + this.state.totalPrice);
    this.props.history.push({
      pathname: "/checkout",
      search: '?' + querParams.join('&'),
    });
  };
  render() {
    let orderSummary = null;

    const disabledInfo = {
      ...this.state.ingredients,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.state.error ? (
      <p>Ingradients Can't Be Loaded</p>
    ) : (
      <Spinner />
    );
    if (this.state.ingradients) {
      burger = (
        <Aux>
          <Burger ingradients={this.state.ingradients}></Burger>
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientremoved={this.removeIngradient}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
          ></BuildControls>
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingradients={this.state.ingradients}
          purchaseCanceled={this.modalClose}
          purchaseContinued={this.purchaseContinue}
          price={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal shows={this.state.purchasing} modalClose={this.modalClose}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default ErrorHandler(BurgerBuilder, axios);
