import * as actionTypes from "../actions/actionTypes";

// import updatedObject
import { updatedObject } from "../utility";
const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
  authPath: '/'
};

const authStart = (state, action) => {
  return updatedObject(state, {
    error: null,
    loading: true,
  });
};




const authSuccess = (state, action) => {
    return updatedObject(state, {
      token: action.idToken,
      loading: false,
      error: null,
      userId: action.userId
    });
  };
  const authFail = (state, action) => {
    return updatedObject(state, {
      loading: false,
      error: action.error,
      
    });
  };
  const authLogout = (state) => {
    return updatedObject(state, {
      token: null,
      userId: null
    });
  };

  const authRedirect = (state, action) => {
    return updatedObject(state, {
      authPath: action.path
    });
  };
const reducer = (state = initialState, action) => {
  // eslint-disable-next-line
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
        return authFail(state, action)
    case actionTypes.AUTH_LOGOUT:
        return authLogout(state)
    case actionTypes.SET_AUTH_REDIRECT:
          return authRedirect(state, action)
      
  }

  return state;
};

export default reducer;
