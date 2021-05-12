
import * as actionTypes from './actionTypes';
import axios from "../../axios-orders";


export const addIngradient = (ingradientName) => {

    return{
        type: actionTypes.ADD_INGRADIENT,
        ingradientName
    }
}
export const removeIngradient = (ingradientName) => {

    return{
        type: actionTypes.REMOVE_INGRADIENT,
        ingradientName
    }
}
export const setIngradients = (ingradients) => {

    return{
        type: actionTypes.SET_INGRADIENTS,
        ingradients
    }
}
export const failedIngradients = () => {

    return{
        type: actionTypes.FAILED_INGRADIENTS,
        
    }
}
export const initIngradients = () => {

    
    return dispatch =>{
       axios
      .get("https://axios2-b928a.firebaseio.com/ingradients.json")
      .then((response) => {
        dispatch(setIngradients(response.data))
      })
      .catch((err) => {
        console.log(err);
        dispatch(failedIngradients());
      });
    }
    
}