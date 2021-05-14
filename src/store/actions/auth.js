import * as actionTypes from "./actionTypes";
// import axios
import axios from "axios";
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
export const checkAuthTime = (expireTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expireTime * 1000);
  };
};

// This function we will run in the component we
// want to use and it will call he auth start function and we will go to the reducer file from
// this functioon to check the type or case
export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxUW_dpbw83waVfRqq14mFcjNBzklzr2M`;

    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxUW_dpbw83waVfRqq14mFcjNBzklzr2M";
    }
    axios
      .post(url, authData)
      .then((res) => {
        console.log(res);
        const expireDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expireDate);
        localStorage.setItem('userId',  res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTime(res.data.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};


export const setAuthPath = (path) =>{
  return{
    type: actionTypes.SET_AUTH_REDIRECT,
    path,
  }
}

export const authCheckState = () =>{
  return dispatch=>{
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if(!token)
    {
      dispatch(logout());
    }
    else{

      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if(expirationDate <= new Date())
      {
        dispatch(logout());
      }
      else{

        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTime((expirationDate.getTime() - new Date().getTime()) / 1000));


      }

    }
  }
}