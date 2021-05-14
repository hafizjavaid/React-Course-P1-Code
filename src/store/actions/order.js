import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
export const purchaseSucces = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_SUCCESS,
    id,
    orderData,
  };
};
export const purchaseFail = (error) => {
  return {
    type: actionTypes.PURCHASE_FAIL,
    error,
  };
};
// For Loading Only
export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_START,
  };
};

// For Posting Data on Firebase
export const purchaseStart = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        console.log(response);
        dispatch(purchaseSucces(response.data.name, orderData));
      })
      .catch((err) => {
        console.log(err);
        dispatch(purchaseFail(err));
      });
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const orderSuccess = (orders) => {
  return {
    type: actionTypes.ORDERS_SUCCESS,
    orders,
  };
};
export const orderFail = (error) => {
  return {
    type: actionTypes.ORDERS_FAIL,
    error,
  };
};
export const orderStart = () => {
  return {
    type: actionTypes.ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    dispatch(orderStart());
    const params = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
    axios
      .get("/orders.json" + params)
      .then((res) => {
        const tempOrders = [];
        console.log(res.data);
        for (let key in res.data) {
          tempOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(orderSuccess(tempOrders));
      })
      .catch((err) => {
        dispatch(orderFail(err));
      });
  };
};
