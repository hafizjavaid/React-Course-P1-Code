import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
// import Logout
import Logout from "./containers/Auth/Logout/Logout";
// import connect
import { connect } from "react-redux";
import * as actions from "./store/actions/index";

class App extends Component {
  componentDidMount() {
    this.props.autoLogin();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      <Switch>
        <Route path="/checkout" component={Checkout}></Route>
        <Route path="/orders" component={Orders}></Route>
        <Route path="/logout" component={Logout}></Route>

        <Route path="/" exact component={BurgerBuilder}></Route>
        <Redirect to="/" />
      </Switch>;
    }
    return (
      <div>
        <Layout>
          {routes}
          {/* <Route path="/checkout/contact-data" component={ContactData}></Route> */}

          {/* <BurgerBuilder></BurgerBuilder> */}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: () => dispatch(actions.authCheckState()),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
