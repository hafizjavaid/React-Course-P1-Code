import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
// import reducer
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import reducer from "./store/reducers/burderBuilder";
// eslint-disable-next-line
import orderReducer from './store/reducers/order';
// eslint-disable-next-line
import thunk from 'redux-thunk'

const rootReducer = combineReducers({

  burgerBuilder: reducer,
  order: orderReducer,

})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers(
  applyMiddleware(thunk)
));
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
