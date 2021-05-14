import React from "react";

import { NavLink } from "react-router-dom";
import "./NavigationItems.css";
const NavigationItems = (props) => {
  return (
    <ul className="NavigationItems">
      <li className="NavigationItem">
        <NavLink exact to="/">
          Burger Builder
        </NavLink>
      </li>
      {props.isAuth ? (
        <li className="NavigationItem">
          <NavLink to="/orders"> Orders</NavLink>
        </li>
      ) : null}

      {!props.isAuth ? (
        <li className="NavigationItem">
          <NavLink to="/auth"> Authenticate</NavLink>
        </li>
      ) : (
        <li className="NavigationItem">
          <NavLink to="/logout"> Logout</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavigationItems;
