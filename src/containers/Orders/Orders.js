import React, { Component } from "react";

// import Order
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
// import { axios } from 'axios';
class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    axios.get("/orders.json")
    .then(res=>{
        const tempOrders = [];
        console.log(res.data);
        for(let key in res.data)
        {
             tempOrders.push({
                 ...res.data[key],
                 id: key
             })
        }
        this.setState({loading: false, orders: tempOrders})
    })
    .catch(err=>{
       
        this.setState({loading: false})
    })
  }
  render() {
    return (
      <div>
       {this.state.orders.map(order =>(
           <Order
           key={order.id}
           ingradients={order.ingradients}
           price={order.price} />
       ))}
      </div>
    );
  }
}

export default Orders;
