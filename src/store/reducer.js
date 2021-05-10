// eslint-disable-next-line
import * as actionTypes from "./actions";
const initialState = {
  ingradients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0,
  },
  totalPrice: 4,
};
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
  };
const reducer = (state = initialState, action) => {
  // eslint-disable-next-line
  switch (action.type) {
    case actionTypes.ADD_INGRADIENT:
      return {
        ...state,
        ingradients: {
          ...state.ingradients,
          [action.ingradientName]: state.ingradients[action.ingradientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingradientName]
      };
    case actionTypes.REMOVE_INGRADIENT:
      return {
        ...state,
        ingradients: {
            ...state.ingradients,
            [action.ingradientName]: state.ingradients[action.ingradientName] - 1,
          },
          totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingradientName]
      };
  }
  return state;
};

export default reducer;
