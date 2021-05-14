// eslint-disable-next-line
import * as actionTypes from "../actions/actionTypes";
import { updatedObject } from "../utility";
const initialState = {
  ingradients: null,
  totalPrice: 4,
  error: false,
  building: false
};
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const addIngradient = (state, action) => {
  const updatedIngradient = {
    [action.ingradientName]: state.ingradients[action.ingradientName] + 1,
  };
  const updatedIngradients = updatedObject(
    state.ingradients,
    updatedIngradient
  );
  const updatedState = {
    ingradients: updatedIngradients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingradientName],
    building: true
  };

  return updatedObject(state, updatedState);
};

const removeIngradient = (state, action) => {
  const updatedIngradient = {
    [action.ingradientName]: state.ingradients[action.ingradientName] - 1,
  };
  const updatedIngradients = updatedObject(
    state.ingradients,
    updatedIngradient
  );
  const updatedState = {
    ingradients: updatedIngradients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingradientName],
    building: true
  };

  return updatedObject(state, updatedState);
};

const setIngradients = (state, action) => {
  return updatedObject(state, {
    ingradients: action.ingradients,
    error: false,
    totalPrice: 4,
    building: false
  });
};
const reducer = (state = initialState, action) => {
  // eslint-disable-next-line
  switch (action.type) {
    case actionTypes.ADD_INGRADIENT:
      return addIngradient(state, action);
    case actionTypes.REMOVE_INGRADIENT:
      return removeIngradient(state, action);
    case actionTypes.SET_INGRADIENTS:
      return setIngradients(state, action);

    case actionTypes.FAILED_INGRADIENTS:
      return updatedObject(state, {
        error: true,
      });
  }
  return state;
};

export default reducer;
