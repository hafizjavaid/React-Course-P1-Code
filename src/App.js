import React, { Component } from "react";
import { Route } from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
// import ContactData from './containers/Checkout/ContactData/ContactData';
// import Orders
import Orders from './containers/Orders/Orders';
class App extends Component {
  render() {
    return (
      <div >
        <Layout>
         <Route path="/" exact component={BurgerBuilder}></Route>
         <Route path="/checkout" component={Checkout}></Route>
         <Route path="/orders" component={Orders}></Route>

         {/* <Route path="/checkout/contact-data" component={ContactData}></Route> */}

         {/* <BurgerBuilder></BurgerBuilder> */}
        </Layout>
      </div>
    );
  }
}
export default App;
