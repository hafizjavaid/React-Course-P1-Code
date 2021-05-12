import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";

import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";

import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import {connect} from 'react-redux';
import * as actions from "../../store/actions/index";


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitonIngradients();
  }

  updatePurchasable = (ingradients) => {
    // My Own Methode to sum the values of an object
    const sum = Object.values(ingradients).reduce((sum, ele) => {
      return sum + ele;
    }, 0);
   
     return sum > 0;
  };
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };
  modalClose = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinue = () => {
 
    this.props.onPurchaseInit();
    this.props.history.push("/checkout")
    
  };
  render() {
    let orderSummary = null;

    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let burger = this.props.error ? (
      <p>Ingradients Can't Be Loaded</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingradients={this.props.ings}></Burger>
          <BuildControls
            ingredientAdded={this.props.onIngradientAdd}
            ingredientremoved={this.props.onIngradientRemove}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchasable(this.props.ings)}
            ordered={this.purchaseHandler}
          ></BuildControls>
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingradients={this.props.ings}
          purchaseCanceled={this.modalClose}
          purchaseContinued={this.purchaseContinue}
          price={this.props.price}
        />
      );
    }

    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }
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
const mapStateToProps = state =>{
  return{
    ings: state.burgerBuilder.ingradients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
}
const mapDispatchToProps = dispatch =>{
   return{
     onIngradientAdd: (ingName) => dispatch(actions.addIngradient(ingName)),
     onIngradientRemove: (ingName) => dispatch(actions.removeIngradient(ingName)),
     onInitonIngradients: () => dispatch(actions.initIngradients()),
     onPurchaseInit: () => dispatch(actions.purchaseInit()),


   }
}
export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));
