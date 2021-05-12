import React from "react";
import { Component } from "react";
import { connect } from "react-redux";

import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
// import * as actions from '../../store/actions/index'
class Checkout extends Component {
  continueHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  cancelHandler = () => {
    this.props.history.goBack();
  };
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchaseRedirect = this.props.purchasing ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchaseRedirect}
          <CheckoutSummary
            ingradients={this.props.ings}
            checkoutCancel={this.cancelHandler}
            checkoutContinue={this.continueHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingradients,
    purchasing: state.order.purchasing
  };
};
// const mapDispatchToProps = (dispatch) => {
//   return {
   
   

//   };
// };
export default connect(mapStateToProps)(Checkout);
