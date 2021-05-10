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
import * as actionTypes from "../../store/actions";


class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    // axios
    //   .get("https://axios2-b928a.firebaseio.com/ingradients.json")
    //   .then((response) => {
    //     this.setState({ ingradients: response.data });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     this.setState({ error: true });
    //   });
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

    let burger = this.state.error ? (
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
const mapStateToProps = state =>{
  return{
    ings: state.ingradients,
    price: state.totalPrice
  }
}
const mapDispatchToProps = dispatch =>{
   return{
     onIngradientAdd: (ingName) => dispatch({type: actionTypes.ADD_INGRADIENT, ingradientName: ingName}),
     onIngradientRemove: (ingName) => dispatch({type: actionTypes.REMOVE_INGRADIENT, ingradientName: ingName})

   }
}
export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));
