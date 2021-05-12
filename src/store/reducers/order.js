import * as actionTypes from "../actions/actionTypes";
// import reducer from './burderBuilder';
import { updatedObject } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchasing: false,
};

const reducer = (state = initialState, action) => {
  // eslint-disable-next-line
  switch (action.type) {
    case actionTypes.PURCHASE_START:
      return updatedObject(state, {
        loading: true,
      });
    case actionTypes.PURCHASE_INIT:
      return updatedObject(state, {
        purchasing: false,
      });

    case actionTypes.PURCHASE_SUCCESS:
      const newOrder = updatedObject(action.orderData, {
        id: action.id,
      });
      return updatedObject(state, {
        loading: false,
        orders: state.orders.concat(newOrder),
        purchasing: true,
      });

    case actionTypes.PURCHASE_FAIL:
      return updatedObject(state, {
        loading: false,
      });
    case actionTypes.ORDERS_START:
      return updatedObject(state, {
        loading: true,
      });
    case actionTypes.ORDERS_SUCCESS:
        console.log(action.orders);
      return updatedObject(state, {
        orders: action.orders,
        loading: false,
      });

    case actionTypes.ORDERS_FAIL:
      return updatedObject(state, {
        loading: false,
      });
  }

  return state;
};

export default reducer;
