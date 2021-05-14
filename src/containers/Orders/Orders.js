import React, { Component } from "react";

import { connect } from "react-redux";
// import Order
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import * as actions from "../../store/actions/index";
// import Spinner
// import connect
// import ErrorHandler
import ErrorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => (
        <Order
          key={order.id}
          ingradients={order.ingradients}
          price={order.price}
        />
      ));
    }
    return <div>{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,

    // price: state.burgerBuilder.totalPrice
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, id) => dispatch(actions.fetchOrders(token, id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorHandler(Orders, axios));
